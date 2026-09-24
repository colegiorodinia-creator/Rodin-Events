"use client";
import React from 'react';
import styles from './QuemSomosHero.module.css';

export default function QuemSomosHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.videoWrapper}>
        {/* Fundo preto conforme solicitado para o vídeo em breve */}
        <div 
          className={styles.bgVideo} 
          style={{ backgroundColor: '#111' }}
        ></div>
        
        <div className={styles.overlay}></div>
        
        <div className={styles.content}>
          <div className={styles.playButton}>
             <div className={styles.playTriangle}></div>
          </div>
          <h1 className={styles.title}>CONHEÇA O COLÉGIO RODIN</h1>
          <p className={styles.subtitle}>Vídeo de apresentação em breve</p>
        </div>
      </div>
    </section>
  );
}
