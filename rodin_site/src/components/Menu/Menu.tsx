"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './Menu.module.css';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isAlunoDropdownOpen, setIsAlunoDropdownOpen] = useState(false);

  const handleCursosClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (pathname === '/') {
      const el = document.getElementById('cursos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#cursos');
    }
  };

  const handleExperienciaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (pathname === '/') {
      const el = document.getElementById('experiencia');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#experiencia');
    }
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(linksRef.current?.children || [], 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, delay: 0.2, ease: "power3.out" }
      );
    } else {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
      setTimeout(() => setIsAlunoDropdownOpen(false), 400);
    }
  }, [isOpen]);

  return (
    <div className={styles.overlay} ref={overlayRef} style={{ visibility: 'hidden', opacity: 0 }}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Colégio Rodin" />
        </div>
        <div className={styles.headerRight}>
           <button className={styles.closeBtn} onClick={onClose}>
             <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
               <path d="M18 6L6 18M6 6l12 12"/>
             </svg>
           </button>
        </div>
      </div>

      <div className={styles.bottomLinks}>
         <Link href="/matriculas" className={styles.bottomLink} onClick={onClose}>Entre em contato</Link>
         <a href="/trabalhe-conosco/index.html" target="_blank" rel="noopener noreferrer" className={styles.bottomLink} onClick={onClose}>Trabalhe Conosco</a>
         <a href="https://colegiorodin.com.br/radio-rodin-player/" target="_blank" rel="noopener noreferrer" className={styles.bottomLink} onClick={onClose}>Rádio Rodin</a>
         <div className={styles.dropdownContainerBottom}>
           <button 
             className={styles.bottomLink} 
             onClick={() => setIsAlunoDropdownOpen(!isAlunoDropdownOpen)}
           >
             Área do Aluno {isAlunoDropdownOpen ? '▴' : '▾'}
           </button>
           
           {isAlunoDropdownOpen && (
             <div className={styles.dropdownMenuBottom}>
               <a href="https://portal.colegiorodin.com.br/wp-login.php?redirect_to=https%3A%2F%2Fportal.colegiorodin.com.br%2F&reauth=1" target="_blank" rel="noopener noreferrer">Portal do Aluno</a>
               <a href="https://colegiorodin.trieduconline.com.br/login" target="_blank" rel="noopener noreferrer">Portal Trieduk</a>
               <a href="https://coc.com.br/" target="_blank" rel="noopener noreferrer">Portal COC</a>
               <a href="https://colegiorodin.com.br/lista-de-materiais/" target="_blank" rel="noopener noreferrer">Lista de Materiais</a>
             </div>
           )}
         </div>
      </div>
      
      <div className={styles.content}>
        <ul className={styles.mainLinks} ref={linksRef}>
          <li><Link href="/" onClick={onClose}>Home</Link></li>
          <li><Link href="/quem-somos" onClick={onClose}>Nossa História</Link></li>
          <li><Link href="/diferenciais" onClick={onClose}>Diferenciais</Link></li>
          <li><a href="/#cursos" onClick={handleCursosClick}>Cursos</a></li>
          <li><Link href="/equipe" onClick={onClose}>Equipe</Link></li>
          <li><a href="/#experiencia" onClick={handleExperienciaClick}>Experiência</a></li>
        </ul>
      </div>
    </div>
  );
}
