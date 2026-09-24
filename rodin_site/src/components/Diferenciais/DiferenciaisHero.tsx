import React from 'react';
import styles from './DiferenciaisHero.module.css';

export default function DiferenciaisHero() {
  return (
    <section id="diferenciais-hero" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Nossa Essência <br/> & Diferenciais</h1>
        <p className={styles.subtitle}>Inspirados pela arte de pensar e construir o futuro.</p>
      </div>
    </section>
  );
}
