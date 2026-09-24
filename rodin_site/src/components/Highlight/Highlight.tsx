"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './Highlight.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import YouTube from 'react-youtube';

gsap.registerPlugin(ScrollTrigger);

export default function Highlight() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Controls if video is mounted
  const [isPaused, setIsPaused] = useState(false);   // Controls if video is paused
  const [localThumbs, setLocalThumbs] = useState<Record<number, string>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Lia Purcina",
      role: "Aluna do 7º ano",
      quote: "Diminuiu muito meu tempo de tela. Sabe, é como se eu estivesse mais feliz, mais livre, assim, depois de sair mais das telas.",
      coverImage: "/depoimentos/lia.png",
      thumbImage: "/depoimentos/lia_icon.jpg",
      videoId: "iRmFjoG0EHE",
      localVideoMobile: "/depoimentos_mobile/lia_purcina.mp4",
      imagePosition: "85% center" /* Mantém ela na direita, mas puxa um pouquinho para a esquerda */
    },
    {
      id: 2,
      name: "Silvinita Festa",
      role: "Mãe da ex-aluna Laura Festa",
      quote: "O Rodin, além de trazer uma educação indiscutível, é uma escola excelente nesse sentido, ajudou a formar a Laura, como ser humano no sentido mais amplo da palavra.",
      coverImage: "/depoimentos/depoimento2.jpg",
      thumbImage: "/depoimentos/silvinita_icon.jpg",
      videoId: "7EkeLU9VI6w",
      localVideoMobile: "/depoimentos_mobile/silvinita_festa.mp4",
      imagePositionMobile: "84% center"
    },
    {
      id: 3,
      name: "Laura Festa",
      role: "Ex-aluna, formada em 2024",
      quote: "Era um carinho que eu não sei expressar até hoje o quão significativo foi pra mim aqueles momentos que o colégio se prestou e me ajudou!",
      coverImage: "/depoimentos/depoimento3.png",
      thumbImage: "/depoimentos/laura_festa_icon.jpg",
      videoId: "lpXjRrRQVys",
      localVideoMobile: "/depoimentos_mobile/laura_festa.mp4",
      imagePositionMobile: "74% center"
    },
    {
      id: 4,
      name: "Rodrigo Kenji",
      role: "Ex-aluno, formado em 2025",
      quote: "Outro fator assim, importantíssimo, é a intimidade que a gente tem com todos os profissionais daqui é maior!",
      coverImage: "/depoimentos/depoimento4.jpg",
      thumbImage: "/depoimentos/rodrigo_kenji_icon.png",
      videoId: "xXN8Zi6WjBU",
      localVideoMobile: "/depoimentos_mobile/rodrigo_kenji.mp4",
      imagePositionMobile: "83% center"
    },
    {
      id: 5,
      name: "Isabela Trevelato",
      role: "Aluna da 3ª série",
      quote: "O Rodin, ele foca em te ensinar, fazer você aprender e evoluir como pessoa também, não só como estudante.",
      coverImage: "/depoimentos/depoimento5.jpg",
      thumbImage: "/depoimentos/isabela_trevelato_icon.jpg",
      videoId: "LyIpJwjwB_4",
      localVideoMobile: "/depoimentos_mobile/isabela_trevelato.mp4",
      imagePositionMobile: "78% center"
    },
    {
      id: 6,
      name: "Giovanna Leonel",
      role: "Ex-aluna, formada em 2025",
      quote: "Se você falar com um monitor, se você fala com algum coordenador, é muito bom, porque eles entendem, eles acolhem, eles tentam ajudar da melhor forma possível, e é muito bom!",
      coverImage: "/depoimentos/depoimento6.jpg",
      thumbImage: "/depoimentos/giovanna_leonel_icon.png",
      videoId: "e4P20hEoe0M",
      localVideoMobile: "/depoimentos_mobile/giovanna_leonel.mp4",
        imagePositionMobile: "82% center"
    }
  ];

  const activeItem = testimonials[activeIdx];

  useEffect(() => {
    // Animação de parallax no background
    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Notifica o Navbar quando o vídeo de depoimento está tocando (para esconder o cabeçalho)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('programsVideoState', { detail: { isAnyPlaying: isPlaying } }));
    }
  }, [isPlaying]);

  const handlePrev = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.highlightSection} ref={containerRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndHandler}>
      
      {/* Background Dinâmico (Imagem ou Vídeo) */}
      {!isPlaying ? (
        <div 
          ref={bgRef}
          className={styles.bgImage}
          style={{ 
            backgroundImage: `url('${activeItem.coverImage}')`,
            backgroundPosition: (isMobile && activeItem.imagePositionMobile) ? activeItem.imagePositionMobile : (activeItem.imagePosition || 'center top')
          }}
        ></div>
      ) : (
        <div className={styles.inlineVideoWrapper}>
          {(isMobile && activeItem.localVideoMobile) || (activeItem as any).localVideo ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <video 
                id="mobile-testimonial-video"
                src={(isMobile && activeItem.localVideoMobile) ? activeItem.localVideoMobile : (activeItem as any).localVideo}
                autoPlay
                playsInline
                onPlay={() => setIsPaused(false)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false);
                  setIsPaused(false);
                }}
                className={styles.youtubeIframe}
              />
              <div 
                style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                onClick={() => {
                  const vid = document.getElementById('mobile-testimonial-video') as HTMLVideoElement;
                  if (vid) {
                    if (vid.paused) vid.play();
                    else vid.pause();
                  }
                }}
              />
            </div>
          ) : (
            <YouTube 
              videoId={activeItem.videoId}
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  rel: 0,
                },
              }}
              onPlay={() => setIsPaused(false)}
              onPause={() => setIsPlaying(false)}
              onEnd={() => {
                setIsPlaying(false);
                setIsPaused(false);
              }}
              className={styles.youtubeContainer}
              iframeClassName={styles.youtubeIframe}
            />
          )}
        </div>
      )}
      
      {/* Esconde a sobreposição escura enquanto o vídeo toca para permitir o clique */}
      {(!isPlaying || (isMobile && isPaused)) && <div className={styles.overlay}></div>}

      {/* Texto do Depoimento */}
      {(!isPlaying || (isMobile && isPaused)) && (
        <div className={styles.textOverlay}>
          <span className={styles.sectionLabel}>
            DEPOIMENTOS
          </span>
          <div className={styles.textHeader}>
            <div className={styles.textTitles}>
              <h2 className={styles.testimonyName}>{activeItem.name}</h2>
              <p className={styles.testimonyRole}>{activeItem.role}</p>
            </div>
          </div>
          <div className={styles.textDivider}></div>
          {!isMobile && <p className={styles.testimonyQuote}>"{activeItem.quote}"</p>}
        </div>
      )}
      
      {/* Play Button Gigante no Centro da Tela */}
      {!isPlaying && (
        <div className={styles.playCenter} onClick={() => {
          setIsPlaying(true);
          setIsPaused(false);
        }}>
          <div className={styles.playButton}>
            <div className={styles.playTriangle}></div>
          </div>
        </div>
      )}
      
      <div className={styles.content}>
        <div 
          className={styles.carouselContainer}
          style={{ 
            opacity: (isPlaying && !(isMobile && isPaused)) ? 0 : 1, 
            pointerEvents: (isPlaying && !(isMobile && isPaused)) ? 'none' : 'auto', 
            transition: 'opacity 0.5s ease' 
          }}
        >
          <div className={styles.thumbsGrid}>
            {testimonials.map((item) => {
              const i = testimonials.findIndex(t => t.id === item.id);
              return (
                <div 
                  key={item.id} 
                  className={`${styles.thumbWrapper} ${i === activeIdx ? styles.thumbActive : ''}`}
                  onClick={() => {
                    setActiveIdx(i);
                    setIsPlaying(false);
                    setIsPaused(false);
                  }}
                >
                  <div 
                    className={styles.thumb}
                    style={{ backgroundImage: `url(${item.thumbImage})` }}
                  ></div>
                  {/* Micro ícone de play na thumbnail */}
                  <div className={styles.microPlay}>
                     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}



























