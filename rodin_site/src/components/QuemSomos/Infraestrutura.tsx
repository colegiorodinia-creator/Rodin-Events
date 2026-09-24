"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './Infraestrutura.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Infraestrutura() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const infraData = [
    { title: "Externo", src: "/infraestrutura/Extra.png" },
    { title: "Ar Livre", src: "/infraestrutura/Ar Livre.png" },
    { title: "Pátio", src: "/infraestrutura/Pátio.png" },
    { title: "Pátio", src: "/infraestrutura/Pátio II.png" },
    { title: "Pátio", src: "/infraestrutura/Pátio III.png" },
    { title: "Pátio", src: "/infraestrutura/Pátio IV.png" },
    { title: "Bangalô", src: "/infraestrutura/Bangalô.png" },
    { title: "Sala Monteiro Lobato", src: "/infraestrutura/Monteiro Lobato.png" },
    { title: "Hall Pedagógico", src: "/infraestrutura/hall_pedagogico.png" },
    { title: "Sala de Aula", src: "/infraestrutura/Sala de Aula.png" },
    { title: "Galeria dos Pensadores", src: "/infraestrutura/Galeria dos Pensadores.png" },
    { title: "Futmesa", src: "/infraestrutura/Futmesa.png" },
    { title: "Cozinha", src: "/infraestrutura/Cozinha.png" },
    { title: "Quadra Poliesportiva", src: "/infraestrutura/Quadra.jpeg" }
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4; // Mostra 4 fotos por vez

  const handlePrev = () => {
    setActiveIndex((prev) => {
      const nextIdx = Math.max(0, prev - 1);
      setStartIndex((currStart) => {
        if (nextIdx < currStart) return nextIdx;
        return currStart;
      });
      return nextIdx;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const nextIdx = Math.min(infraData.length - 1, prev + 1);
      setStartIndex((currStart) => {
        if (nextIdx >= currStart + visibleCount) return nextIdx - visibleCount + 1;
        return currStart;
      });
      return nextIdx;
    });
  };

  // Rotação automática das mídias (Autoplay 7s)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % infraData.length;
        
        // Acompanha a rolagem se sair da visualização
        setStartIndex((prevStart) => {
          if (nextIndex === 0) return 0; // Volta ao início
          if (nextIndex >= prevStart + visibleCount) return nextIndex - visibleCount + 1;
          if (nextIndex < prevStart) return nextIndex;
          return prevStart;
        });

        return nextIndex;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [infraData.length]);

  useGSAP(() => {
    // Parallax de fundo original
    gsap.fromTo(bgRef.current,
      { y: "-10%" },
      {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="infraestrutura" className={isMobile ? styles.mobileSection : styles.eventSection} ref={containerRef}>
      
      {isMobile ? (
        <div className={styles.mobileWrapper}>
          <div className={styles.mobileHeader}>
            <p className={styles.mobileSubtitle}>Ambientes que Ensinam</p>
            <h2 className={styles.mobileTitle}>Infraestrutura</h2>
          </div>
          <div className={styles.mobileCardsContainer}>
            {infraData.map((item, i) => (
              <div key={i} className={styles.mobileCard}>
                <img src={item.src} alt={item.title} className={styles.mobileCardImg} />
                <div className={styles.mobileCardOverlay}>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.mobileBtnWrapper}>
            <a href="/matriculas" className={styles.ctaButtonMobile}>AGENDE SUA VISITA</a>
          </div>
        </div>
      ) : (
        <>
          {/* Fundo dinâmico com crossfade original */}
          <div ref={bgRef} className={styles.bgContainer}>
            {infraData.map((item, i) => (
              <div 
                key={i}
                className={styles.bgImage}
                style={{ 
                  backgroundImage: `url("${item.src}")`,
                  opacity: activeIndex === i ? 1 : 0,
                  transition: 'opacity 1s ease-in-out'
                }}
              ></div>
            ))}
          </div>
          <div className={styles.overlay}></div>
          
          <div className={styles.carouselContainer}>
            <div 
              className={`${styles.arrow} ${startIndex === 0 ? styles.disabled : ''}`}
              onClick={handlePrev}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
                <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
              </svg>
            </div>

            <div className={styles.thumbsGridWrapper}>
              <div 
                className={styles.thumbsGrid}
                style={{ transform: `translateY(-${startIndex * 78}px)` }}
              >
                {infraData.map((item, i) => (
                  <div 
                    key={i} 
                    className={`${styles.thumb} ${activeIndex === i ? styles.activeThumb : ''}`}
                    style={{ backgroundImage: `url("${item.src}")` }}
                    onClick={() => {
                      setActiveIndex(i);
                      setStartIndex((prevStart) => {
                        if (i >= prevStart + visibleCount) return i - visibleCount + 1;
                        if (i < prevStart) return i;
                        return prevStart;
                      });
                    }}
                  >
                  </div>
                ))}
              </div>
            </div>

            <div 
              className={`${styles.arrow} ${startIndex >= infraData.length - visibleCount ? styles.disabled : ''}`}
              onClick={handleNext}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(90deg)' }}>
                <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
                <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
              </svg>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.textBlock}>
              <p style={{ color: 'var(--rodin-orange)', fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>Ambientes que Ensinam</p>
              <h2 className={styles.title}>
                {infraData[activeIndex].title}</h2><a href="/matriculas" className={styles.ctaButton} style={{ marginTop: "15px" }}>AGENDE SUA VISITA</a>
            </div>
          </div>
        </>
      )}
    </section>
  );
}