const fs = require('fs');

// 1. UPDATE CSS
const cssPath = 'src/components/QuemSomos/Infraestrutura.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('.ctaButton')) {
  cssContent += `
.ctaButton {
  display: inline-block;
  background-color: #ff5a00;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.1rem;
  transition: transform 0.2s, background-color 0.2s;
  margin-top: 1.5rem;
}

.ctaButton:hover {
  background-color: #e55b13;
  transform: scale(1.05);
}
`;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
}

// 2. UPDATE TSX
const tsxPath = 'src/components/QuemSomos/Infraestrutura.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

if (!tsxContent.includes('AGENDE SUA VISITA')) {
  tsxContent = tsxContent.replace(
    /<h2 className=\{styles\.title\}>\n\s*\{infraData\[activeIndex\]\.title\}\n\s*<\/h2>/,
    `<h2 className={styles.title}>
              {infraData[activeIndex].title}
            </h2>
            <a href="/matriculas" className={styles.ctaButton}>AGENDE SUA VISITA</a>`
  );
  fs.writeFileSync(tsxPath, tsxContent, 'utf8');
}

console.log('Successfully added the CTA button to Infraestrutura!');
