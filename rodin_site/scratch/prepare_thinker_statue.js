const fs = require('fs');

// 1. UPDATE CSS
const cssPath = 'src/components/Team/Team.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('.thinkerStatue')) {
  cssContent = cssContent.replace(
    /\.teamSection \{/,
    `.teamSection {
  position: relative;
  overflow: hidden; /* Evitar que o pensador passe da seção */`
  );

  cssContent += `

.thinkerStatue {
  position: absolute;
  right: -2vw;
  bottom: -2vh;
  height: 90%;
  z-index: 0;
  pointer-events: none;
}

.thinkerStatue img {
  height: 100%;
  width: auto;
  object-fit: contain;
  opacity: 0.9;
}

@media (max-width: 1024px) {
  .thinkerStatue {
    height: 50%;
    right: -10vw;
    opacity: 0.4;
  }
}
`;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
}

// 2. UPDATE TSX
const tsxPath = 'src/components/Team/Team.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

if (!tsxContent.includes('thinkerStatue')) {
  tsxContent = tsxContent.replace(
    /<h2 className=\{styles\.sectionTitle\}>EQUIPE<\/h2>/,
    `<h2 className={styles.sectionTitle}>EQUIPE</h2>
      
      {/* Estátua do Pensador posicionada na direita */}
      <div className={styles.thinkerStatue}>
        <img src="/pensador_recortado.png" alt="O Pensador" />
      </div>`
  );
  
  // Aumentar o z-index do carousel para ficar em cima da estátua se precisarem se cruzar
  cssContent = fs.readFileSync(cssPath, 'utf8');
  cssContent = cssContent.replace(
    /\.carouselContainer \{/,
    `.carouselContainer {
  position: relative;
  z-index: 1;`
  );
  fs.writeFileSync(cssPath, cssContent, 'utf8');

  fs.writeFileSync(tsxPath, tsxContent, 'utf8');
}

console.log('Successfully prepared Team section for the transparent thinker image!');
