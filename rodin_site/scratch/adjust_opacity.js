const fs = require('fs');

const cssPath = 'src/app/equipe/page.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /opacity: 0\.2; \/\* Bem mais sutil \*\//g,
  'opacity: 0.35; /* Meio termo: mais claro/visível que 0.2, menos pesado que 0.5 */'
);

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully adjusted opacity to 0.35!');
