const fs = require('fs');

const cssPath = 'src/components/Programs/Programs.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Remove the previous mobile override block
const badBlockRegex = /\@media \(max-width: 768px\) \{\s*\.title \{[\s\S]*\}\s*\}/;

const newMobileOverride = `
@media (max-width: 768px) {
  .title {
    font-size: 1.6rem !important; 
    text-align: left !important; /* Alinhado à esquerda como pedido */
    white-space: normal;
    word-break: keep-all; 
    margin-bottom: 0.5rem;
    margin-top: 15vh; /* Empurra para baixo do header */
  }
  .desc {
    font-size: 0.95rem !important;
    text-align: left !important; /* Alinhado à esquerda como pedido */
    line-height: 1.3;
    margin-bottom: 1rem;
  }
  .exploreButton {
    align-self: flex-start !important; /* Botão alinhado à esquerda também */
  }
  .videoOverlay {
    height: 100dvh !important; /* Ocupa a tela inteira para poder espaçar topo e base */
    padding: 0 5vw 10vh 5vw !important; /* Padding lateral, e base para não bater no whatsapp */
    bottom: 0 !important; 
    left: 0 !important;
    transform: none !important;
    width: 100vw !important;
    align-items: flex-start !important; 
    justify-content: flex-start !important;
    /* Gradiente duplo: escuro em cima pro título, e escuro embaixo pro texto */
    background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%) !important; 
  }
  .textContent {
    position: relative !important;
    width: 100% !important;
    height: 100% !important; /* Pega a altura do overlay */
    display: flex;
    flex-direction: column;
    justify-content: space-between !important; /* Joga o título pro topo e a desc pra base */
    align-items: flex-start !important; /* Alinha tudo à esquerda */
    pointer-events: auto; 
  }
  /* Wrapper para agrupar desc e botão embaixo */
  .textContent > p, .textContent > a {
    margin-top: auto; /* Se o justify não bastar, força a descer */
  }
  .textContent > p {
    margin-top: auto !important; /* Empurra o texto para baixo, separando do título que fica no topo */
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

console.log('Fixed Programs CSS layout for top/bottom split');
