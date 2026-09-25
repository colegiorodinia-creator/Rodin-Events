'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Event.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Event() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const mediaItems = [
    { 
      src: "/eventos/sarau.jpg",
      srcMobile: "/eventos/sarau_mobile.jpg",
      title: <>Sarau<br/>MÃ¡gico de Oz</>,
      desc: "Inspirado no clÃ¡ssico O MÃ¡gico de Oz, o sarau reÃºne arte, mÃºsica, teatro e literatura em uma experiÃªncia que valoriza a criatividade, a expressÃ£o e o talento dos nossos estudantes.",
      videoUrl: "https://www.youtube.com/watch?v=l5rlGIKLacQ&t=27s"
    },
    { 
      src: "/eventos/desafio_rdn.png",
      srcMobile: "/eventos/desafio_rdn_mobile.png",
      title: <>Desafio RDN</>,
      desc: "Uma competiÃ§Ã£o que une conhecimento, estratÃ©gia e trabalho em equipe. O Desafio RDN incentiva o protagonismo dos alunos em provas e atividades que despertam criatividade, raciocÃ­nio e espÃ­rito colaborativo.",
      videoUrl: "https://www.youtube.com/watch?v=84Y3k3VAtns"
    },
    { 
      src: "/eventos/feira_de_ciencias.png",
      srcMobile: "/eventos/feira_de_ciencias_mobile.png",
      title: <>Feira de<br/>CiÃªncias</>,
      desc: "Um espaÃ§o onde a curiosidade se transforma em descobertas. Na Feira de CiÃªncias, os estudantes apresentam projetos que unem pesquisa, experimentaÃ§Ã£o e inovaÃ§Ã£o, colocando o conhecimento em prÃ¡tica.",
      videoUrl: "https://www.youtube.com/watch?v=dfFNCqdnPn0&t=1s"
    },
    { 
      src: "/eventos/festa_dos_aprovados_mobile.jpg",
      srcMobile: "/eventos/festa_dos_aprovados_mobile.jpg",
      title: <>Festa dos<br/>Aprovados</>,
      desc: "Um momento especial para celebrar a dedicaÃ§Ã£o, o esforÃ§o e as conquistas dos nossos alunos. A Festa dos Aprovados homenageia aqueles que transformaram seus sonhos em realidade.",
      videoUrl: "https://www.youtube.com/watch?v=Tg548DH-JMI"
    },
    { 
      src: "/eventos/intercoc.png",
      srcMobile: "/eventos/intercoc_mobile.png",
      title: <>InterCOC</>,
      desc: "Muito mais do que uma competiÃ§Ã£o esportiva, o InterCOC promove integraÃ§Ã£o, cooperaÃ§Ã£o e espÃ­rito esportivo, incentivando o respeito, a superaÃ§Ã£o e o trabalho em equipe.",
      videoUrl: "https://www.instagram.com/p/DPUm8TuD7SM/"
    },
    { 
      src: "/eventos/rodin_cultural.jpg",
      srcMobile: "/eventos/rodin_cultural_mobile.jpg",
      title: <>Rodin<br/>Cultural</>,
      desc: "Um evento que celebra a diversidade da arte, da cultura e do conhecimento. O Rodin Cultural convida os alunos a explorar diferentes formas de expressÃ£o e compartilhar seus talentos.",
      videoUrl: "https://www.youtube.com/watch?v=3tCMBDbcRf0"
    },
    { 
      src: "/eventos/ted.jpeg",
      srcMobile: "/eventos/ted_mobile.jpg",
      title: <>TED</>,
      desc: "AtravÃ©s do formato das grandes conferÃªncias, o TED incentiva os estudantes a desenvolverem a comunicaÃ§Ã£o, o pensamento crÃ­tico e a confianÃ§a ao compartilhar ideias que podem inspirar e transformar.",
      videoUrl: "https://www.youtube.com/watch?v=mg2Dk1yBCwA"
    },
    { 
      src: "/eventos/acantonamento.png",
      srcMobile: "/eventos/acantonamento_mobile.png",
      title: <>Acantonamento</>,
      desc: "Mais do que uma noite no Rodin! O Acantonamento proporciona momentos de convivÃªncia, integraÃ§Ã£o e desenvolvimento da autonomia por meio de atividades que fortalecem laÃ§os e criam memÃ³rias inesquecÃ­veis.",
      videoUrl: "https://www.youtube.com/watch?v=czZUSLN9rVQ"
    }
  ];

  const maxStartIndex = Math.max(0, mediaItems.length - 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % mediaItems.length;
        if (next > startIndex + 3) {
          setStartIndex(Math.min(next - 3, maxStartIndex));
        } else if (next < startIndex) {
          setStartIndex(next);
        } else if (next === 0) {
          setStartIndex(0);
        }
        return next;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [startIndex, maxStartIndex, mediaItems.length]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current,
        { scale: 1 },
        {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleNextCarousel = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  const handlePrevCarousel = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className={styles.eventSection} ref={containerRef}>
      
      {/* Container PC */}
      <div className={styles.desktopLayout}>
        
        <div className={styles.bgContainer}>
          <div 
            ref={bgRef}
            className={styles.bgImage}
            style={{ backgroundImage: `url('${mediaItems[activeIndex].src}')` }}
          ></div>
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.carouselContainer}>
          <button aria-label="Evento anterior" className={`${styles.arrow} ${styles.iconPrev} ${startIndex === 0 ? styles.disabled : ''}`} 
            onClick={handlePrevCarousel}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
              <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
            </svg>
          </button>
          
          <div className={styles.thumbsGridWrapper}>
            <div className={styles.thumbsGrid} style={{ '--start-index': startIndex } as React.CSSProperties}>
              {mediaItems.map((item, i) => (
                <div 
                  key={i} 
                  className={`${styles.thumb} ${activeIndex === i ? styles.activeThumb : ''}`}
                  onClick={() => setActiveIndex(i)}
                  style={{ backgroundImage: `url('${item.src}')` }}
                />
              ))}
            </div>
          </div>

          <button aria-label="Próximo evento" className={`${styles.arrow} ${styles.iconNext} ${startIndex >= maxStartIndex ? styles.disabled : ''}`} 
            onClick={handleNextCarousel}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
              <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.textBlock}>
            <span className={styles.sectionLabel}>EVENTOS</span>
            <h2 className={styles.title}>
              {mediaItems[activeIndex].title}
            </h2>
            <p className={styles.desc}>
              {mediaItems[activeIndex].desc}
            </p>
            {mediaItems[activeIndex].videoUrl && (
              <a 
                href={mediaItems[activeIndex].videoUrl} 
                target={mediaItems[activeIndex].videoUrl !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer" 
                className={styles.watchButton}
                onClick={(e) => { if (mediaItems[activeIndex].videoUrl === "#") e.preventDefault(); }}
              >
                ASSISTA O VÃDEO COMPLETO
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Container Mobile */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileHeader}>
          <h2 className={styles.mobileSectionTitle}>EVENTOS</h2>
        </div>
        <div className={styles.mobileCardsScroll}>
          {mediaItems.map((item, i) => (
            <div key={i} className={styles.mobileCard}>
              <div className={styles.mobileCardImg} style={{ backgroundImage: `url('${item.srcMobile || item.src}')` }}> <div className={styles.mobileCardOverlay}> <h3 className={styles.mobileCardTitle}>{item.title}</h3> {item.videoUrl && ( <a href={item.videoUrl} target={item.videoUrl !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className={styles.mobileWatchButton} onClick={(e) => { if (item.videoUrl === "#") e.preventDefault(); }}> ASSISTA O V?DEO COMPLETO </a> )} </div> </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
