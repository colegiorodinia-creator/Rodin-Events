"use client";
import React, { useRef } from 'react';
import styles from './StorytellingTimeline.module.css';
import { User, Eye, GraduationCap, Lightbulb, Rocket, Heart, Users, BookOpen, Box, PenTool } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { icon: User, title: 'Respeito ao ser humano', desc: 'Cada pessoa é única e merece ser reconhecida em suas individualidades.' },
  { icon: Eye, title: 'Olhar individualizado', desc: 'Acreditamos em trajetórias singulares e no potencial de cada estudante.' },
  { icon: GraduationCap, title: 'Valorização do professor', desc: 'Quem ensina também aprende e transforma vidas.' },
  { icon: BookOpen, title: 'Paixão pelo conhecimento', desc: 'Aprender é mais do que acumular respostas. É criar perguntas.' },
  { icon: Lightbulb, title: 'Desenvolvimento de habilidades', desc: 'Formamos pessoas preparadas para os desafios reais da vida.' },
  { icon: Heart, title: 'Criatividade', desc: 'Novas ideias nascem quando existe liberdade para imaginar.' },
  { icon: Users, title: 'Ética e cidadania', desc: 'Agimos com responsabilidade para construir um mundo melhor.' }
];
const practices = [
  { title: 'ACOLHER', desc: 'Um ambiente seguro e afetivo onde cada estudante se sente valorizado e respeitado em sua individualidade.', img: '/conviver.jpg' },
  { title: 'INSPIRAR', desc: 'Despertamos a curiosidade e a paixão pelo conhecimento, motivando nossos estudantes a irem além.', img: '/criar_novo.jpg' },
  { title: 'CONSTRUIR', desc: 'Juntos, formamos bases sólidas para o futuro, desenvolvendo habilidades práticas para a vida toda.', img: '/experimentar_recorte.png' },
];

export default function StorytellingTimeline() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const nodes = gsap.utils.toArray('.' + styles.node);
    nodes.forEach((node: any) => {
      gsap.fromTo(node, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: node, start: 'top 85%' } }
      );
    });
  }, { scope: containerRef });

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className={styles.sectionTitle}>A Essência Rodin</h2>
      <div className={styles.timeline}>
        <div className={styles.line}></div>
        
        <div className={styles.node}>
          <div className={styles.dot}>01</div>
          <div className={styles.content}>
            <h3 className={styles.title}>Tudo começa com uma pessoa.</h3>
            <p className={styles.desc}>Antes de qualquer conteúdo, existe um estudante. Com sua própria história, seus interesses, suas dúvidas e suas possibilidades. É por isso que existimos. Educar para que cada estudante descubra seu próprio potencial.</p>
            <div className={styles.imageBoxSquare} style={{ backgroundImage: "url('/aluno_estudando.jpg')", backgroundPosition: "center bottom" }}></div>
          </div>
        </div>

        <div className={styles.node}>
          <div className={styles.dot}>02</div>
          <div className={styles.content}>
            <h3 className={styles.title}>História em construção.</h3>
            <p className={styles.desc}>No Rodin, acreditamos que educar é olhar para cada estudante em sua individualidade, despertar o prazer pelo conhecimento e criar oportunidades para desenvolver autonomia, criatividade e novas formas de enxergar o mundo.</p>
            <div className={styles.iconsRow}>
               <span><Eye/> DESCOBRIR</span>
               <span><Box/> EXPERIMENTAR</span>
               <span><BookOpen/> APRENDER</span>
               <span><PenTool/> CRIAR</span>
               <span><Rocket/> TRANSFORMAR</span>
            </div>
          </div>
        </div>

        <div className={styles.node}>
          <div className={styles.dot}>03</div>
          <div className={styles.content}>
            <h3 className={styles.title}>Os Nossos Princípios.</h3>
            <p className={styles.desc}>O que acreditamos importa. E o que fazemos com isso importa ainda mais.</p>
            <div className={styles.principlesGrid}>
              {principles.map((p, i) => (
                <div key={i} className={styles.principleCard}>
                  <p.icon size={24} className={styles.pIcon}/>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.node}>
          <div className={styles.dot}>04</div>
          <div className={styles.content}>
            <h3 className={styles.title}>A Prática.</h3>
            <p className={styles.desc}>Mas acreditar não é suficiente. É preciso colocar em prática todos os dias.</p>
            <div className={styles.practicesGrid}>
              {practices.map((p, i) => (
                <div key={i} className={styles.practiceCard} style={{ backgroundImage: `url('${p.img}')` }}>
                  <div className={styles.pOverlay}>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.node}>
          <div className={styles.dot}>05</div>
          <div className={styles.content}>
            <h3 className={styles.title}>O mundo precisa de pessoas que fazem a diferença.</h3>
            <p className={styles.desc}>Queremos construir essa história com você. Venha fazer parte do Colégio Rodin.</p>
            <div style={{ marginTop: '1rem' }}>
              <a href="/matriculas" className={styles.ctaButton}>Agendar Visita</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
