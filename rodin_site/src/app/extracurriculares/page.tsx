"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import YouTube from 'react-youtube';
import { extracurricularesData } from '@/data/extracurricularesData';
import styles from './Extracurriculares.module.css';

export default function ExtracurricularesPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasPlayedRef = React.useRef(false);
  const lastPlayTimeRef = React.useRef(0);
  const playerRef = React.useRef<any>(null);

  return (
    <main>
      <Navbar />
      
      <section className={styles.hero}>
        <YouTube 
          videoId="_uicu5AFHyc" 
          className={styles.videoWrapper}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1,
              controls: 1,
              rel: 0,
              playsinline: 1
            },
          }}
          onReady={(e) => playerRef.current = e.target}
          onStateChange={(e) => {
            if (e.data === 1) {
              hasPlayedRef.current = true;
              lastPlayTimeRef.current = Date.now();
            } else if (e.data === 2 && hasPlayedRef.current) {
              const timeSincePlay = Date.now() - lastPlayTimeRef.current;
              if (timeSincePlay > 500) {
                setIsPlaying(false);
                hasPlayedRef.current = false;
              }
            } else if (e.data === 0 && hasPlayedRef.current) {
              setIsPlaying(false);
              hasPlayedRef.current = false;
            }
          }}
        />

        {!isPlaying && (
          <>
            <div 
              className={styles.heroBg} 
              style={{ backgroundImage: "url('/extracurriculares/thumb/thumb_video1.png?v=2')" }}
            ></div>
            <div className={styles.heroOverlayDark}></div>
            <div className={styles.playButtonWrapper}>
              <button 
                className={styles.playButton} 
                aria-label="Play video"
                onClick={(e) => {
                  e.preventDefault();
                  hasPlayedRef.current = false;
                  setIsPlaying(true);
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.textOverlay}>
              <div className={styles.textOverlayTop}>
                <h2 className={styles.textOverlayName}>Extracurriculares</h2>
                <p className={styles.textOverlayRole}>Colégio Rodin</p>
                <div className={styles.textOverlayDivider}></div>
              </div>
              <div className={styles.textOverlayBottom}>
                <p className={styles.textOverlayQuote}>
                  "Formação completa com modalidades exclusivas que desenvolvem habilidades muito além da sala de aula."
                </p>
              </div>
            </div>
          </>
        )}
        
        {isPlaying && (
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
              if (playerRef.current) playerRef.current.pauseVideo();
            }}
          />
        )}
      </section>

      <section className={styles.introSection}>
        <h1 className={styles.title}>Vivências que Transformam</h1>
        <p className={styles.subtitle}>
          Muito além do conteúdo acadêmico, nossas atividades extracurriculares estimulam a criatividade, a autonomia e o desenvolvimento integral de cada estudante.
        </p>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {extracurricularesData.map((item) => (
              <Link href={`/extracurriculares/${item.id}`} key={item.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={item.image} alt={item.title} className={styles.image} />
                  <div className={styles.overlay}>
                    <span className={styles.exploreText}>Explorar</span>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}