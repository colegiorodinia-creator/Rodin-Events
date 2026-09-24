const fs = require('fs');

const cssPath = 'src/app/equipe/page.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /\.leftDecorator \{[\s\S]*?pointer-events: none;\n/g,
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
  opacity: 0.2; /* Bem mais sutil */
  mix-blend-mode: multiply; /* Retorna o efeito que tira o branco */
  pointer-events: none;\n`
);

cssContent = cssContent.replace(
  /\.rightDecorator \{[\s\S]*?pointer-events: none;\n/g,
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
  opacity: 0.2; /* Bem mais sutil */
  mix-blend-mode: multiply; /* Retorna o efeito que tira o branco */
  pointer-events: none;\n`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully applied subtle multiply blend mode!');
