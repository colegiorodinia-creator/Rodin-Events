"use client";

import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Infraestrutura from '@/components/QuemSomos/Infraestrutura';
import QuemSomosHero from '@/components/QuemSomos/QuemSomosHero';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Diferenciais.module.css';

gsap.registerPlugin(ScrollTrigger);

const diffs = [
  {
    title: "Padrinho pensador",
    desc: "Acolhimento aos novos alunos",
    image: "/a-gente-e-diferente/padrinho-pensador.png"
  },
  {
    title: "Ciência e tecnologia",
    desc: "Disciplina experimental: prática que dá sentido a teoria aplicada ao cotidiano.",
    image: "/a-gente-e-diferente/ciencia-e-tecnologia.png"
  },
  {
    title: "Programa de educação bilíngue",
    desc: "Cinco aulas semanais com foco na oralidade e na aquisição de conhecimento.",
    image: "/a-gente-e-diferente/programa-de-educacao-bilingue.png"
  },
  {
    title: "Aulas especiais",
    desc: "Ampliam o interesse e a retenção dos conteúdos.",
    image: "/a-gente-e-diferente/aulas-especiais.png"
  },
  {
    title: "Orientação profissional",
    desc: "As carreiras sendo apresentadas por profissionais de mercado (2ª série do EM).",
    image: "/a-gente-e-diferente/orientacao-profissional.png"
  },
  {
    title: "RDN Art",
    desc: "Apresentações artísticas nos intervalos.",
    image: "/a-gente-e-diferente/rdn-art.jpg"
  },
  {
    title: "Feira de ciências",
    desc: "Estímulo à investigação, à criatividade e ao pensamento científico.",
    image: "/a-gente-e-diferente/feira-de-ciencias.png"
  },
  {
    title: "Inteligência emocional",
    desc: "Laboratório e disciplina que desenvolve habilidades socioemocionais.",
    image: "/a-gente-e-diferente/programa-de-inteligencia-emocional.png"
  },
  {
    title: "Rodin Cultural",
    desc: "O encontro das artes em todas as suas linguagens.",
    image: "/a-gente-e-diferente/rodin-cultural.png"
  },
  {
    title: "Desafio Esportivo RDN",
    desc: "O esporte proporcionando integração.",
    image: "/a-gente-e-diferente/desafio-rdn.png"
  }
];

export default function DiferenciaisPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.' + styles.section) as HTMLElement[];
    
    sections.forEach((section, i) => {
      const img = section.querySelector('.' + styles.image);
      const text = section.querySelector('.' + styles.textContent);

      if (img && text) {
        gsap.fromTo(img,
          { scale: 1.2, opacity: 0, y: 50 },
          {
            scale: 1, opacity: 1, y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(text,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <main className={styles.main} ref={containerRef}>
      <Navbar theme="dark" backUrl="/" />
      
      {/* Seção de Vídeo Institucional em Tela Cheia */}
      <QuemSomosHero />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img src="/a gente é diferente.png" alt="A gente é diferente" className={styles.heroTitleImg} />
        </div>
      </section>

      <div className={styles.contentWrapper}>
        {diffs.map((diff, i) => (
          <section key={i} className={`${styles.section} ${i % 2 !== 0 ? styles.sectionReverse : ''}`}>
            <div className={styles.imageContainer}>
              <img src={diff.image} alt={diff.title} className={styles.image} />
            </div>
            <div className={styles.textContent}>
              <h2 className={styles.title}>{diff.title}</h2>
              <p className={styles.desc}>{diff.desc}</p>
            </div>
          </section>
        ))}
      </div>

      <Infraestrutura />
      
      <Footer />
    </main>
  );
}
