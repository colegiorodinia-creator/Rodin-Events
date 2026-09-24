const fs = require('fs');

const tsxPath = 'src/components/QuemSomos/Infraestrutura.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

const targetStr = `<h2 className={styles.title}>
            {infraData[activeIndex].title}
          </h2>`;

const replaceStr = `<h2 className={styles.title}>
            {infraData[activeIndex].title}
          </h2>
          <a href="/matriculas" className={styles.ctaButton} style={{ marginTop: '15px' }}>AGENDE SUA VISITA</a>`;

if (tsxContent.includes(targetStr)) {
  tsxContent = tsxContent.replace(targetStr, replaceStr);
  fs.writeFileSync(tsxPath, tsxContent, 'utf8');
  console.log('Successfully added the CTA button using exact string replacement!');
} else {
  // If indentation was slightly different
  const targetStr2 = `<h2 className={styles.title}>\n              {infraData[activeIndex].title}\n            </h2>`;
  const replaceStr2 = `<h2 className={styles.title}>\n              {infraData[activeIndex].title}\n            </h2>\n            <a href="/matriculas" className={styles.ctaButton} style={{ marginTop: '15px' }}>AGENDE SUA VISITA</a>`;
  
  if (tsxContent.includes(targetStr2)) {
    tsxContent = tsxContent.replace(targetStr2, replaceStr2);
    fs.writeFileSync(tsxPath, tsxContent, 'utf8');
    console.log('Successfully added the CTA button using exact string replacement (version 2)!');
  } else {
    console.log('Could not find the target string!');
  }
}
