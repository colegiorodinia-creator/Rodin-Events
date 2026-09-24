'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { teamData } from '@/data/teamData';
import styles from './page.module.css';

export default function EquipePage() {
  const sortedTeam = [...teamData].sort((a, b) => a.name.localeCompare(b.name));
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#e55b13', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Navbar />
      
      <div className={styles.leftDecorator}></div>
      <div className={styles.rightDecorator}></div>
      <main className={styles.pageContainer}>
        <h1 className={styles.title} style={{ marginBottom: '2rem' }}>CORPO DOCENTE</h1>
        
        <p style={{ textAlign: 'center', color: '#fff', marginBottom: '2rem', marginTop: '-1rem', opacity: 0.8 }}>
          Clique em um professor para ver a formação completa.
        </p>

        <div className={styles.grid}>
          {sortedTeam.map((member, i) => (
            <div 
              className={`${styles.card} ${expandedCard === i ? styles.expanded : ''}`} 
              key={i}
              onClick={() => setExpandedCard(expandedCard === i ? null : i)}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={`${member.imgUrl}?v=8`} 
                  alt={member.name} 
                  className={styles.cardImage} 
                  style={{ 
                    objectPosition: member.imagePosition || 'center',
                    transformOrigin: member.imagePosition || 'center' 
                  }} 
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.name}>{member.name}</h3>
                {member.role && 
                 !member.role.toLowerCase().includes('professor') && 
                 !member.role.toLowerCase().includes('orientador') && 
                 <p className={styles.role}>{member.role}</p>}
                <p className={styles.formation}>{member.formation}</p>
                {expandedCard !== i && <div className={styles.clickHint}>Ver mais</div>}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}