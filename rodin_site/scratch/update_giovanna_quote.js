const fs = require('fs');
const path = 'src/components/Highlight/Highlight.tsx';
let content = fs.readFileSync(path, 'utf8');

// Find Giovanna's quote and replace it
content = content.replace(
  /quote: "Tamb[^"]+"/g,
  'quote: "Se você falar com um monitor, se você fala com algum coordenador, é muito bom, porque eles entendem, eles acolhem, eles tentam ajudar da melhor forma possível, e é muito bom!"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Done updating Giovanna quote!');
