import { gsap } from './motion';

/** Elements of a full-screen curtain with curved top/bottom edges. */
export interface CurtainElements {
  root: HTMLElement;
  label: HTMLElement;
  top?: HTMLElement | null;
  bottom?: HTMLElement | null;
}

/** Curtain sweeps up from the bottom until it covers the screen. */
export async function coverScreen({ root, label, top, bottom }: CurtainElements, reduced: boolean): Promise<void> {
  root.classList.add('is-active');
  if (reduced) {
    gsap.set(root, { yPercent: 0 });
    return;
  }
  const tl = gsap
    .timeline()
    .set(root, { yPercent: 100 })
    .set(top ?? [], { height: '14vh' })
    .set(bottom ?? [], { height: 0 })
    .set(label, { opacity: 0, y: 20 })
    .to(root, { yPercent: 0, duration: 0.8, ease: 'power3.inOut' })
    .to(top ?? [], { height: 0, duration: 0.8, ease: 'power3.inOut' }, '<')
    .to(label, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.35');
  await tl;
}

/** Curtain continues upward, with a curved bottom edge, and reveals the page. */
export async function revealScreen({ root, label, bottom }: CurtainElements, reduced: boolean): Promise<void> {
  if (reduced) {
    root.classList.remove('is-active');
    gsap.set(root, { yPercent: 100 });
    return;
  }
  const tl = gsap
    .timeline({ onComplete: () => root.classList.remove('is-active') })
    .to(label, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' }, 0.1)
    .set(bottom ?? [], { height: '14vh' }, 0.2)
    .to(root, { yPercent: -100, duration: 0.9, ease: 'power3.inOut' }, 0.2)
    .to(bottom ?? [], { height: 0, duration: 0.9, ease: 'power3.inOut' }, 0.2);
  await tl;
}
