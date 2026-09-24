const fs = require('fs');

const cssPath = 'src/app/equipe/page.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /\.leftDecorator \{[\s\S]*?z-index: 1;\n/g,
  `$&  mix-blend-mode: multiply;\n`
);

cssContent = cssContent.replace(
  /\.rightDecorator \{[\s\S]*?z-index: 1;\n/g,
  `$&  mix-blend-mode: multiply;\n`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Successfully applied mix-blend-mode to hide white edges!');
