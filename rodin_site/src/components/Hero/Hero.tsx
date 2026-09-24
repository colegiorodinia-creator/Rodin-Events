"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import ModalKit from '../ModalKit/ModalKit';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Executa a animação de zoom e overlay APENAS em telas maiores que 768px (Desktop)
    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(heroRef.current,
        { scale: 1 },
        {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
            refreshPriority: 10
          }
        }
      );

      gsap.fromTo("." + styles.heroOverlayDark,
        { opacity: 0 },
        {
          opacity: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <>
      <section className={styles.heroContainer} ref={containerRef}>
        
        {/* IMAGEM HERO */}
        <div className={styles.hero} ref={heroRef}>
          
          {/* Background */}
          <div className={styles.bgWrapper}>
            <div className={styles.bgImage}></div>
            <div className={styles.overlay}></div>
            <div className={styles.heroOverlayDark}></div>
          </div>
          
          <div className={styles.content}>
            <p className={styles.subtitle}>ACOLHER, INSPIRAR E CONSTRUIR</p>
            <h1 className={styles.title}>
              DESPERTA<br/>POTÃŠNCIA<sup className={styles.registered}>Â®</sup>
            </h1>
            <button onClick={() => setIsModalOpen(true)} className={styles.cta}  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              COMECE SUA JORNADA
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
                <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
                <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
              </svg>
            </button>
          </div>
        </div>

      </section>
      {isModalOpen && <ModalKit onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

