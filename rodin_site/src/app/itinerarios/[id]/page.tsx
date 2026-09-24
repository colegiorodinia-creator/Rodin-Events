import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { itinerariosData } from '@/data/itinerariosData';
import styles from './Itinerario.module.css';

export default async function ItinerarioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const itinerario = itinerariosData.find(item => item.id === resolvedParams.id);

  if (!itinerario) {
    notFound();
  }

  return (
    <main>
      <Navbar theme="light" backUrl="/itinerarios" />
      <section className={styles.videoSection}>
        <div className={styles.videoContainer}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <p className={styles.videoSubtitle}>CONHEÇA O ITINERÁRIO</p>
            <h2 className={styles.videoTitle} style={{ marginBottom: 0 }}>{itinerario.title}</h2>
          </div>
          <div className={styles.iframeWrapper}>
            {itinerario.videoUrl ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${itinerario.videoUrl}?autoplay=0&rel=0`}
                title={`Vídeo sobre ${itinerario.title}`} 
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
            <h1 className={styles.title}>{itinerario.title}</h1>
            <p className={styles.desc}>{itinerario.longDesc}</p>
          </div>
          <div className={styles.imageContent}>
            <img 
              src={itinerario.image} 
              alt={itinerario.title} 
              className={styles.image} 
              style={{ objectPosition: itinerario.id === 'geopolitica' ? '20% center' : 'center' }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}