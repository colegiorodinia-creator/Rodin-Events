const fs = require('fs');

const tsxPath = 'src/components/ModalKit/ModalKit.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

tsxContent = tsxContent.replace(
  /<option value="fundamental2">Ensino Fundamental II<\/option>/,
  '<option value="fundamental2">Ensino Fundamental II (6º ao 9º ano)</option>'
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Successfully updated the "Série de Interesse" option!');
