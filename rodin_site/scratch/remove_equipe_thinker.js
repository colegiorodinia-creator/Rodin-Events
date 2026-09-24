const fs = require('fs');

// 1. UPDATE CSS
const cssPath = 'src/app/equipe/page.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// The original rightDecorator code had:
const originalRightDecorator = `.rightDecorator {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 45vw; /* Deixei mais comprido */
  height: 90vh;
  background-image: url('/pensador_aluno.png');
  background-size: 124.5%; /* Mantém a proporção idêntica */
  background-position: right bottom; /* Jogou a imagem mais para baixo */
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.15;
  pointer-events: none;
  /* Mesma lógica para a direita */
  -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%);
  mask-image: linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%);
}`;

cssContent = cssContent.replace(
  /\.rightDecorator \{[\s\S]*?\}\n\n/g,
  originalRightDecorator + '\n\n'
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

// 2. UPDATE TSX
const tsxPath = 'src/app/equipe/page.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

tsxContent = tsxContent.replace(
  /<div className=\{styles\.rightDecorator\}><\/div>\n      /g,
  ''
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');

console.log('Successfully removed the thinker statue from the /equipe page!');
