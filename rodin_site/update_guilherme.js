const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The specific object is:
// {
//   "name": "Guilherme",
//   "role": "Treinador",
//   "formation": "Formaǜo a definir.",
//   "imgUrl": "/equipe/Guilherme Treinador.png"
// }

content = content.replace(
  /"name":\s*"Guilherme",\s*"role":\s*"Treinador"/,
  '"name": "Guilherme",\n    "role": ""'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Role updated to empty string');
