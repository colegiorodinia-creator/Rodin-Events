"use client";
import React, { useRef } from 'react';
import styles from './Programs.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const programsData = [
  {
    title: <>Cursos<br/>Extracurriculares</>,
    desc: <>Nossa grade de cursos abre um universo de possibilidades: da disciplina à expressão artística, da fluência em novos idiomas à mente estratégica. Cada caminho foi pensado para o crescimento integral do aluno.</>,
    youtubeId: "_uicu5AFHyc",
    thumbUrl: "/extracurriculares/thumb/thumb_video1.png?v=2",
    thumbUrlMobile: "/extracurriculares/thumb/thumb_video1.png?v=2",
    mobileTranslateX: "-50%",
    link: "/extracurriculares",
    buttonText: "Conheça Todas as Modalidades"
  },
  {
    title: <>Itinerários<br/>formativos eletivos</>,
    desc: <>Os Itinerários Formativos Eletivos são oportunidades para os estudantes explorarem áreas de interesse, desenvolverem habilidades e se conectarem <br className={styles.mobileBreak} />com o que realmente amam aprender.</>,
    youtubeId: "nTbgYo5ghfU",
    thumbUrl: "/extracurriculares/thumb/thumb_video2.png", bgPositionMobile: "80% center", 
    thumbUrlMobile: "/extracurriculares/thumb/thumb_video2_mobile_final.png?v=1",
    mobileTranslateX: "-50%",
    link: "/itinerarios",
    buttonText: "Conheça Nossos Itinerários"
  },
  {
    title: <>Programa<br/>de Educação Bilíngue</>,
    desc: <>O idioma utilizado como meio de aquisição de conhecimento e não como finalidade da aula. Nas cinco aulas semanais, são desenvolvidos em inglês conteúdos que integram o currículo escolar, aprimorando as habilidades linguísticas dos alunos, com foco <br className={styles.mobileBreak} />especial na oralidade.</>,
    youtubeId: "",
    thumbUrl: "/extracurriculares/thumb/thumb_video3.jpg?v=2",
    thumbUrlMobile: "/extracurriculares/thumb/thumb_video3.jpg?v=2",
    mobileTranslateX: "-50%",
    link: "/bilingue",
    buttonText: "Saiba mais sobre o Bilíngue"
  }
];

export default function Programs() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    if (window.innerWidth <= 768) return;
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1025px)", () => {
        setTimeout(() => ScrollTrigger.refresh(), 500);
        setTimeout(() => ScrollTrigger.refresh(), 2000);
        setTimeout(() => ScrollTrigger.refresh(), 500);
        setTimeout(() => ScrollTrigger.refresh(), 2000);
      if (!containerRef.current) return;
      const sections = gsap.utils.toArray("." + styles.tiktokSection) as HTMLElement[];
      gsap.set(sections.slice(1), { yPercent: 100 });
      let currentIndex = 0;
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        pinType: "fixed",
        start: "top top",
        end: "+=600",
        onUpdate: (self) => {
          const progress = self.progress;
          let targetIndex = 0;
          if (progress > 0.66) targetIndex = 2;
          else if (progress > 0.33) targetIndex = 1;
          if (targetIndex !== currentIndex) {
             if (targetIndex > currentIndex) {
               gsap.to(sections[targetIndex], { yPercent: 0, duration: 1.2, ease: "power3.inOut", overwrite: true });
             } else {
               gsap.to(sections[currentIndex], { yPercent: 100, duration: 1.2, ease: "power3.inOut", overwrite: true });
             }
             currentIndex = targetIndex;
          }
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div className="programs-gsap-wrapper">
      <section className={styles.programs} ref={containerRef}>
      <div className={styles.tiktokContainer}>
        <div className={styles.tiktokTrack} ref={trackRef}>
          {programsData.map((prog, i) => (
            <div key={i} className={styles.tiktokSection}>
              
              <div className={styles.iframeWrapper}>
                <>
                  <div 
                    className={styles.thumbnailLayerDesktop} 
                    style={{ backgroundImage: `url('${prog.thumbUrl}')`, cursor: 'default' }}
                  >
                  </div>
                    <div 
                      className={styles.thumbnailLayerMobile} 
                      style={{ overflow: 'hidden', cursor: 'default' }}
                    >
                      <img 
                        src={prog.thumbUrlMobile} 
                        alt="Thumbnail" 
                        style={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: '50%', 
                          height: '100%', 
                          width: 'auto', 
                          maxWidth: 'none', 
                          transform: `translateX(${prog.mobileTranslateX})` 
                        }} 
                       loading="lazy" decoding="async" />
                  </div>
                </>
              </div>

              <div className={styles.videoOverlay}>
                <div className={styles.textContent}>
                  <h3 className={styles.title}>{prog.title}</h3>
                  <p className={styles.desc}>{prog.desc}</p>
                  <Link href={prog.link} className={styles.exploreButton} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ flex: 1, whiteSpace: 'normal', lineHeight: 1.2, display: 'block' }}>{prog.buttonText.toUpperCase()}</span>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
                      <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
                      <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
