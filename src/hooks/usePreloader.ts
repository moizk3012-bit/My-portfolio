import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore } from 'react';
import { gsap } from '@/lib/motion';
import { useSmoothScroll } from './useContexts';

const SESSION_KEY = 'ma-loaded';

/** The inline <head> script sets html.no-preloader when the intro was already seen or motion is reduced. */
const subscribeNever = () => () => {};
const readSkip = () => document.documentElement.classList.contains('no-preloader');

/**
 * First-visit intro: cycles through `words`, then slides the panel up with a
 * curved edge and calls `onDone`. When skipped it calls `onDone` right away.
 * Returns the current word, whether the preloader can be unmounted, and refs to attach.
 */
export function usePreloader(words: string[], onDone: () => void) {
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  // Server render (and hydration) always include the preloader; the client then reads the flag.
  const skip = useSyncExternalStore(subscribeNever, readSkip, () => false);
  const [index, setIndex] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const scroll = useSmoothScroll();
  const done = useEffectEvent(onDone);

  useEffect(() => {
    if (skip) {
      done();
      return;
    }
    scroll.lock(true);
    gsap.fromTo(wordRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

    const timers: ReturnType<typeof setTimeout>[] = [];
    let tl: gsap.core.Timeline | undefined;
    const exit = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // storage blocked (private mode): the intro simply plays again next visit
      }
      tl = gsap
        .timeline({ onComplete: () => setAnimationDone(true) })
        .to(wordRef.current, { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' })
        .set(curveRef.current, { height: '18vh' })
        .to(rootRef.current, { yPercent: -100, duration: 0.95, ease: 'power3.inOut' }, '<0.15')
        .to(curveRef.current, { height: 0, duration: 0.95, ease: 'power3.inOut' }, '<')
        .call(() => done(), [], '<0.45');
    };
    const step = (i: number) => {
      if (i >= words.length) return exit();
      setIndex(i);
      timers.push(setTimeout(() => step(i + 1), i === words.length - 1 ? 450 : 140));
    };
    timers.push(setTimeout(() => step(1), 900));

    return () => {
      timers.forEach(clearTimeout);
      tl?.kill();
    };
  }, [skip, words, scroll]);

  return { word: words[index] ?? '', finished: skip || animationDone, rootRef, wordRef, curveRef };
}
