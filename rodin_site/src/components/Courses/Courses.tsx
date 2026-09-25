"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Courses.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const coursesData = [
  {
    title: <>Infantil ao<br/>Fundamental I</>,
    sub: "BerÃ§ario ao 5Âº ano",
    imgUrl: "/cursos/le_perini_final.png", // CrianÃ§a
    link: "https://leperini.com.br/"
  },
  {
    title: <>Ensino<br/>Fundamental II</>,
    sub: "6Âº ao 9Âº ano",
    imgUrl: "/cursos/fundamental_II_final.png", // PrÃ©-adolescente
    link: "/fundamental-ii"
  },
  {
    title: <>Ensino<br/>MÃ©dio</>,
    sub: "1Âª e 2Âª sÃ©rie",
    imgUrl: "/cursos/ensino_medio_final.png", // Adolescentes
    link: "/ensino-medio"
  },
  {
    title: <>Ensino<br/>MÃ©dio</>,
    sub: "TerceirÃ£o",
    imgUrl: "/cursos/terceirao_final.jpg", // Foto exclusiva do TerceirÃ£o
    link: "/terceirao"
  }
];

export default function Courses() {
  const containerRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(`.${styles.card}`,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    if (window.location.hash === '#cursos') {
      setTimeout(() => {
        const el = document.getElementById('cursos');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 800);
    }
  }, { scope: containerRef });

  const scrollBy = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="cursos" className={styles.coursesSection} ref={containerRef}>
      <h2 className={styles.sectionTitle}>CURSOS</h2>
      
      <div className={styles.carouselWrapper}>
        <button aria-label="Rolar para a esquerda" className={`${styles.navButton} ${styles.navLeft}`} onClick={() => scrollBy('left')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className={styles.carouselContainer}>
          <div className={styles.cardsGrid} ref={scrollRef}>
            {coursesData.map((course, i) => (
              <div className={styles.card} key={i}>
                <div className={styles.cardBg}>
                  <Image 
                    src={course.imgUrl} 
                    alt="Course Thumbnail"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    quality={100}
                  />
                </div>
                <div className={styles.cardOverlay}></div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{course.title}</h3>
                  <p className={styles.cardSub}>{course.sub}</p>
                  {course.link ? (
                    course.link.startsWith('http') ? (
                      <a href={course.link} target="_blank" rel="noopener noreferrer" className={styles.saibaMais}>
                        SAIBA MAIS
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px', marginLeft: '10px' }}>
                            <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
                            <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
                          </svg>
                      </a>
                    ) : (
                      <Link href={course.link} className={styles.saibaMais}>
                        SAIBA MAIS
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px', marginLeft: '10px' }}>
                            <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
                            <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
                          </svg>
                      </Link>
                    )
                  ) : (
                    <button className={styles.saibaMais}>
                      SAIBA MAIS
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px', marginLeft: '10px' }}>
                            <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
                            <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
                          </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button aria-label="Rolar para a direita" className={`${styles.navButton} ${styles.navRight}`} onClick={() => scrollBy('right')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

