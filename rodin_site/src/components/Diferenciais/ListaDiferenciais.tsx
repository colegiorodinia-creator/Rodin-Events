import React from 'react';
import styles from './ListaDiferenciais.module.css';

const diferenciais = [
  {
    id: 1,
    title: "Corpo Docente",
    desc: "Nossa equipe é constituída por profissionais com ampla experiência acadêmica, além de ser reconhecida por pais e alunos como fortemente comprometida com a instituição e as necessidades de cada aluno."
  },
  {
    id: 2,
    title: "Ensino Inovador e Desafiador",
    desc: "Em nosso olhar, o processo de educar é mais do que transmitir informações, é estimular a criatividade, desenvolver habilidades e competências e, acima de tudo, cultivar valores."
  },
  {
    id: 3,
    title: "Comunicação Direta",
    desc: "O acesso, em tempo integral, à Coordenação Pedagógica, ao Serviço de Orientação Educacional (SOE) e à Direção-Geral, resulta em um tratamento personalizado, acolhedor e comprometido com as necessidades de cada aluno."
  },
  {
    id: 4,
    title: "Grade Curricular Diferenciada",
    desc: "Disciplinas exclusivas do Colégio Rodin enriquecem a grade curricular, proporcionando aos alunos experiências e desafios que contribuem para o máximo aproveitamento de suas potencialidades."
  },
  {
    id: 5,
    title: "Tecnologias Educacionais de Ponta",
    desc: "Todas as salas de aulas são equipadas com lousas digitais, permitindo que o corpo docente elabore aulas diferenciadas e motivadoras. Além disso, o colégio oferece livros digitais e plantões de dúvida on-line."
  }
];

export default function ListaDiferenciais() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Lado esquerdo fixo */}
        <div className={styles.stickyColumn}>
          <h2 className={styles.sectionTitle}>Por que o Colégio Rodin?</h2>
          <p className={styles.sectionSubtitle}>Nossa essência refletida em diferenciais que preparam para o futuro.</p>
        </div>
        
        {/* Lado direito rolável */}
        <div className={styles.listColumn}>
          {diferenciais.map((item) => (
            <div className={styles.listItem} key={item.id}>
              <div className={styles.itemHeader}>
                <span className={styles.itemNumber}>0{item.id}</span>
                <h3 className={styles.title}>{item.title}</h3>
              </div>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
