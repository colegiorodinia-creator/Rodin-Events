const fs = require('fs');

// 1. UPDATE CSS
const cssPath = 'src/app/equipe/page.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /\.rightDecorator \{[\s\S]*?\}\n\n/,
  `.rightDecorator {
  position: fixed;
  right: -5vw;
  bottom: 0;
  width: 35vw;
  height: 85vh;
  background-image: url('/pensador_recortado.png');
  background-size: contain;
  background-position: right bottom;
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.7; /* Mais visível, já que é o pensador em si */
  pointer-events: none;
}

`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

// 2. UPDATE TSX
const tsxPath = 'src/app/equipe/page.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

if (!tsxContent.includes('rightDecorator')) {
  tsxContent = tsxContent.replace(
    /<main className=\{styles\.pageContainer\}>/,
    `<div className={styles.rightDecorator}></div>
      <main className={styles.pageContainer}>`
  );
  fs.writeFileSync(tsxPath, tsxContent, 'utf8');
}

console.log('Successfully added thinker statue to /equipe page!');
