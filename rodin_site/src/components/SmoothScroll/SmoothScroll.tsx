"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apenas carrega o Lenis no Desktop (evita peso desnecessário no processador do Mobile)
    if (window.innerWidth <= 768) return;

    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
