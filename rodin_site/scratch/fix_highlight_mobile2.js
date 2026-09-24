const fs = require('fs');

const cssPath = 'src/components/Highlight/Highlight.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const mobileOverride = `
@media (max-width: 768px) {
  .testimonyName {
    font-size: 2.2rem !important; /* Tamanho amigável para celular */
    white-space: normal;
    word-break: break-word;
  }
  .testimonyQuote {
    font-size: 1rem !important; /* Legível no celular */
    text-align: center;
  }
  .textOverlay {
    position: absolute !important;
    bottom: 25vh !important; /* Levanta o texto para não ficar espremido no carrossel */
    top: auto !important;
    left: 5vw !important;
    right: 5vw !important;
    transform: none !important;
    margin-bottom: 0 !important;
    text-align: center !important;
    width: 90vw !important;
  }
  .playCenter {
    top: 30% !important; /* Sobe o botão de play para não brigar com o texto */
  }
  .carouselContainer {
    position: absolute !important;
    bottom: 5vh !important;
    left: 0 !important;
    width: 100% !important;
  }
  .highlightSection {
    padding: 0 !important;
  }
}
`;

fs.writeFileSync(cssPath, cssContent + '\n' + mobileOverride, 'utf8');

console.log('Appended highlight mobile fixes');
