const fs = require('fs');

// 1. UPDATE TSX
const tsxPath = 'src/components/Statement/Statement.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

const newText = `
        <h2 className={styles.text} ref={textRef}>
          <span>A </span><span>gente</span>
          <br className={styles.mobileBr} />
          <span className={styles.desktopSpace}> </span>
          <span>acredita </span><span>que</span>
          <br className={styles.mobileBr} />
          <span className={styles.desktopSpace}> </span>
          <span>todo</span>
          <br className={styles.desktopBr} />
          <span className={styles.mobileSpace}> </span>
          <span>aluno</span>
          <br className={styles.mobileBr} />
          <span className={styles.desktopSpace}> </span>
          <span>tem </span><span>potencial</span>
          <br className={styles.mobileBr} />
          <span className={styles.desktopSpace}> </span>
          <span>para</span>
          <br className={styles.desktopBr} />
          <span className={styles.mobileSpace}> </span>
          <span>ser </span><span>o </span><span>que</span>
          <br className={styles.mobileBr} />
          <span className={styles.desktopSpace}> </span>
          <span>quiser </span><span>e </span><span>o</span>
          <br className={styles.mobileBr} />
          <span className={styles.desktopSpace}> </span>
          <span>direito</span>
          <br className={styles.desktopBr} />
          <span className={styles.mobileSpace}> </span>
          <span>de</span>
          <span className={styles.desktopSpace}> </span>
          <br className={styles.mobileBr} />
          <span>desenvolver</span>
          <span className={styles.desktopSpace}> </span>
          <br className={styles.mobileBr} />
          <span>essa</span>
          <br className={styles.desktopBr} />
          <span className={styles.mobileSpace}> </span>
          <span>potência</span>
          <br className={styles.mobileBr} />
          <span className={styles.desktopSpace}> </span>
          <span>integralmente.</span>
        </h2>
`;

tsxContent = tsxContent.replace(/<h2 className=\{styles\.text\} ref=\{textRef\}>[\s\S]*?<\/h2>/, newText.trim());
fs.writeFileSync(tsxPath, tsxContent, 'utf8');

// 2. UPDATE CSS
const cssPath = 'src/components/Statement/Statement.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('.mobileBr')) {
  const cssAppends = `
.mobileBr { display: none; }
.desktopBr { display: block; }
.mobileSpace { display: inline; }
.desktopSpace { display: none; }

@media (max-width: 768px) {
  .mobileBr { display: block; }
  .desktopBr { display: none; }
  .mobileSpace { display: none; }
  .desktopSpace { display: inline; }
  
  .text {
    font-size: 2rem !important; /* Ajuste fino do tamanho para celular */
    line-height: 1.2;
  }
}
`;
  fs.writeFileSync(cssPath, cssContent + cssAppends, 'utf8');
}

console.log('Successfully updated Statement line breaks for mobile!');
