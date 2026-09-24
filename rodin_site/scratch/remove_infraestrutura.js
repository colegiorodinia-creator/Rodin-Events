const fs = require('fs');

const tsxPath = 'src/app/diferenciais/page.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Remove the Infraestrutura component from being imported and rendered
tsxContent = tsxContent.replace(
  /import Infraestrutura from '@\/components\/QuemSomos\/Infraestrutura';\n/,
  ''
);

tsxContent = tsxContent.replace(
  /      <Infraestrutura \/>\n      \n/,
  ''
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Successfully removed Infraestrutura from the Diferenciais page!');
