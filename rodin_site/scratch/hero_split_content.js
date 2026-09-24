const fs = require('fs');

const cssPath = 'src/components/Hero/Hero.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const regex = /@media \(max-width: 768px\) \{[\s\S]*?\}(?=\s*(?:\.|$|@))/;

const newMobileCss = `
@media (max-width: 768px) {
  .hero {
    padding: 15vh 1.5rem 8vh 1.5rem; /* Respiro no topo e no fundo */
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }
  .bgImage {
    background-position: 85% center !important; 
  }
  /* O gradiente escurece as duas pontas: topo e fundo para dar leitura na letra branca */
  .overlay { 
    background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%); 
  }
  .content {
    margin-top: 0;
    width: 100%;
    height: 100%; /* Ocupa a tela inteira */
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
    margin-top: auto !important; /* Empurra o botǜo brutalmente pro fundo */
  }
}
`;

cssContent = cssContent.replace(regex, newMobileCss.trim() + '\n');
fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Fixed hero mobile layout: title top, button bottom!');
