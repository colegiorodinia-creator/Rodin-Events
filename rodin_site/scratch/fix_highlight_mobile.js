const fs = require('fs');

const cssPath = 'src/components/Highlight/Highlight.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const mobileOverride = `
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
    position: absolute;
    bottom: 25vh; /* Levanta o texto para não ficar espremido no carrossel */
    top: auto;
    left: 5vw;
    right: 5vw;
    transform: none;
    margin-bottom: 0;
    text-align: center;
    width: 90vw;
  }
  .playCenter {
    top: 35% !important; /* Sobe o botão de play para não brigar com o texto */
  }
  .carouselContainer {
    position: absolute;
    bottom: 5vh;
    left: 0;
    width: 100%;
  }
`;

cssContent = cssContent.replace(
  /(\@media \(max-width: 768px\) \{[\s\S]*?)(\})/,
  `$1${mobileOverride}$2`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Fixed mobile highlight text scaling and positioning');
