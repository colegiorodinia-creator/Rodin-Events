const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ModalKit');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// 1. ModalKit.tsx
const tsxContent = `"use client";
import React, { useState } from 'react';
import styles from './ModalKit.module.css';

interface ModalKitProps {
  onClose: () => void;
}

export default function ModalKit({ onClose }: ModalKitProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send data to API
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        {!submitted ? (
          <>
            <h2 className={styles.title}>Kit de Matrícula</h2>
            <p className={styles.subtitle}>Preencha seus dados para receber nosso kit exclusivo e começar sua jornada no Colégio Rodin.</p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nome do Responsável</label>
                <input type="text" required placeholder="Digite seu nome completo" />
              </div>
              <div className={styles.formGroup}>
                <label>E-mail</label>
                <input type="email" required placeholder="seu@email.com" />
              </div>
              <div className={styles.formGroup}>
                <label>WhatsApp</label>
                <input type="tel" required placeholder="(00) 00000-0000" />
              </div>
              <div className={styles.formGroup}>
                <label>Série de Interesse</label>
                <select required>
                  <option value="">Selecione uma série</option>
                  <option value="infantil">Educação Infantil</option>
                  <option value="fundamental1">Ensino Fundamental I</option>
                  <option value="fundamental2">Ensino Fundamental II</option>
                  <option value="medio">Ensino Médio</option>
                </select>
              </div>
              <button type="submit" className={styles.submitBtn}>RECEBER MEU KIT</button>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.checkIcon}>&#10003;</div>
            <h2>Tudo certo!</h2>
            <p>Seus dados foram enviados. Em breve entraremos em contato com o seu Kit de Matrícula.</p>
          </div>
        )}
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(dir, 'ModalKit.tsx'), tsxContent);

// 2. ModalKit.module.css
const cssContent = `.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background-color: var(--rodin-white);
  border-radius: 12px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.closeBtn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 28px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.2s ease;
}

.closeBtn:hover {
  color: var(--rodin-orange);
}

.title {
  font-family: var(--font-headline);
  font-size: 2rem;
  color: var(--rodin-emerald);
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.formGroup label {
  font-family: var(--font-headline);
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
}

.formGroup input, .formGroup select {
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 1rem;
  background-color: #f9f9f9;
  transition: border-color 0.2s ease;
}

.formGroup input:focus, .formGroup select:focus {
  outline: none;
  border-color: var(--rodin-orange);
}

.submitBtn {
  margin-top: 10px;
  background-color: var(--rodin-orange);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 30px;
  font-family: var(--font-headline);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submitBtn:hover {
  background-color: #d95e00;
  transform: translateY(-2px);
}

.successMessage {
  text-align: center;
  padding: 30px 0;
}

.checkIcon {
  font-size: 60px;
  color: var(--rodin-orange);
  margin-bottom: 20px;
}

.successMessage h2 {
  font-family: var(--font-headline);
  color: var(--rodin-emerald);
  margin-bottom: 15px;
}

.successMessage p {
  color: #666;
  font-family: var(--font-body);
  line-height: 1.5;
}
`;
fs.writeFileSync(path.join(dir, 'ModalKit.module.css'), cssContent);

// 3. Update Hero.tsx
const heroPath = path.join(__dirname, 'src', 'components', 'Hero', 'Hero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');

if (!heroContent.includes('import ModalKit')) {
  heroContent = heroContent.replace(/import Link from 'next\/link';/, "import Link from 'next/link';\nimport ModalKit from '../ModalKit/ModalKit';");
}

if (!heroContent.includes('isModalOpen')) {
  heroContent = heroContent.replace(/const heroRef = useRef\(null\);/, "const heroRef = useRef(null);\n  const [isModalOpen, setIsModalOpen] = useState(false);");
}

// Replace the Link with a button that triggers modal
heroContent = heroContent.replace(
  /<Link href="\/matriculas" className=\{styles\.cta\}(.*?)>([\s\S]*?)<\/Link>/,
  '<button onClick={() => setIsModalOpen(true)} className={styles.cta} $1>$2</button>'
);

// Add ModalKit just before </section>
if (!heroContent.includes('<ModalKit')) {
  heroContent = heroContent.replace(
    /<\/section>/,
    '</section>\n      {isModalOpen && <ModalKit onClose={() => setIsModalOpen(false)} />}'
  );
}

fs.writeFileSync(heroPath, heroContent);
console.log('Hero.tsx updated with ModalKit');
