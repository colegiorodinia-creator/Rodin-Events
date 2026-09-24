const fs = require('fs');
const path = 'src/components/Highlight/Highlight.tsx';
let content = fs.readFileSync(path, 'utf8');

// Find Isabela's quote and replace it
content = content.replace(
  /quote: "O rodin, ele foca em te ensinar, fazer [^"]+"/g,
  'quote: "O Rodin, ele foca em te ensinar, fazer você aprender e evoluir como pessoa também, não só como estudante."'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Done updating Isabela quote!');
