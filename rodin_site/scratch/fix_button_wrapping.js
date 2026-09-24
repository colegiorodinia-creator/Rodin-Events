const fs = require('fs');

const tsxPath = 'src/components/Hero/Hero.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Revert title
tsxContent = tsxContent.replace(
  /DESPERTA<br className=\{styles\.desktopBr\}\/> POTÊNCIA/,
  'DESPERTA<br/>POTÊNCIA'
);
fs.writeFileSync(tsxPath, tsxContent, 'utf8');

const cssPath = 'src/components/Hero/Hero.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Revert title size and line break
cssContent = cssContent.replace(
  /\.title \{ font-size: 1\.8rem; white-space: nowrap; \}/,
  '.title {\n      font-size: 3rem;\n    }'
);
cssContent = cssContent.replace(
  /  \.desktopBr \{ display: none !important; \}\n/,
  ''
);

// Fix button so it doesn't break into two lines
// We add rules to .cta inside the mobile query
cssContent = cssContent.replace(
  /\.cta \{\s*align-self: center;\s*margin-top: auto !important;\s*\}/,
  '.cta {\n      align-self: center;\n      margin-top: auto !important;\n      padding: 1rem 1.5rem;\n      font-size: 0.85rem;\n      white-space: nowrap;\n    }'
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Reverted title and fixed button text wrapping');
