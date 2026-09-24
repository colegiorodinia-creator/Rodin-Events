const fs = require('fs');
const path = 'src/components/Programs/Programs.tsx';
let content = fs.readFileSync(path, 'utf8');

// Change the scroll end distance to make it extremely sensitive
content = content.replace(
  /end: "\+=500", \/\/ Gatilho super sensível \(menos rolagem necessária\)/g,
  'end: "+=300", // Fio da navalha (muito sensível)'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully made the trigger extremely sensitive!');
