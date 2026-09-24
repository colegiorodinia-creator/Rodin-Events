const fs = require('fs');
const path = 'src/components/Programs/Programs.module.css';
let content = fs.readFileSync(path, 'utf8');

// Adiciona scroll-behavior: smooth ao tiktokContainer
content = content.replace(
  /scroll-snap-type: y mandatory;/g,
  'scroll-snap-type: y mandatory;\n  scroll-behavior: smooth;'
);

// Remove scroll-snap-stop: always; (isso pode estar deixando o scroll "duro" e impedindo fluidez)
content = content.replace(
  /scroll-snap-stop: always;\n/g,
  ''
);

fs.writeFileSync(path, content, 'utf8');
console.log('Added smooth scrolling to Native CSS Snapping!');
