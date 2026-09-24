const fs = require('fs');

const cssPath = 'src/components/Programs/Programs.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Remove my previous bad override
cssContent = cssContent.replace(/\@media \(max-width: 768px\) \{\s*\.title \{[\s\S]*$/, '');

const mobileOverride = `
@media (max-width: 768px) {
  .title {
    font-size: 2.2rem !important;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    margin-bottom: 0.5rem;
  }
  .desc {
    font-size: 1rem !important;
    text-align: center;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
  .videoOverlay {
    height: auto !important; /* Deixa o overlay crescer com o texto */
    padding: 2rem 5vw !important; /* Padding normal */
    bottom: 5vh !important; /* Sobe o bloco inteiro */
    left: 0 !important;
    transform: none !important;
    width: 100vw !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgba(0,0,0,0.6) !important; /* Fundo escuro pro texto legível */
  }
  .textContent {
    position: relative !important;
    width: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: auto; /* Para os cliques funcionarem */
  }
  .playCenter {
    top: 30% !important; /* Puxa o botão de play bem pra cima pra não bater no texto */
  }
  .tiktokSection {
    background-size: cover;
    background-position: center;
  }
}
`;

fs.writeFileSync(cssPath, cssContent.trim() + '\n' + mobileOverride, 'utf8');

console.log('Fixed Programs CSS layout');
