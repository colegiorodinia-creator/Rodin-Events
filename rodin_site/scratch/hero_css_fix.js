const fs = require('fs');

const cssPath = 'src/components/Hero/Hero.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace the previous mobile query completely with a new robust one
const newMobileCss = `
@media (max-width: 768px) {
  .hero {
    padding: 0 1.5rem;
    flex-direction: column;
    justify-content: flex-end; /* Empurra TUDO pro fundo */
    align-items: center;       /* Centraliza horizontalmente */
    text-align: center;
    padding-bottom: 25vh;      /* O quão pro fundo vai */
  }
  .bgImage {
    background-position: 30% center !important; /* Move a menina pro centro da tela */
  }
  .content {
    margin-top: 0;             /* Zera a margem que atrapalhava no desktop */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    font-size: 3rem;
  }
  .cta {
    width: 100%;
    justify-content: center;
    padding: 1rem 1rem;
    font-size: 0.9rem;
  }
}
`;

// Remove ALL existing @media (max-width: 768px) from Hero.module.css to clean it up
cssContent = cssContent.replace(/@media \(max-width: 768px\) \{[\s\S]*?\}(?=\s*(?:\.|$|@))/g, '');

// Append the fresh one
fs.writeFileSync(cssPath, cssContent + newMobileCss, 'utf8');

console.log('Successfully applied new mobile Hero CSS!');
