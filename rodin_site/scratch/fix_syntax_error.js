const fs = require('fs');

const cssPath = 'src/components/Hero/Hero.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const scrollWheelBlock = `@keyframes scrollWheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(15px); opacity: 0; }
}`;

const parts = cssContent.split(scrollWheelBlock);

if (parts.length === 2) {
  const newCss = parts[0] + scrollWheelBlock + `

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

  fs.writeFileSync(cssPath, newCss, 'utf8');
  console.log('Fixed Hero CSS syntax error!');
} else {
  console.log('Could not find scrollWheel block!');
}
