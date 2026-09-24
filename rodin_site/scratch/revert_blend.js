const fs = require('fs');

const cssPath = 'src/app/equipe/page.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /  mix-blend-mode: multiply;\n/g,
  ''
);

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully reverted mix-blend-mode!');
