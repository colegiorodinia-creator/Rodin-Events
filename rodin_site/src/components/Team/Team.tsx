"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './Team.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { teamData } from '@/data/teamData';
import Link from 'next/link';

export default function Team() {
  const containerRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  // Calcula quantos itens mostrar com base na tela (4 no desktop, 1 no mobile)
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});
  const toggleExpand = (key: string) => setExpandedMap(prev => ({...prev, [key]: !prev[key]}));

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth <= 1024 ? 1 : 4);
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollEl = document.getElementById("teamMobileScroll");
      if (scrollEl) {
        scrollEl.scrollLeft = (scrollEl.scrollWidth / 2) - (window.innerWidth / 2);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    setStartIndex(prev => (prev > 0 ? prev - 1 : teamData.length - itemsPerPage));
  };

  const handleNext = () => {
    setStartIndex(prev => (prev < teamData.length - itemsPerPage ? prev + 1 : 0));
  };

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
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
  }, []);

  return (
    <section className={styles.teamSection} ref={containerRef}>
      <h2 className={styles.sectionTitle}>EQUIPE</h2>
      
      
      <div className={`${styles.carouselContainer} ${styles.desktopLayout}`}>
        <div className={styles.arrowLeft} onClick={handlePrev}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
            <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
            <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
          </svg>
        </div>

        <div className={styles.cardsGrid}>
          {teamData.slice(startIndex, startIndex + itemsPerPage).map((member, i) => (
            <div className={styles.card} key={`${member.name}-${i}`} ref={(el) => { cardsRef.current[i] = el; }}>
              <div className={styles.imageWrapper}>
                <img 
                  src={`${member.imgUrl}?v=8`} 
                  alt={member.name} 
                  className={styles.cardImage} 
                  style={{ 
                    objectPosition: member.imagePosition || 'center',
                    transformOrigin: member.imagePosition || 'center' 
                  }} 
                />
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.name}>{member.name}</h3>
                
                {member.role && 
                 !member.role.toLowerCase().includes('professor') && 
                 !member.role.toLowerCase().includes('orientador') && 
                 <p className={styles.role}>{member.role}</p>}
                
                <p className={`${styles.desc} ${expandedMap[member.name] ? styles.expanded : styles.clamped}`}>
                  {member.formation}
                </p>
                
                {member.formation.length > 50 && (
                  <span className={styles.readMoreBtn} onClick={() => toggleExpand(member.name)}>
                    {expandedMap[member.name] ? 'Ler menos' : 'Ler mais'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.arrowRight} onClick={handleNext}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
            <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
          </svg>
        </div>
      </div>

      {/* ===== LAYOUT MOBILE: SCROLL INFINITO NATIVO ===== */}
      <div 
        className={`${styles.mobileCardsScroll} ${styles.mobileLayout}`}
        id="teamMobileScroll"
      >
        {Array(20).fill(teamData).flat().map((member, i) => (
          <div className={styles.card} key={`mob-${i}`}>
            <div className={styles.imageWrapper}>
              <img 
                src={`${member.imgUrl}?v=8`} 
                alt={member.name} 
                className={styles.cardImage} 
                style={{ 
                  objectPosition: member.imagePosition || 'center',
                  transformOrigin: member.imagePosition || 'center' 
                }} 
              />
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.name}>{member.name}</h3>
                
                {member.role && 
                 !member.role.toLowerCase().includes('professor') && 
                 !member.role.toLowerCase().includes('orientador') && 
                 <p className={styles.role}>{member.role}</p>}
                
                <p className={`${styles.desc} ${expandedMap[member.name] ? styles.expanded : styles.clamped}`}>
                  {member.formation}
                </p>
                
                {member.formation.length > 50 && (
                  <span className={styles.readMoreBtn} onClick={() => toggleExpand(member.name)}>
                    {expandedMap[member.name] ? 'Ler menos' : 'Ler mais'}
                  </span>
                )}
              </div>
            </div>
        ))}
      </div>

      <Link href="/equipe" className={styles.viewMore} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
        <span>EQUIPE COMPLETA</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
          <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
          <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
        </svg>
      </Link>
    </section>
  );
}
