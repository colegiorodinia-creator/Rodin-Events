const fs = require('fs');

const cssPath = 'src/components/Programs/Programs.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const mobileOverride = `
@media (max-width: 768px) {
  .title {
    font-size: 2rem !important; /* Ajuste para caber */
    text-align: center;
    white-space: normal;
    word-break: break-word;
  }
  .desc {
    font-size: 1rem !important;
    text-align: center;
  }
  .textContent {
    left: 5vw !important;
    right: 5vw !important;
    width: 90vw !important;
    bottom: 25vh !important; /* Levanta para cima do menu de navegação e play button */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .playCenter {
    top: 40% !important; /* Centraliza melhor longe do texto */
  }
}
`;

fs.writeFileSync(cssPath, cssContent + '\n' + mobileOverride, 'utf8');

console.log('Appended mobile overrides to Programs.module.css');
