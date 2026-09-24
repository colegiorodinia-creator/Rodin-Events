"use client";
import React, { useState } from 'react';
import styles from './Matriculas.module.css';

export default function MatriculasPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className={styles.main}>
      <div className={styles.splitLayout}>
        <div className={styles.leftContainer}>
          <div className={styles.leftImage}>
            {/* Botão de Voltar */}
            <button onClick={() => window.history.back()} className={styles.backButton} title="Voltar">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
                <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
              </svg>
            </button>

            <div className={styles.imageText}>
              <h1 className={styles.imageTitle}>VEM SER<br/>RODIN.</h1>
              <p className={styles.imageSubtitle}>
                Dê o primeiro passo para um ensino de excelência. Agende uma visita e encante-se com nossa estrutura.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.rightForm}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Fale conosco</h2>
            <p className={styles.formSubtitle}>
              Preencha o formulário abaixo ou nos chame diretamente no WhatsApp.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              
              <div className={styles.formGroup}>
                <input type="text" id="nome" name="nome" className={styles.input} required placeholder=" " />
                <label className={styles.floatingLabel} htmlFor="nome">Nome Completo</label>
              </div>

              <div className={styles.formGroup}>
                <input type="email" id="email" name="email" className={styles.input} required placeholder=" " />
                <label className={styles.floatingLabel} htmlFor="email">E-mail</label>
              </div>

              <div className={styles.formGroup}>
                <input type="tel" id="celular" name="celular" className={styles.input} required placeholder=" " value={whatsapp} onChange={handleWhatsappChange} maxLength={15} />
                <label className={styles.floatingLabel} htmlFor="celular">Celular / WhatsApp</label>
              </div>

              <div className={styles.formGroup}>
                <select id="assunto" name="assunto" className={styles.select} required defaultValue="">
                  <option value="" disabled hidden></option>
                  <option value="fornecedores">Fornecedores</option>
                  <option value="matriculas">Matrículas</option>
                  <option value="pedagogico">Pedagógico</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="outros">Outros</option>
                </select>
                <label className={styles.floatingLabel} htmlFor="assunto">Assunto</label>
              </div>

              <div className={styles.formGroup}>
                <textarea id="mensagem" name="mensagem" className={styles.textarea} required placeholder=" "></textarea>
                <label className={styles.floatingLabel} htmlFor="mensagem">Sua Mensagem</label>
              </div>

              <button type="submit" className={styles.submitButton}>
                Enviar Mensagem
              </button>
            </form>
          ) : (
            <div className={styles.successMessage}>
              <h3>Mensagem Enviada!</h3>
              <p>Recebemos seu contato com sucesso. Nossa equipe retornará o mais breve possível.</p>
            </div>
          )}
          
          <div className={styles.whatsappBlock}>
            <p className={styles.whatsappText}>Resposta imediata:</p>
            <a href="https://wa.me/551939369999" target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
