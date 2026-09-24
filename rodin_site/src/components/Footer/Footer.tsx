"use client";
import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        {isMobile ? (
          <div className={styles.columns}>
            <div className={styles.colLeft}>
              <p className={styles.boldText}>Indaiatuba - SP</p>
              <a href="https://www.google.com/maps/search/?api=1&query=R.+Padre+José+de+Anchieta,+484+Vila+Sfeir+Indaiatuba" target="_blank" rel="noopener noreferrer">R. Padre José de Anchieta, 484<br/>Vila Sfeir</a>
              <a href="tel:+551938859800">Telefone: (19) 3885-9800</a>
              <a href="https://wa.me/5519994837671" target="_blank" rel="noopener noreferrer">WhatsApp: (19) 99483-7671</a>
              
              <div className={styles.spacer}></div>

              <p className={styles.boldText}>© Colégio Rodin 2026</p>
              
              <div className={styles.spacer}></div>

              <p>Segunda a sexta-feira</p>
              <p>7h30 às 17h00</p>
              <p>Todos os direitos reservados.</p>
            </div>

            <div className={styles.colRight}>
              <p className={styles.boldText}>E-mail</p>
              <a href="mailto:contato@colegiorodin.com.br" style={{ textDecoration: 'underline' }}>contato@colegiorodin.com.br</a>
              
              <div className={styles.spacer}></div>
              
              <a href="https://www.instagram.com/colegiorodin/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/colegiorodin" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.youtube.com/@colegiorodin9842" target="_blank" rel="noopener noreferrer">Youtube</a>
              <a href="https://www.tiktok.com/@colegiorodin" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
          </div>
        ) : (
          <div className={styles.columnsPC}>
            <div className={styles.colPC}>
              <p className={styles.boldText}>Indaiatuba - SP</p>
              <a href="https://www.google.com/maps/search/?api=1&query=R.+Padre+José+de+Anchieta,+484+Vila+Sfeir+Indaiatuba" target="_blank" rel="noopener noreferrer">R. Padre José de Anchieta, 484 Vila Sfeir</a>
              <a href="tel:+551938859800">Telefone (19) 3885-9800</a>
              <a href="https://wa.me/5519994837671" target="_blank" rel="noopener noreferrer">WhatsApp (19) 99483-7671</a>
              <a href="mailto:contato@colegiorodin.com.br">E-mail contato@colegiorodin.com.br</a>
            </div>

            <div className={styles.colPC}>
              <a href="https://www.instagram.com/colegiorodin/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/colegiorodin" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.youtube.com/@colegiorodin9842" target="_blank" rel="noopener noreferrer">Youtube</a>
              <a href="https://www.tiktok.com/@colegiorodin" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>

            <div className={styles.colPC}>
              <p className={styles.boldText}>© Colégio Rodin 2026.</p>
              <p>Todos os direitos reservados.</p>
              <div className={styles.spacerSmall}></div>
              <p>Segunda a sexta-feira</p>
              <p>7h30 às 17h00</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.logoWrapper}></div>
      </div>
    </footer>
  );
}