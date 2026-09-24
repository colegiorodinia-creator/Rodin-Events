'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import InspiracaoRodin from '@/components/Diferenciais/InspiracaoRodin';
import ListaDiferenciais from '@/components/Diferenciais/ListaDiferenciais';

export default function QuemSomosPage() {
  useEffect(() => {
    // Garante que o GSAP recalcule todas as âncoras (start/end)
    // DEPOIS que todos os componentes da página tiverem sido montados
    // e os pin-spacers criados, evitando triggers no lugar errado.
    gsap.registerPlugin(ScrollTrigger);
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main>
      <Navbar theme="dark" />
      <InspiracaoRodin />
      <ListaDiferenciais />
      <Footer />
    </main>
  );
}
