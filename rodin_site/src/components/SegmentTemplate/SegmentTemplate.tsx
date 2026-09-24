"use client";
import React, { useEffect, useRef } from 'react';
import styles from './SegmentTemplate.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

interface CurriculumGroup {
  groupName: string;
  subjects: string[];
}

interface SegmentProps {
  title: string;
  tagline: string;
  author?: string;
  heroImage: string;
  introSubtitle: string;
  introText: string[];
  galleryImages: string[];
  curriculumGroups?: CurriculumGroup[];
  curriculumImage?: string;
  galleryTitle?: string;
  bgPosition?: string;
  textMarginTop?: string;
}

export default function SegmentTemplate({
  title,
  tagline,
  author = "- Autor desconhecido",
  heroImage,
  introSubtitle,
  introText,
  galleryImages,
  curriculumGroups,
  curriculumImage,
  galleryTitle = "NOSSO ESPAÇO",
  bgPosition = "center",
  textMarginTop = "5vh"
}: SegmentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Parallax no fundo do Hero
    gsap.fromTo(bgRef.current, 
      { y: "-10%" },
      {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // 2. Animação do texto do Hero
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // 3. Fade up na introdução
    gsap.fromTo(introRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%",
        }
      }
    );

    // 4. Stagger na galeria
    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll(`.${styles.galleryItem}`);
      gsap.fromTo(items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div className={styles.pageWrapper}>
      <Navbar theme="light" />
      
      <main className={styles.main} ref={containerRef}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div 
            ref={bgRef}
            className={styles.heroBackground}
            style={{ backgroundImage: `url('${heroImage}')`, backgroundPosition: bgPosition }}
          ></div>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent} ref={textRef} style={{ marginTop: textMarginTop }}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.tagline}>"{tagline}"</p>
            <p className={styles.author}>{author}</p>
          </div>
        </section>

        {/* Intro Section */}
        <section className={styles.introSection} ref={introRef}>
          <div className={styles.container}>
            <h2 className={styles.introSubtitle}>{introSubtitle}</h2>
            <div className={styles.introText}>
              {introText.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Matriz Curricular Section (Optional) */}
        {(curriculumImage || (curriculumGroups && curriculumGroups.length > 0)) && (
          <section className={styles.curriculumSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Matriz Curricular</h2>
              {curriculumImage ? (
                <div className={styles.curriculumImageWrapper}>
                  <img src={curriculumImage} alt="Matriz Curricular" className={styles.curriculumImage} />
                </div>
              ) : (
                <div className={styles.curriculumGrid}>
                  {curriculumGroups!.map((group, idx) => (
                    <div key={idx} className={styles.curriculumCard}>
                      <h3 className={styles.curriculumCardTitle}>{group.groupName}</h3>
                      <ul className={styles.curriculumList}>
                        {group.subjects.map((subject, sIdx) => (
                          <li key={sIdx}>{subject}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        <section className={styles.gallerySection}>
          <div className={styles.container}>
            {galleryTitle && <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>{galleryTitle}</h2>}
            <div className={styles.grid} ref={galleryRef}>
              {galleryImages.map((src, idx) => (
                <div key={idx} className={styles.galleryItem}>
                  <img src={src} alt={`Estrutura ${idx + 1}`} className={styles.galleryImage} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}