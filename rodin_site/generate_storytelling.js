const fs = require('fs');
const path = require('path');

const dir = 'src/components/QuemSomos';

const principles = `
const principles = [
  { icon: User, title: 'Respeito ao ser humano', desc: 'Cada pessoa é única e merece ser reconhecida em suas individualidades.' },
  { icon: Eye, title: 'Olhar individualizado', desc: 'Acreditamos em trajetórias singulares e no potencial de cada estudante.' },
  { icon: GraduationCap, title: 'Valorização do professor', desc: 'Quem ensina também aprende e transforma vidas.' },
  { icon: BookOpen, title: 'Paixão pelo conhecimento', desc: 'Aprender é mais do que acumular respostas. É criar perguntas.' },
  { icon: Lightbulb, title: 'Desenvolvimento de habilidades', desc: 'Formamos pessoas preparadas para os desafios reais da vida.' },
  { icon: Heart, title: 'Criatividade', desc: 'Novas ideias nascem quando existe liberdade para imaginar.' },
  { icon: Users, title: 'Ética e cidadania', desc: 'Agimos com responsabilidade para construir um mundo melhor.' }
];
`;

const practices = `
const practices = [
  { title: 'CRIAR', desc: 'Arte, ciência e inovação para expressar ideias e transformar.', img: '/criar_novo.jpg' },
  { title: 'SUPERAR', desc: 'O esporte nos ensina disciplina, esforço e trabalho em equipe.', img: '/superar.jpg' },
  { title: 'CONVIVER', desc: 'Relações saudáveis constroem um ambiente de respeito e colaboração.', img: '/conviver.jpg' },
  { title: 'EXPRESSAR', desc: 'Damos voz aos estudantes para que compartilhem ideias e projetos.', img: '/expressar_novo.jpg' },
  { title: 'EXPERIMENTAR', desc: 'Vivenciar o novo amplia olhares e cria memórias que ficam para sempre.', img: '/experimentar_recorte.png' },
];
`;

fs.writeFileSync(path.join(dir, 'StorytellingTimeline.tsx'), `"use client";
import React, { useRef } from 'react';
import styles from './StorytellingTimeline.module.css';
import { User, Eye, GraduationCap, Lightbulb, Rocket, Heart, Users, BookOpen, Box, PenTool } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
${principles}${practices}

export default function StorytellingTimeline() {
  const containerRef = useRef(null);
  useGSAP(() => {
    const nodes = gsap.utils.toArray('.' + styles.node);
    nodes.forEach((node) => {
      gsap.fromTo(node, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: node, start: 'top 85%' } }
      );
    });
  }, { scope: containerRef });
  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className={styles.sectionTitle}>Opção 1: Jornada Vertical</h2>
      <div className={styles.timeline}>
        <div className={styles.line}></div>
        <div className={styles.node}><div className={styles.dot}>01</div><div className={styles.content}><h3 className={styles.title}>Tudo começa com uma pessoa.</h3><p className={styles.desc}>Antes de qualquer conteúdo, existe um estudante. Com sua própria história, seus interesses, suas dúvidas e suas possibilidades. É por isso que existimos. Educar para que cada estudante descubra seu próprio potencial.</p><div className={styles.imageBox} style={{ backgroundImage: "url('/aluno_estudando.jpg')" }}></div></div></div>
        <div className={styles.node}><div className={styles.dot}>02</div><div className={styles.content}><h3 className={styles.title}>História em construção.</h3><p className={styles.desc}>No Rodin, acreditamos que educar é olhar para cada estudante em sua individualidade, despertar o prazer pelo conhecimento e criar oportunidades para desenvolver autonomia, criatividade e novas formas de enxergar o mundo.</p><div className={styles.iconsRow}><span><Eye/> DESCOBRIR</span><span><Box/> EXPERIMENTAR</span><span><BookOpen/> APRENDER</span><span><PenTool/> CRIAR</span><span><Rocket/> TRANSFORMAR</span></div></div></div>
        <div className={styles.node}><div className={styles.dot}>03</div><div className={styles.content}><h3 className={styles.title}>Os Nossos Princípios.</h3><p className={styles.desc}>O que acreditamos importa. E o que fazemos com isso importa ainda mais.</p><div className={styles.principlesGrid}>{principles.map((p, i) => (<div key={i} className={styles.principleCard}><p.icon size={24} className={styles.pIcon}/><h4>{p.title}</h4><p>{p.desc}</p></div>))}</div></div></div>
        <div className={styles.node}><div className={styles.dot}>04</div><div className={styles.content}><h3 className={styles.title}>A Prática.</h3><p className={styles.desc}>Mas acreditar não é suficiente. É preciso colocar em prática todos os dias.</p><div className={styles.practicesGrid}>{practices.map((p, i) => (<div key={i} className={styles.practiceCard} style={{ backgroundImage: \`url('\${p.img}')\` }}><div className={styles.pOverlay}><h4>{p.title}</h4><p>{p.desc}</p></div></div>))}</div></div></div>
      </div>
    </div>
  );
}`);

fs.writeFileSync(path.join(dir, 'StorytellingTimeline.module.css'), \`.container { padding: 5rem 5vw; color: var(--rodin-white); border-bottom: 2px solid rgba(255,255,255,0.1); }
.sectionTitle { text-align: center; font-size: 2rem; color: var(--rodin-orange); margin-bottom: 4rem; text-transform: uppercase; font-weight: 800;}
.timeline { position: relative; max-width: 1000px; margin: 0 auto; }
.line { position: absolute; left: 24px; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,0.2); }
.node { display: flex; gap: 3rem; margin-bottom: 6rem; position: relative; }
.dot { width: 50px; height: 50px; background: var(--rodin-orange); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; flex-shrink: 0; z-index: 2; }
.content { flex: 1; padding-top: 0.5rem; }
.title { font-size: 2.5rem; margin-bottom: 1rem; font-family: var(--font-headline); font-weight: 800; }
.desc { font-size: 1.1rem; line-height: 1.6; opacity: 0.8; margin-bottom: 2rem; }
.imageBox { width: 100%; height: 400px; background-size: cover; background-position: center; border-radius: 12px; }
.iconsRow { display: flex; flex-wrap: wrap; gap: 2rem; }
.iconsRow span { display: flex; align-items: center; gap: 0.5rem; font-weight: bold; color: var(--rodin-orange); }
.principlesGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
.principleCard { background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
.pIcon { color: var(--rodin-orange); margin-bottom: 1rem; }
.principleCard h4 { font-size: 1.1rem; margin-bottom: 0.5rem; }
.principleCard p { font-size: 0.9rem; opacity: 0.7; }
.practicesGrid { display: flex; gap: 1rem; height: 300px; }
.practiceCard { flex: 1; background-size: cover; background-position: center; border-radius: 12px; position: relative; overflow: hidden; transition: flex 0.3s; }
.practiceCard:hover { flex: 2; }
.pOverlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem; }
.pOverlay h4 { color: var(--rodin-orange); font-size: 1.2rem; }
.pOverlay p { font-size: 0.8rem; margin-top: 0.5rem; }
@media(max-width: 768px) { .practicesGrid { flex-direction: column; height: auto; } .practiceCard { height: 200px; } .line { left: 20px; } .dot { width: 40px; height: 40px; font-size: 1rem; } .node { gap: 1.5rem; } }\`);

fs.writeFileSync(path.join(dir, 'StorytellingBento.tsx'), \`"use client";
import React from 'react';
import styles from './StorytellingBento.module.css';
import { User, Eye, GraduationCap, Lightbulb, Rocket, Heart, Users, BookOpen, Box, PenTool } from 'lucide-react';
${principles}${practices}
export default function StorytellingBento() {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Opção 2: Grid Bento</h2>
      <div className={styles.bentoGrid}>
        <div className={\`\${styles.card} \${styles.cardLarge}\`} style={{backgroundImage: "url('/aluno_estudando.jpg')"}}>
          <div className={styles.overlay}><span className={styles.step}>01</span><h3>Tudo começa com uma pessoa.</h3><p>Antes de qualquer conteúdo, existe um estudante. Com sua própria história, seus interesses, suas dúvidas.</p></div>
        </div>
        <div className={\`\${styles.card} \${styles.cardDark}\`}>
          <span className={styles.step}>02</span><h3>História em construção.</h3><p>Educar é olhar para cada estudante em sua individualidade e despertar o prazer pelo conhecimento.</p>
          <div className={styles.iconsRow}><Eye/><Box/><BookOpen/><PenTool/><Rocket/></div>
        </div>
        <div className={\`\${styles.card} \${styles.cardLight}\`}>
           <span className={styles.step}>03</span><h3>Os Princípios</h3>
           <div className={styles.miniGrid}>{principles.slice(0,4).map((p, i) => (<div key={i} className={styles.miniItem}><p.icon size={20} color="var(--rodin-orange)"/><strong>{p.title}</strong></div>))}</div>
        </div>
        <div className={\`\${styles.card} \${styles.cardWide}\`}>
          <div className={styles.practicesGrid}>
            <div className={styles.pText}><span className={styles.step}>04</span><h3>A Prática</h3><p>É preciso colocar em prática todos os dias.</p></div>
            <div className={styles.pImages}>{practices.slice(0,3).map((p, i) => (<div key={i} className={styles.pImage} style={{backgroundImage: \`url('\${p.img}')\`}}><span>{p.title}</span></div>))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}\`);

fs.writeFileSync(path.join(dir, 'StorytellingBento.module.css'), \`.container { padding: 5rem 5vw; color: var(--rodin-white); border-bottom: 2px solid rgba(255,255,255,0.1); }
.sectionTitle { text-align: center; font-size: 2rem; color: var(--rodin-orange); margin-bottom: 4rem; text-transform: uppercase; font-weight: 800;}
.bentoGrid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 300px; gap: 1.5rem; max-width: 1200px; margin: 0 auto; }
.card { border-radius: 20px; overflow: hidden; position: relative; background-size: cover; background-position: center; padding: 2rem; display: flex; flex-direction: column; justify-content: flex-end; }
.cardLarge { grid-column: span 2; grid-row: span 2; }
.cardDark { grid-column: span 2; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); justify-content: center; }
.cardLight { grid-column: span 2; background: var(--rodin-white); color: var(--rodin-black); justify-content: center; }
.cardWide { grid-column: span 4; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); justify-content: center; }
.overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); padding: 2rem; display: flex; flex-direction: column; justify-content: flex-end; }
.step { color: var(--rodin-orange); font-weight: bold; font-size: 1.2rem; margin-bottom: 0.5rem; font-family: monospace;}
.card h3 { font-size: 2rem; font-family: var(--font-headline); margin-bottom: 0.5rem; position: relative; z-index: 2;}
.card p { opacity: 0.8; line-height: 1.5; position: relative; z-index: 2;}
.iconsRow { display: flex; gap: 1rem; color: var(--rodin-orange); margin-top: 1.5rem; }
.miniGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;}
.miniItem { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;}
.practicesGrid { display: flex; align-items: center; gap: 2rem; width: 100%; height: 100%; }
.pText { flex: 1; }
.pImages { flex: 2; display: flex; gap: 1rem; height: 100%; }
.pImage { flex: 1; background-size: cover; background-position: center; border-radius: 12px; position: relative; display: flex; align-items: flex-end; padding: 1rem;}
.pImage span { background: var(--rodin-orange); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
@media(max-width: 1024px) { .bentoGrid { grid-template-columns: 1fr 1fr; } .cardWide { grid-column: span 2; } .practicesGrid { flex-direction: column; } .pImages { width: 100%; } }
@media(max-width: 600px) { .bentoGrid { grid-template-columns: 1fr; } .cardLarge, .cardDark, .cardLight, .cardWide { grid-column: span 1; } .pImages { flex-direction: column; } }\`);

fs.writeFileSync(path.join(dir, 'StorytellingTabs.tsx'), \`"use client";
import React, { useState } from 'react';
import styles from './StorytellingTabs.module.css';
import { User, Eye, GraduationCap, Lightbulb, Rocket, Heart, Users, BookOpen, Box, PenTool } from 'lucide-react';
${principles}${practices}
export default function StorytellingTabs() {
  const [active, setActive] = useState(0);
  const tabs = ["01. A Pessoa", "02. A Construção", "03. Princípios", "04. Prática"];
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Opção 3: Abas Interativas</h2>
      <div className={styles.tabsLayout}>
        <div className={styles.tabList}>
          {tabs.map((t, i) => (
            <button key={i} className={\`\${styles.tabBtn} \${active === i ? styles.active : ''}\`} onClick={() => setActive(i)}>{t}</button>
          ))}
        </div>
        <div className={styles.tabContent}>
          {active === 0 && (
            <div className={styles.panel}><h3>Tudo começa com uma pessoa.</h3><p>Antes de qualquer conteúdo, existe um estudante. Com sua própria história, seus interesses, suas dúvidas e suas possibilidades.</p><img src="/aluno_estudando.jpg" alt="Aluno"/></div>
          )}
          {active === 1 && (
            <div className={styles.panel}><h3>História em construção.</h3><p>Educar é olhar para cada estudante em sua individualidade, despertar o prazer pelo conhecimento e criar oportunidades.</p><img src="/aluno_sorrindo.jpg" alt="Aluno"/></div>
          )}
          {active === 2 && (
            <div className={styles.panel}><h3>Nossos Princípios.</h3><div className={styles.grid}>{principles.map((p,i)=><div key={i} className={styles.box}><h4>{p.title}</h4><p>{p.desc}</p></div>)}</div></div>
          )}
          {active === 3 && (
            <div className={styles.panel}><h3>Na Prática.</h3><div className={styles.grid}>{practices.map((p,i)=><div key={i} className={styles.boxImg} style={{backgroundImage: \`url('\${p.img}')\`}}><span>{p.title}</span></div>)}</div></div>
          )}
        </div>
      </div>
    </div>
  );
}\`);

fs.writeFileSync(path.join(dir, 'StorytellingTabs.module.css'), \`.container { padding: 5rem 5vw; color: var(--rodin-white); border-bottom: 2px solid rgba(255,255,255,0.1); }
.sectionTitle { text-align: center; font-size: 2rem; color: var(--rodin-orange); margin-bottom: 4rem; text-transform: uppercase; font-weight: 800;}
.tabsLayout { display: flex; gap: 4rem; max-width: 1000px; margin: 0 auto; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 3rem; }
.tabList { display: flex; flex-direction: column; gap: 1rem; width: 250px; flex-shrink: 0; }
.tabBtn { text-align: left; padding: 1rem; background: transparent; color: var(--rodin-white); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; font-size: 1.1rem; opacity: 0.6; transition: all 0.3s; cursor: pointer; }
.tabBtn:hover { opacity: 1; border-color: rgba(255,255,255,0.3); }
.tabBtn.active { opacity: 1; background: var(--rodin-orange); border-color: var(--rodin-orange); font-weight: bold; }
.tabContent { flex: 1; }
.panel { animation: fadeIn 0.5s ease; }
.panel h3 { font-size: 2.5rem; font-family: var(--font-headline); margin-bottom: 1rem; }
.panel p { font-size: 1.1rem; line-height: 1.6; opacity: 0.8; margin-bottom: 2rem;}
.panel img { width: 100%; height: 350px; object-fit: cover; border-radius: 12px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.box { background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px; }
.box h4 { color: var(--rodin-orange); margin-bottom: 0.5rem; }
.box p { font-size: 0.9rem; margin-bottom: 0; }
.boxImg { height: 150px; background-size: cover; background-position: center; border-radius: 8px; display: flex; align-items: flex-end; padding: 1rem; }
.boxImg span { background: rgba(0,0,0,0.8); padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.9rem;}
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@media(max-width: 768px) { .tabsLayout { flex-direction: column; gap: 2rem; padding: 1.5rem; } .tabList { width: 100%; flex-direction: row; flex-wrap: wrap; } .tabBtn { flex: 1; min-width: 120px; text-align: center; } .grid { grid-template-columns: 1fr; } }\`);
