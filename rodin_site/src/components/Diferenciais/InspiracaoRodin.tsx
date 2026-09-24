"use client";
import React, { useRef } from 'react';
import styles from './InspiracaoRodin.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function InspiracaoRodin() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      // Reaplicando a lógica de sticky do GSAP para a coluna direita
      gsap.to(rightColumnRef.current, {
        y: () => Math.max(0, leftColumnRef.current!.offsetHeight - window.innerHeight),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      // Parallax suave na imagem e filtro
      gsap.to(imageRef.current, {
        scale: 1.05,
        filter: 'grayscale(0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }, { scope: wrapperRef });

  return (
    <div className={styles.wrapper} ref={wrapperRef} id="inspiracao">
      
      <div className={styles.pinWrapper} ref={pinWrapperRef}>
        <div className={styles.leftColumn} ref={leftColumnRef}>
          
          <div className={styles.textBlock}>
            <h2 className={styles.scrollyTitle}>INSPIRAÇÃO</h2>
            <h3 className={styles.scrollySubtitle}>FRANÇOIS-AUGUSTE-RENÉ RODIN (1840 – 1917)</h3>
            
            <div className={styles.mobileImageWrapper}>
              <img src="/auguste_rodin.png" alt="Auguste Rodin" className={styles.mobileImage} />
            </div>

            <p className={styles.scrollyParagraph}>
              Conhecido como um dos maiores escultores de todos os tempos.
              <br/><br/>
              Aprendeu a desenhar e a esculpir sozinho, ainda criança, quando brincava com massa de pão na cozinha de sua mãe. Aos 15 anos começou a frequentar uma escola de Artes.
            </p>

            <p className={styles.scrollyParagraph} style={{ marginTop: '2rem' }}>
              Como tantos outros grandes artistas, a primeira obra de Rodin, O Homem de Nariz Quebrado (1864), não foi aceita no Salão de Paris, o júri considerou sua obra um esboço, algo inacabado.
              <br/><br/>
              Rodin não desistiu e, observando fragmentos de esculturas clássicas, percebeu que uma parte de uma obra era capaz de representar seu todo e, a partir daí, toda a sua criação foi baseada no conceito no “non finito” (não acabado). Rodin considerava acabadas suas esculturas quando essas eram capazes de expressar plenamente suas ideias.
              <br/><br/>
              Seu estilo artístico conseguiu tornar visível nas esculturas a expressão da alma humana.
            </p>
          </div>

        </div>

        <div className={styles.rightColumn} ref={rightColumnRef}>
          <img 
            ref={imageRef}
            src="/auguste_rodin.png" 
            alt="Auguste Rodin" 
            className={styles.scrollyImage}
          />
        </div>
      </div>
    </div>
  );
}
