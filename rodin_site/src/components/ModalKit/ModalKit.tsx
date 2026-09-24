"use client";
import React, { useState } from 'react';
import styles from './ModalKit.module.css';

interface ModalKitProps {
  onClose: () => void;
}

export default function ModalKit({ onClose }: ModalKitProps) {
  const [submitted, setSubmitted] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send data to API
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Pega apenas os números
    let value = e.target.value.replace(/\D/g, '');
    
    // Limita a 11 números no máximo
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    
    // Formata no padrão (XX) XXXXX-XXXX
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = `(${value.substring(0, 2)})`;
      if (value.length > 7) {
        formattedValue += ` ${value.substring(2, 7)}-${value.substring(7)}`;
      } else if (value.length > 2) {
        formattedValue += ` ${value.substring(2)}`;
      }
    }
    
    setWhatsapp(formattedValue);
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
                <input 
                  type="text" 
                  inputMode="numeric" 
                  required 
                  placeholder="(19) 99999-9999" 
                  value={whatsapp} maxLength={15} 
                  onChange={handleWhatsappChange} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Série de Interesse</label>
                <select required>
                  <option value="">Selecione uma série</option>
                  <option value="fundamental2">Ensino Fundamental II (6º ao 9º ano)</option>
                  <option value="primeira_segunda_serie">Ensino Médio (1ª e 2ª série)</option>
                  <option value="terceirao">Terceirão</option>
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
