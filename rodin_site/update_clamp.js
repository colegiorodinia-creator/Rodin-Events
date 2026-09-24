const fs = require('fs');

// Atualiza Team.module.css
const file1 = 'src/components/Team/Team.module.css';
let code1 = fs.readFileSync(file1, 'utf8');
code1 = code1.replace(/-webkit-line-clamp: 2;/g, '-webkit-line-clamp: 5;');
code1 = code1.replace(/-webkit-line-clamp: unset !important;/g, '-webkit-line-clamp: 5 !important;');
fs.writeFileSync(file1, code1);

// Atualiza page.module.css da equipe
const file2 = 'src/app/equipe/page.module.css';
let code2 = fs.readFileSync(file2, 'utf8');
code2 = code2.replace(/-webkit-line-clamp: 2;/g, '-webkit-line-clamp: 5;');
code2 = code2.replace(/-webkit-line-clamp: unset !important;/g, '-webkit-line-clamp: 5 !important;');
fs.writeFileSync(file2, code2);

console.log('Updated line clamps to 5');