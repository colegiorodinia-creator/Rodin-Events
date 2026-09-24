const fs = require('fs');
const path = 'src/components/Programs/Programs.tsx';
let content = fs.readFileSync(path, 'utf8');

// Change the scroll end distance to make it more sensitive
content = content.replace(
  /end: "\+=1200", \/\/ Distância para rolagem/g,
  'end: "+=500", // Gatilho super sensível (menos rolagem necessária)'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully made the trigger more sensitive!');
