const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamData.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /"name":\s*"Prof\. Carlos"/g,
  '"name": "Carlos"'
);

content = content.replace(
  /"role":\s*"Professor\(a\)"/g,
  '"role": "Professor"'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Prof. Carlos renamed to Carlos');
