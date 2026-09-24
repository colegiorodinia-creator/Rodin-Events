const fs = require('fs');

const tsxPath = 'src/components/Statement/Statement.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

const correctText = `
        <h2 className={styles.text} ref={textRef}>
          <span>A </span><span>gente </span><br className={styles.mobileBr} />
          <span>acredita </span><span>que </span><br className={styles.mobileBr} />
          <span>todo </span><br className={styles.desktopBr} />
          <span>aluno </span><br className={styles.mobileBr} />
          <span>tem </span><span>potencial </span><br className={styles.mobileBr} />
          <span>para </span><br className={styles.desktopBr} />
          <span>ser </span><span>o </span><span>que </span><br className={styles.mobileBr} />
          <span>quiser </span><span>e </span><span>o </span><br className={styles.mobileBr} />
          <span>direito </span><br className={styles.desktopBr} />
          <span>de </span><br className={styles.mobileBr} />
          <span>desenvolver </span><br className={styles.mobileBr} />
          <span>essa </span><br className={styles.desktopBr} />
          <span>potência </span><br className={styles.mobileBr} />
          <span>integralmente.</span>
        </h2>
`;

tsxContent = tsxContent.replace(/<h2 className=\{styles\.text\} ref=\{textRef\}>[\s\S]*?<\/h2>/, correctText.trim());

fs.writeFileSync(tsxPath, tsxContent, 'utf8');

const cssPath = 'src/components/Statement/Statement.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Ensure mobileBr and desktopBr exist
if (!cssContent.includes('.mobileBr')) {
  cssContent += `
.mobileBr { display: none; }
.desktopBr { display: block; }
@media (max-width: 768px) {
  .mobileBr { display: block; }
  .desktopBr { display: none; }
  .text { font-size: 2rem !important; line-height: 1.2; }
}
`;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
}

console.log('Successfully fixed Statement!');
