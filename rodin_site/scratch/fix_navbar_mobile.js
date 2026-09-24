const fs = require('fs');

const cssPath = 'src/components/Navbar/Navbar.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const mobileCss = `

@media (max-width: 768px) {
  .headerInitial {
    top: 5px; /* Desce o logo para nǜo ficar cortado */
    padding: 0 1.5rem; /* Alinha exatamente com a margem do texto Desperta PotǦncia */
  }
  .hamburgerContainer.initial {
    top: 5px; 
    padding: 0 1.5rem;
  }
  .logoMainInitial {
    height: 90px !important; /* Deixa o logo um pouco maior */
  }
}
`;

fs.writeFileSync(cssPath, cssContent + mobileCss, 'utf8');

console.log('Appended mobile Navbar CSS');
