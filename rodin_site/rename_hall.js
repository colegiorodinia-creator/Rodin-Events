const fs = require('fs');
const path = require('path');

const infraDir = path.join(__dirname, 'public', 'infraestrutura');
const files = fs.readdirSync(infraDir);

files.forEach(file => {
  if (file.includes('Hall')) {
    fs.renameSync(path.join(infraDir, file), path.join(infraDir, 'hall_pedagogico.png'));
  }
});
console.log('Renamed Hall do Pedagógico');
