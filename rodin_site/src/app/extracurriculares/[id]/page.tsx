import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { extracurricularesData } from '@/data/extracurricularesData';
import styles from './Activity.module.css';

export default async function ActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const activity = extracurricularesData.find(item => item.id === resolvedParams.id);

  if (!activity) {
    notFound();
  }

  return (
    <main>
      <Navbar theme="light" backUrl="/extracurriculares" />
      <section className={styles.videoSection}>
        <div className={styles.videoContainer}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <p className={styles.videoSubtitle}>CONHEÇA A MODALIDADE</p>
            <h2 className={styles.videoTitle} style={{ marginBottom: 0 }}>{activity.title}</h2>
          </div>
          <div className={styles.iframeWrapper}>
            {(activity as any).localVideo ? (
              <video 
                src={(activity as any).localVideo} 
                controls 
                autoPlay={false}
                poster={activity.image}
                className={styles.iframe} 
                title={`Vídeo sobre ${activity.title}`}
                style={{ objectFit: 'cover' }}
              />
            ) : activity.youtubeId ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activity.youtubeId}?autoplay=0&rel=0`}
                title={`Vídeo sobre ${activity.title}`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className={styles.iframe}
              ></iframe>
            ) : (
              <div className={styles.videoPlaceholder}>
                <p>Vídeo em breve</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>{activity.title}</h1>
            <p className={styles.desc}>{activity.desc || (activity as any).longDesc}</p>
          </div>
          <div className={styles.imageContent}>
            <img 
              src={activity.image} 
              alt={activity.title} 
              className={styles.image} 
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}