"use client";
import React, { useEffect } from 'react';
import styles from './InformacoesQuemSomos.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const infoData = [
  {
    title: "Proposta Pedagógica",
    desc: (
      <>
        <p>Criar identidades, desenvolver a afetividade e a sociabilidade, promover valores e contribuir para a cidadania engajada, responsável e participativa, são alguns dos princípios que norteiam a ação educacional do Colégio Rodin, aplicada a partir dos mais inovadores métodos pedagógicos e em consonância com as necessidades do mundo contemporâneo.</p>
        <p style={{ marginTop: '0.8rem' }}>Apostamos em um modelo pedagógico diferenciado. A matriz curricular integra, além dos componentes tradicionais, componentes inovadores e atuais. Destacam-se:</p>
        <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', listStyleType: 'disc', lineHeight: 1.4 }}>
          <li>Ciência e Tecnologia Aplicadas ao Cotidiano</li>
          <li>Projeto de Desenvolvimento da Inteligência Emocional</li>
          <li>Atualidades e Século XXI</li>
          <li>Orientação Profissional</li>
          <li>Arte — Dança, Música e Teatro</li>
        </ul>
        <p style={{ marginTop: '0.8rem' }}>Essas disciplinas proporcionam novas experiências e vivências, tornando o aprendizado mais contextualizado e desafiador, bem como o momento da escolha profissional menos angustiante e mais seguro.</p>
      </>
    ),
    bgUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&fit=crop"
  },
  {
    title: "Orientação Educacional",
    desc: (
      <p>A equipe pedagógica é composta por profissionais especializados que, levando em conta cada etapa do desenvolvimento do estudante, oferecem às famílias e aos alunos todas as ferramentas necessárias para o crescimento e desenvolvimento de suas potencialidades, proporcionando, assim, a conquista da responsabilidade e da autonomia, indispensáveis para a vida adulta.</p>
    ),
    bgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&fit=crop"
  },
  {
    title: "Sistema COC de Ensino",
    desc: (
      <p>Somado à coordenação pedagógica e ao corpo docente de altíssimo nível, o Colégio Rodin adota o <a href="http://www.coc.com.br/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rodin-orange)', textDecoration: 'underline' }}>Sistema COC de Ensino</a>. Com mais de 50 anos de atuação, o Sistema COC unifica vanguarda e inovação por meio de uma metodologia educacional que é sinônimo de sucesso no setor educacional brasileiro, ampliando, assim, o potencial do colégio.</p>
    ),
    bgUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2000&fit=crop"
  }
];

export default function InformacoesQuemSomos() {
  
  useEffect(() => {
    // Efeito Parallax Suave nas Imagens
    const bgs = gsap.utils.toArray(`.${styles.bgImage}`) as HTMLElement[];
    bgs.forEach(bg => {
      gsap.to(bg, {
        yPercent: 20, // Move a imagem sutilmente para baixo enquanto o usuário rola
        ease: "none",
        scrollTrigger: {
          trigger: bg.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Fade up no texto quando entra na tela
    const texts = gsap.utils.toArray(`.${styles.textContent}`) as HTMLElement[];
    texts.forEach(text => {
      gsap.fromTo(text, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="programs-gsap-wrapper">
      <section className={styles.container}>
        {infoData.map((info, i) => (
          <div key={i} className={styles.parallaxSection}>
            {/* O container interno da imagem tem altura extra para permitir o parallax sem mostrar fundo branco */}
            <div className={styles.bgWrapper}>
              <div 
                className={styles.bgImage} 
                style={{ backgroundImage: `url('${info.bgUrl}')` }}
              ></div>
            </div>

            {/* Overlay Escuro com Texto */}
            <div className={styles.videoOverlay}>
              <div className={styles.textContent}>
                <h3 className={styles.title}>{info.title}</h3>
                <div className={styles.desc}>{info.desc}</div>
              </div>
            </div>

          </div>
        ))}
      </section>
    </div>
  );
}
