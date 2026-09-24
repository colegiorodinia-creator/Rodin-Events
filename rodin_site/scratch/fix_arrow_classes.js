const fs = require('fs');

const tsxPath = 'src/components/QuemSomos/Infraestrutura.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

tsxContent = tsxContent.replace(
  /\className=\{`\$\{styles.arrow\} \$\{startIndex === 0 \? styles\.disabled : ''\}`\}/,
  'className={`${styles.arrow} ${activeIndex === 0 ? styles.disabled : \'\'}`}'
);

tsxContent = tsxContent.replace(
  /\className=\{`\$\{styles.arrow\} \$\{startIndex >= infraData\.length - visibleCount \? styles\.disabled : ''\}`\}/,
  'className={`${styles.arrow} ${activeIndex >= infraData.length - 1 ? styles.disabled : \'\'}`}'
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Fixed arrow classes!');
