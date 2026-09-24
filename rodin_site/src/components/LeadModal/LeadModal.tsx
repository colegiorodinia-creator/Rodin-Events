import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './LeadModal.module.css';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        
        {!isSubmitted ? (
          <>
            <h2 className={styles.title}>Receba seu Kit de Matrícula</h2>
            <p className={styles.subtitle}>
              Preencha o formulário para receber o KIT DE MATRÍCULA do ano/série do seu interesse:
            </p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nome Completo</label>
                <input type="text" required placeholder="Seu nome" />
              </div>
              
              <div className={styles.formGroup}>
                <label>E-mail</label>
                <input type="email" required placeholder="seu.email@exemplo.com" />
              </div>
              
              <div className={styles.formGroup}>
                <label>Telefone / WhatsApp</label>
                <input type="tel" required placeholder="(19) 90000-0000" />
              </div>
              
              <div className={styles.formGroup}>
                <label>Ano/Série de Interesse</label>
                <select required>
                  <option value="">Selecione a série</option>
                  <option value="6-ano">6º Ano (Ens. Fundamental II)</option>
                  <option value="7-ano">7º Ano (Ens. Fundamental II)</option>
                  <option value="8-ano">8º Ano (Ens. Fundamental II)</option>
                  <option value="9-ano">9º Ano (Ens. Fundamental II)</option>
                  <option value="1-em">1º Ano (Ensino Médio)</option>
                  <option value="2-em">2º Ano (Ensino Médio)</option>
                  <option value="3-em">3º Ano (Ensino Médio)</option>
                </select>
              </div>
              
              <button type="submit" className={styles.submitBtn}>ENVIAR E RECEBER O KIT</button>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.checkIcon}>✓</div>
            <h3>Tudo Certo!</h3>
            <p>Seus dados foram enviados com sucesso.</p>
            <p>Você receberá o Kit de Matrícula no contato informado em instantes.</p>
            <button className={styles.submitBtn} onClick={onClose}>FECHAR</button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
