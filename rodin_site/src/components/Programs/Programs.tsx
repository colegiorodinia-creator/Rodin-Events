"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './Programs.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import YouTube from 'react-youtube';

gsap.registerPlugin(ScrollTrigger);

const programsData = [
  {
    title: "Cursos Extracurriculares",
    desc: <>Nossa grade de cursos abre um universo de possibilidades: da disciplina Ã  expressÃ£o artÃ­stica, da fluÃªncia em novos idiomas Ã  mente estratÃ©gica. Cada caminho foi pensado para o crescimento integral <br className={styles.mobileBreak} />do aluno.</>,
    youtubeId: "_uicu5AFHyc",
    thumbUrl: "/extracurriculares/thumb/thumb_video1.png?v=2",
    thumbUrlMobile: "/extracurriculares/thumb/thumb_video1.png?v=2",
    mobileTranslateX: "-50%",
    link: "/extracurriculares",
    buttonText: "ConheÃ§a Todas as Modalidades"
  },
  {
    title: <>ItinerÃ¡rios<br/>formativos eletivos</>,
    desc: <>Os ItinerÃ¡rios Formativos Eletivos sÃ£o oportunidades para os estudantes explorarem Ã¡reas de interesse, desenvolverem habilidades e se conectarem <br className={styles.mobileBreak} />com o que realmente amam aprender.</>,
    youtubeId: "nTbgYo5ghfU",
    thumbUrl: "/extracurriculares/thumb/thumb_video2.png", bgPositionMobile: "80% center", 
    thumbUrlMobile: "/extracurriculares/thumb/thumb_video2_mobile_final.png?v=1",
    mobileTranslateX: "-50%",
    link: "/itinerarios",
    buttonText: "ConheÃ§a Nossos ItinerÃ¡rios"
  },
  {
    title: <>Programa<br/>de EducaÃ§Ã£o BilÃ­ngue</>,
    desc: <>O idioma utilizado como meio de aquisiÃ§Ã£o de conhecimento e nÃ£o como finalidade da aula. Nas cinco aulas semanais, sÃ£o desenvolvidos em inglÃªs conteÃºdos que integram o currÃ­culo escolar, aprimorando as habilidades linguÃ­sticas dos alunos, com foco <br className={styles.mobileBreak} />especial na oralidade.</>,
    youtubeId: "",
    thumbUrl: "/extracurriculares/thumb/thumb_video3.jpg?v=2",
    thumbUrlMobile: "/extracurriculares/thumb/thumb_video3.jpg?v=2",
    mobileTranslateX: "-50%",
    link: "/bilingue",
    buttonText: "Saiba mais sobre o BilÃ­ngue"
  }
];

const youtubeOpts = {
  height: '100%',
  width: '100%',
  playerVars: {
    autoplay: 0,
    loop: 1,
    controls: 1,
    modestbranding: 1,
    rel: 0,
    playsinline: 1
  },
};

export default function Programs() {
  const [playing, setPlaying] = useState<{ [key: number]: boolean }>({});
  const [players, setPlayers] = useState<{ [key: number]: any }>({});
  const hasPlayedRef = useRef<{ [key: number]: boolean }>({});
  const lastPlayTimeRef = useRef<{ [key: number]: number }>({});

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Notifica o Navbar quando algum vÃ­deo dessa seÃ§Ã£o estÃ¡ tocando (para esconder o cabeÃ§alho)
  useEffect(() => {
    const isAnyPlaying = Object.values(playing).some(val => val === true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('programsVideoState', { detail: { isAnyPlaying } }));
    }
  }, [playing]);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1025px)", () => {
      if (!containerRef.current) return;
      const sections = gsap.utils.toArray("." + styles.tiktokSection) as HTMLElement[];
      gsap.set(sections.slice(1), { yPercent: 100 });
      let currentIndex = 0;
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
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

  const onReady = (e: any, index: number) => {
    setPlayers(prev => ({ ...prev, [index]: e.target }));
  };

  const handleCustomPlay = (index: number) => {
    if (!programsData[index].youtubeId) return; // Se nÃ£o tiver vÃ­deo, nÃ£o faz nada
    hasPlayedRef.current[index] = false;
    setPlaying(prev => ({ ...prev, [index]: true }));
    if (players[index]) {
      try {
        players[index].playVideo();
      } catch (e) {
        console.warn("Autoplay blocked by browser", e);
      }
    }
  };

  return (
    <div className="programs-gsap-wrapper">
      <section className={styles.programs} ref={containerRef}>
      <div className={styles.tiktokContainer}>
        <div className={styles.tiktokTrack} ref={trackRef}>
          {programsData.map((prog, i) => (
            <div key={i} className={styles.tiktokSection}>
              
              <div className={styles.iframeWrapper}>
                {!playing[i] && (
                  <>
                    <div 
                      className={styles.thumbnailLayerDesktop} 
                      style={{ backgroundImage: `url('${prog.thumbUrl}')` }}
                      onClick={() => handleCustomPlay(i)}
                    >
                      {!prog.youtubeId ? (
                        <div className={styles.videoPlaceholderText}>
                          <p>VÃDEO EM BREVE</p>
                        </div>
                      ) : (
                        <div className={styles.playCenter}>
                          <button className={styles.playButton} onClick={() => handleCustomPlay(i)}>
                            <div className={styles.playTriangle}></div>
                          </button>
                        </div>
                      )}
                    </div>
                      <div 
                        className={styles.thumbnailLayerMobile} 
                        onClick={() => handleCustomPlay(i)}
                        style={{ overflow: 'hidden' }}
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
                        />
                      {!prog.youtubeId ? (
                        <div className={styles.videoPlaceholderText} style={{ zIndex: 6 }}>
                          <p>VÃDEO EM BREVE</p>
                        </div>
                      ) : (
                        <div className={styles.playCenter} style={{ zIndex: 6 }}>
                          <button className={styles.playButton} onClick={() => handleCustomPlay(i)} onTouchEnd={(e) => { e.preventDefault(); handleCustomPlay(i); }}>
                            <div className={styles.playTriangle}></div>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {prog.youtubeId && (
                  <>
                    <YouTube 
                      videoId={prog.youtubeId} 
                      opts={youtubeOpts} 
                      onReady={(e) => onReady(e, i)}
                      onStateChange={(e) => {
                        if (e.data === 1) { // Playing
                          hasPlayedRef.current[i] = true;
                          lastPlayTimeRef.current[i] = Date.now();
                          setPlaying(prev => ({ ...prev, [i]: true }));
                        } else if (e.data === 2 && hasPlayedRef.current[i]) {
                          const timeSincePlay = Date.now() - (lastPlayTimeRef.current[i] || 0);
                          if (timeSincePlay > 500) { // Only revert if it played for at least half a second
                            setPlaying(prev => ({ ...prev, [i]: false }));
                            hasPlayedRef.current[i] = false;
                          }
                        } else if (e.data === 0 && hasPlayedRef.current[i]) {
                          setPlaying(prev => ({ ...prev, [i]: false }));
                          hasPlayedRef.current[i] = false;
                        }
                      }}
                      className={styles.iframe}
                      iframeClassName={styles.iframe}
                    />
                    {playing[i] && (
                      <div 
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          zIndex: 10,
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          if (players[i]) players[i].pauseVideo();
                        }}
                      />
                    )}
                  </>
                )}
              </div>

              <div className={`${styles.videoOverlay} ${playing[i] ? styles.overlayHidden : ''}`}>
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

