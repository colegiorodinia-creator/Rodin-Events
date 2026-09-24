"use client";
import React, { useEffect, useRef } from 'react';
import styles from './Statement.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    if (!textRef.current) return;
    const words = (textRef.current as HTMLElement).querySelectorAll('span');
    
    gsap.fromTo(words, 
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "center 50%",
          scrub: true,
          refreshPriority: 9
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section className={styles.statement} ref={containerRef}>
      <div className={styles.content}>
        <h2 className={styles.text} ref={textRef}>
          <span>A </span><span>gente </span><br className={styles.mobileBr} />
          <span>acredita </span><span>que </span><br className={styles.mobileBr} />
          <span>todo </span><br className={styles.desktopBr} />
          <span>aluno </span><br className={styles.mobileBr} />
          <span>tem </span><span>potencial </span><br className={styles.mobileBr} />
          <span>para </span><br className={styles.desktopBr} />
          <span>ser </span><span>o </span><span>que </span><br className={styles.mobileBr} />
          <span>quiser </span><span>e </span><span>o </span><br className={styles.mobileBr} />
          <span>direito </span><br className={styles.desktopBr} />
          <span>de </span><br className={styles.mobileBr} />
          <span>desenvolver </span><br className={styles.mobileBr} />
          <span>essa </span><br className={styles.desktopBr} />
          <span>potência </span><br className={styles.mobileBr} />
          <span>integralmente.</span>
        </h2>
        <div className={styles.btnWrapper}>
          <Link href="/diferenciais" className={styles.diffBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            SAIBA MAIS
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
              <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
              <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
