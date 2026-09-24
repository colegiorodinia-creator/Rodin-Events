import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './Bilingue.module.css';

export default function BilinguePage() {
  return (
    <main className={styles.main}>
      <Navbar backUrl="/" />
      
      <section className={styles.hero}>
        <div 
          className={styles.heroBg} 
          style={{ backgroundImage: "url('/extracurriculares/thumb/thumb_video3.jpg')" }}
        ></div>
        <div className={styles.heroOverlayDark}></div>
        
        <div className={styles.videoPlaceholderBadge}>
          <p>Vídeo em breve</p>
        </div>
        
        <div className={styles.textOverlay}>
          <div className={styles.textOverlayTop}>
            <h2 className={styles.textOverlayName}>PROGRAMA BILÍNGUE</h2>
            <p className={styles.textOverlayRole}>Colégio Rodin</p>
            <div className={styles.textOverlayDivider}></div>
          </div>
          <div className={styles.textOverlayBottom}>
            <p className={styles.textOverlayQuote}>
              "Muito além do básico. O idioma utilizado como meio de aquisição de conhecimento, integrando o currículo escolar para formar cidadãos globais."
            </p>
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoText}>
            <h2 className={styles.sectionTitle}>Fluência que Transforma</h2>
            <p className={styles.desc}>
              No Colégio Rodin, o ensino da língua inglesa transcende a gramática tradicional. Durante as <strong>cinco aulas semanais</strong>, o idioma se torna o veículo pelo qual nossos alunos exploram o mundo.
            </p>
            <p className={styles.desc}>
              Através de metodologias ativas e foco na oralidade, desenvolvemos projetos interdisciplinares que conectam o inglês à ciência, tecnologia e humanidades. O resultado é um aprendizado orgânico, no qual os alunos não apenas falam um novo idioma, mas também <strong>pensam</strong> de forma bilíngue.
            </p>
          </div>
          <div className={styles.infoImageWrapper}>
            <img 
              src="/extracurriculares/thumb/thumb_video3.jpg" 
              alt="Alunos no Programa Bilíngue" 
              className={styles.infoImage} 
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}