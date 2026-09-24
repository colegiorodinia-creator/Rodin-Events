"use client";
import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Menu from '../Menu/Menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar({ theme = "light", backUrl = "/" }: { theme?: "light" | "dark", backUrl?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isStudentMenuOpen, setIsStudentMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const isHome = pathname === '/';
  const isSobreOColegio = pathname === '/quem-somos';
  const isEquipe = pathname === '/equipe';

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Initial state transition
      if (scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show header behavior
      if (scrollY > lastY && scrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastY = scrollY;

      // Show Back to Top button
      if (scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Escuta eventos dos vÃ­deos
    const handleVideoState = (e: any) => {
      setIsVideoPlaying(e.detail.isAnyPlaying);
    };
    window.addEventListener('videoStateChange', handleVideoState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('videoStateChange', handleVideoState);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCursosClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('cursos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExperienciaClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('experiencia');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* HEADER INICIAL (Transparente no topo) */}
      {isHome && (
        <div className={`${styles.headerInitial} ${isScrolled ? styles.hiddenFade : styles.visibleFade} ${isVideoPlaying ? styles.hideForVideoInitial : ''}`}>
          <Link href="/" className={styles.logoWrapperInitial} onClick={handleHomeClick}>
            <img 
              src={theme === "dark" ? "/logo_black.png" : "/logo.png"} 
              alt="ColÃ©gio Rodin" 
              className={styles.logoMainInitial}
            />
          </Link>
        </div>
      )}

      

            {/* BotÃ£o de Voltar Global (aparece em todas as pÃ¡ginas exceto a Home) */}
      {!isHome && !isMenuOpen && (
        <div style={{ position: 'fixed', top: '25px', left: '10vw', zIndex: 105 }}>
          <button onClick={() => router.back()} className={styles.backButtonGlobal} title="Voltar" style={{ pointerEvents: 'auto' }}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
              <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
              <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
            </svg>
          </button>
        </div>
      )}

{/* Hamburger Global (sempre visÃ­vel, transita posiÃ§Ã£o) */}
      <div 
        className={`${styles.hamburgerContainer} ${isScrolled || !isHome ? styles.scrolled : styles.initial} ${isVideoPlaying ? styles.hideForVideoPill : ''} ${isEquipe ? styles.invertedHamburger : ''}`}
        style={{ display: isMenuOpen ? 'none' : 'flex' }}
      >
        <button className={styles.hamburger} onClick={() => setIsMenuOpen(true)}>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>
      </div>
      
      {/* Menu Overlay */}
      {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}

      {/* BotÃ£o Voltar ao Topo */}
      <button 
        onClick={scrollToTop} 
        className={styles.backToTop}
        style={{ 
          opacity: showBackToTop && !isMenuOpen ? 1 : 0, 
          pointerEvents: showBackToTop && !isMenuOpen ? 'auto' : 'none',
          visibility: showBackToTop && !isMenuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease'
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
        </svg>
      </button>

      {/* BotÃ£o do WhatsApp Fixo */}
      <Link 
        href="/matriculas" 
        className={styles.whatsappBtn}
        style={{ 
          opacity: !isMenuOpen ? 1 : 0, 
          pointerEvents: !isMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease'
        }}
        title="MatrÃ­culas e Contato via WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "32px", height: "32px" }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </Link>
    </>
  );
}

