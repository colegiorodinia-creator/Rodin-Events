const fs = require('fs');

const cssPath = 'src/components/Programs/Programs.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// I will just replace the whole mobile override block I added previously
const badBlockRegex = /\@media \(max-width: 768px\) \{\s*\.title \{[\s\S]*\}\s*\}/;

const newMobileOverride = `
@media (max-width: 768px) {
  .title {
    font-size: 1.6rem !important; /* Letra menor para não quebrar a palavra EXTRACURRICULARES */
    text-align: center;
    white-space: normal;
    word-break: keep-all; /* Evita cortar a palavra no meio */
    margin-bottom: 0.5rem;
  }
  .desc {
    font-size: 0.95rem !important;
    text-align: center;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
  .videoOverlay {
    height: 50vh !important; /* Altura suficiente para o gradiente ficar suave */
    padding: 2rem 5vw 10vh 5vw !important; /* Padding normal, levantando um pouco por causa do whatsapp */
    bottom: 0 !important; 
    left: 0 !important;
    transform: none !important;
    width: 100vw !important;
    align-items: flex-end !important; /* Texto fica alinhado embaixo no gradiente */
    justify-content: center !important;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%) !important; /* Gradiente elegante ao invés de bloco preto */
  }
  .textContent {
    position: relative !important;
    width: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: auto; 
  }
  .playCenter {
    top: 50% !important; /* Volta pro meio exato da tela (entre o peito deles) pra tirar da cabeça */
  }
  .tiktokSection {
    background-size: cover;
    background-position: center;
  }
}
`;

if (badBlockRegex.test(cssContent)) {
  cssContent = cssContent.replace(badBlockRegex, newMobileOverride.trim());
} else {
  cssContent = cssContent.trim() + '\n' + newMobileOverride.trim();
}

fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Fixed Programs CSS layout again');
