const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamData.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /"name":\s*"Carlos",\s*"role":\s*".*?"/,
  '"name": "Carlos",\n    "role": ""'
);

// wait, is it "Prof." in the name or the role?
// let's just log Carlos first to make sure what it says.
const match = content.match(/{[^}]*"name":\s*"Carlos"[^}]*}/g);
console.log(match);
