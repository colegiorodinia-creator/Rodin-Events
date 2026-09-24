const fs = require('fs');
const path = 'src/components/Footer/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/>Telefone \(19\)/g, '>Telefone: (19)');
content = content.replace(/>WhatsApp \(19\)/g, '>WhatsApp: (19)');
content = content.replace(/>E-mail contato/g, '>E-mail: contato');

fs.writeFileSync(path, content, 'utf8');
console.log('Done updating Footer contact labels!');
