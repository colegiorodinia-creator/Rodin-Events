const fs = require('fs');
const file = 'src/app/equipe/page.module.css';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/font-size: 1\.2rem; \/\* Diminudo[\s\S]*?\*\//, 'font-size: 1.5rem;');
code = code.replace(/\.role\s*\{\s*font-family: var\(--font-body\);\s*font-size: 0\.85rem;/, '.role {\n  font-family: var(--font-body);\n  font-size: 1.1rem;');
code = code.replace(/\.formation\s*\{\s*font-family: var\(--font-body\);\s*font-size: 0\.8rem;/, '.formation {\n  font-family: var(--font-body);\n  font-size: 1rem;');
code = code.replace(/-webkit-line-clamp: 5;/, '-webkit-line-clamp: 2;');

const mediaQuery = 
@media (min-width: 1025px) {
  .clickHint {
    display: none !important;
  }
  .formation {
    -webkit-line-clamp: unset !important;
  }
}
;

fs.writeFileSync(file, code + '\n' + mediaQuery);
console.log('Updated Equipe page CSS');