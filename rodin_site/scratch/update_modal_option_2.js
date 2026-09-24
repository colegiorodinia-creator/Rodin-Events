const fs = require('fs');

const tsxPath = 'src/components/ModalKit/ModalKit.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Replace using regex that ignores the corrupted characters
tsxContent = tsxContent.replace(
  /<option value="primeira_segunda_serie">.+<\/option>/,
  '<option value="primeira_segunda_serie">Ensino Médio (1ª e 2ª série)</option>'
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Successfully updated the high school option!');
