"use client";
import React from 'react';
import styles from './MissaoVisaoValores.module.css';
import { User, Eye, GraduationCap, Lightbulb, Rocket, Heart, Users, ArrowRight } from 'lucide-react';

const principles = [
  {
    icon: User,
    title: "Respeito ao ser humano",
    desc: "Cada pessoa é única e merece ser reconhecida em sua individualidade."
  },
  {
    icon: Eye,
    title: "Olhar individualizado — respeito às diferenças",
    desc: "Acreditamos no potencial de cada estudante e valorizamos sua trajetória."
  },
  {
    icon: GraduationCap,
    title: "Valorização do professor",
    desc: "Quem ensina inspira, acolhe e transforma. Professor é essencial."
  },
  {
    icon: Lightbulb,
    title: "Desenvolver o prazer pelo estudo",
    desc: "Aprender é muito mais que estudar. É se conectar com o mundo."
  },
  {
    icon: Heart,
    title: "Paixão pelo conhecimento",
    desc: "Estimulamos novas ideias e incentivamos soluções inovadoras."
  },
  {
    icon: Rocket,
    title: "Desenvolvimento de habilidades e competências humanas",
    desc: "Formamos estudantes autônomos, criativos e preparados para escolher caminhos."
  },
  {
    icon: Users,
    title: "Criatividade",
    desc: "Agimos com integridade e pensamos fora da caixa para construir o futuro."
  }
];

const practices = [
  {
    title: "Arte e Cultura",
    imgUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&fit=crop"
  },
  {
    title: "Ciência e Tecnologia",
    imgUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&fit=crop"
  },
  {
    title: "Esporte e Bem-estar",
    imgUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&fit=crop"
  },
  {
    title: "Projetos de Vida",
    imgUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&fit=crop"
  }
];

export default function MissaoVisaoValores() {
  return (
    <section className={styles.container}>
      
      {/* SEÇÃO 1: NOSSA VISÃO DE EDUCAÇÃO */}
      <div className={styles.visionSection}>
        <div className={styles.visionText}>
          
          <span className={styles.orangeSubtitle}>Nossa Visão de Educação</span>
          <h2 className={styles.mainTitle}>Educação que vai além do conteúdo.</h2>
          <p className={styles.paragraph}>
            No Rodin, acreditamos que educar é olhar para cada estudante em sua individualidade, despertar o prazer pelo conhecimento e criar oportunidades para que ele desenvolva suas habilidades, sua autonomia e sua forma própria de enxergar o mundo.
          </p>

        </div>
        <div className={styles.visionImageWrapper}>
          <div className={styles.visionImage} style={{ backgroundImage: `url('/pensador_aluno.jpg')` }}></div>
        </div>
      </div>

      {/* SEÇÃO 2: PRINCÍPIOS */}
      <div className={styles.principlesSection}>
        <div className={styles.principlesHeader}>
          <span className={styles.orangeSubtitle}>No que acreditamos</span>
          <h2 className={styles.secondaryTitle}>Nossos princípios nos guiam todos os dias.</h2>
        </div>
        <div className={styles.principlesGrid}>
          {principles.map((item, i) => (
            <div key={i} className={styles.principleCard}>
              <div className={styles.iconWrapper}>
                <item.icon size={36} strokeWidth={1.5} color="var(--rodin-orange)" />
              </div>
              <h3 className={styles.principleTitle}>{item.title}</h3>
              <p className={styles.principleDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÃO 3: NA PRÁTICA */}
      <div className={styles.practiceSection}>
        <div className={styles.practiceText}>
          <span className={styles.orangeSubtitle}>Na Prática</span>
          <h2 className={styles.mainTitle}>Princípios que se transformam em experiências que marcam.</h2>
          <p className={styles.paragraph}>
            Projetos, atividades e relações que colocam nossos valores em ação, dentro e fora da sala de aula.
          </p>
          <button className={styles.outlineButton}>
            Conheça nossas experiências <ArrowRight size={20} />
          </button>
        </div>
        <div className={styles.practiceImages}>
          {practices.map((item, i) => (
            <div key={i} className={styles.practiceCard} style={{ backgroundImage: `url('${item.imgUrl}')` }}>
              <div className={styles.practiceOverlay}>
                <span className={styles.practiceTitle}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
