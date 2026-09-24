const fs = require('fs');

const cssPath = 'src/components/Highlight/Highlight.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Remover a última inserção bugada
cssContent = cssContent.replace(/\@media \(max-width: 768px\) \{\s*\.testimonyName \{[\s\S]*$/, '');

const cleanMobileOverride = `
@media (max-width: 768px) {
  .testimonyName {
    font-size: 2rem !important;
    white-space: normal;
    word-break: break-word;
    text-align: center;
  }
  .testimonyQuote {
    font-size: 1rem !important;
    text-align: center;
  }
  .textOverlay {
    position: absolute !important;
    bottom: 25vh !important;
    top: auto !important;
    left: 5vw !important;
    right: 5vw !important;
    transform: none !important;
    margin-bottom: 0 !important;
    text-align: center !important;
    width: 90vw !important;
  }
  .playCenter {
    top: 30% !important;
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

fs.writeFileSync(cssPath, cssContent.trim() + '\n' + cleanMobileOverride, 'utf8');

console.log('Cleaned and appended CSS without accents');
