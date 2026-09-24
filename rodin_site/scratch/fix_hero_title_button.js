const fs = require('fs');

const tsxPath = 'src/components/Hero/Hero.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Replace the hardcoded <br/> with a responsive one
tsxContent = tsxContent.replace(
  /DESPERTA<br\/>POTSNCIA/,
  'DESPERTA<br className={styles.desktopBr}/> POTÊNCIA'
);
// Also replacing if it's spelled correctly in source
tsxContent = tsxContent.replace(
  /DESPERTA<br\/>POTÊNCIA/,
  'DESPERTA<br className={styles.desktopBr}/> POTÊNCIA'
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');

const cssPath = 'src/components/Hero/Hero.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Ensure desktopBr is hidden on mobile
if (!cssContent.includes('.desktopBr')) {
  cssContent += `\n.desktopBr { display: block; }\n`;
  cssContent = cssContent.replace(
    /@media \(max-width: 768px\) \{/,
    `@media (max-width: 768px) {\n  .desktopBr { display: none !important; }\n`
  );
}

// Decrease font size so it fits on one line
cssContent = cssContent.replace(
  /\.title \{\s*font-size: 3rem;\s*\}/,
  '.title { font-size: 1.8rem; white-space: nowrap; }'
);

// Fix button width. It seems it still has "justify-content: center; padding: 1rem 1rem;" which makes it wide on mobile.
cssContent = cssContent.replace(
  /\.cta \{\s*justify-content: center;\s*padding: 1rem 1rem;\s*font-size: 0\.9rem;\s*align-self: center;\s*margin-top: auto !important;\s*\}/,
  '.cta { align-self: center; margin-top: auto !important; }'
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Fixed title line breaks and button width');
