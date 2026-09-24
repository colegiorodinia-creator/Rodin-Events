const fs = require('fs');

const cssPath = 'src/app/equipe/page.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace leftDecorator
cssContent = cssContent.replace(
  /\.leftDecorator \{[\s\S]*?pointer-events: none;\n\}/,
  `.leftDecorator {
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
  opacity: 0.5;
  pointer-events: none;
  /* Apaga suavemente a metade direita do container para esconder o "fantasma" do aluno */
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 50%);
  mask-image: linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 50%);
}`
);

// Replace rightDecorator
cssContent = cssContent.replace(
  /\.rightDecorator \{[\s\S]*?pointer-events: none;\n\}/,
  `.rightDecorator {
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
  /* Apaga suavemente a metade esquerda do container para esconder o "fantasma" do pensador */
  -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 50%);
  mask-image: linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 50%);
}`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Successfully added masks to hide the ghost images!');
