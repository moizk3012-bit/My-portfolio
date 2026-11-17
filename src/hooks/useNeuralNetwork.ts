import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useReducedMotion } from './useMediaQuery';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const LINK = 150;
const MOUSE = 200;

/**
 * Faint neural-network field on a canvas: drifting nodes linked by thin
 * lines that brighten and reach toward the cursor. Pauses while off-screen;
 * draws a single static frame for reduced motion.
 */
export function useNeuralNetwork(canvasRef: RefObject<HTMLCanvasElement | null>, opacity = 0.35) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, (w * h) / 15000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (reduced) break;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      ctx.lineWidth = 1;
      nodes.forEach((a, i) => {
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK) * 0.5 * opacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        const near = dm < MOUSE ? 1 - dm / MOUSE : 0;
        if (near) {
          ctx.strokeStyle = `rgba(255,255,255,${near * 0.9 * opacity})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(255,255,255,${(0.55 + near * 0.45) * opacity * 1.6})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + near * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = () => {
      draw();
      raf = visible && !reduced ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !raf) loop();
    });
    io.observe(canvas);

    resize();
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
    };
  }, [canvasRef, opacity, reduced]);
}
