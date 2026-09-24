const fs = require('fs');

const cssPath = 'src/components/Hero/Hero.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const scrollWheelBlock = `@keyframes scrollWheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(15px); opacity: 0; }
}`;

const parts = cssContent.split(scrollWheelBlock);

if (parts.length >= 2) {
  const newCss = parts[0] + scrollWheelBlock + `

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
    margin-top: auto !important; /* Empurra o botão brutalmente pro fundo */
  }
}
`;

  fs.writeFileSync(cssPath, newCss, 'utf8');
  console.log('Fixed Hero CSS syntax error!');
} else {
  console.log('Could not find scrollWheel block!');
}
