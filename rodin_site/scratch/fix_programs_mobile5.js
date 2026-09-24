const fs = require('fs');

const cssPath = 'src/components/Programs/Programs.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// I will overwrite the previous mobile override block again
const badBlockRegex = /\@media \(max-width: 768px\) \{\s*\.title \{[\s\S]*\}\s*\}/;

const newMobileOverride = `
@media (max-width: 768px) {
  .title {
    font-size: 1.6rem !important; 
    text-align: left !important; 
    white-space: normal;
    word-break: keep-all; 
    margin-bottom: auto !important; /* EMPURRA O TEXTO E O BOTÃO PARA O FUNDO! */
    margin-top: 8vh; /* Título mais para cima, logo abaixo do header */
  }
  .desc {
    font-size: 0.95rem !important;
    text-align: left !important; 
    line-height: 1.3;
    margin-bottom: 1.5rem !important; /* Espaço entre a descrição e o botão */
    margin-top: 0 !important; /* Garante que não está sendo empurrado pelo margin auto anterior */
  }
  .exploreButton {
    align-self: flex-start !important; 
    margin-top: 0 !important;
  }
  .videoOverlay {
    height: 100dvh !important; 
    padding: 0 5vw 12vh 5vw !important; /* 12vh na base pro botão não bater nas bordas/whatsapp */
    bottom: 0 !important; 
    left: 0 !important;
    transform: none !important;
    width: 100vw !important;
    align-items: flex-start !important; 
    justify-content: flex-start !important; /* Sem space-between */
    background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.8) 100%) !important; 
  }
  .textContent {
    position: relative !important;
    width: 100% !important;
    height: 100% !important; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start !important; /* Mantém tudo naturalmente, mas o margin-bottom: auto do title separa os grupos */
    align-items: flex-start !important; 
    pointer-events: auto; 
  }
  .playCenter {
    top: 50% !important; 
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

console.log('Fixed flexbox layout to cluster desc and button at bottom');
