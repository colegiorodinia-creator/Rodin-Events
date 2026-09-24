const fs = require('fs');
const file = 'src/components/Navbar/Navbar.tsx';
let code = fs.readFileSync(file, 'utf8');
const search = /<header className=\{\`\$\{styles\.headerPill\}.*?<\/header>/gs;
code = code.replace(search, '');
fs.writeFileSync(file, code);
