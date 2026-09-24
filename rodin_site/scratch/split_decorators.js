const fs = require('fs');

// 1. UPDATE CSS
const cssPath = 'src/app/equipe/page.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /\/\* Elementos decorativos nas laterais \*\/[\s\S]*?(?=\.backButton \{)/,
  `/* Elementos decorativos nas laterais */
.leftDecorator {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 50vw;
  height: 85vh;
  background-image: url('/pensador_aluno_cut.png');
  background-size: auto 100%;
  background-position: left bottom;
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.5; /* Transparência agradável para não ofuscar o texto */
  pointer-events: none;
}

.rightDecorator {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 50vw;
  height: 85vh;
  background-image: url('/pensador_aluno_cut.png');
  background-size: auto 100%;
  background-position: right bottom;
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.5;
  pointer-events: none;
}

@media (max-width: 1400px) {
  .leftDecorator { left: -5vw; }
  .rightDecorator { right: -5vw; }
}
@media (max-width: 1200px) {
  .leftDecorator, .rightDecorator {
    opacity: 0.3;
  }
}
@media (max-width: 768px) {
  .leftDecorator, .rightDecorator {
    display: none;
  }
}

`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

// 2. UPDATE TSX
const tsxPath = 'src/app/equipe/page.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// If they aren't in the TSX yet, add them right before <main>
if (!tsxContent.includes('leftDecorator')) {
  tsxContent = tsxContent.replace(
    /<main className=\{styles\.pageContainer\}>/,
    `<div className={styles.leftDecorator}></div>
      <div className={styles.rightDecorator}></div>
      <main className={styles.pageContainer}>`
  );
  fs.writeFileSync(tsxPath, tsxContent, 'utf8');
} else {
  // If leftDecorator is there but not rightDecorator
  if (!tsxContent.includes('rightDecorator')) {
    tsxContent = tsxContent.replace(
      /<div className=\{styles\.leftDecorator\}><\/div>/,
      `<div className={styles.leftDecorator}></div>\n      <div className={styles.rightDecorator}></div>`
    );
    fs.writeFileSync(tsxPath, tsxContent, 'utf8');
  }
}

console.log('Successfully added split decorators to Equipe page!');
