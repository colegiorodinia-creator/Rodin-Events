const fs = require('fs');

const tsxPath = 'src/app/diferenciais/page.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

if (!tsxContent.includes('import Infraestrutura')) {
  tsxContent = tsxContent.replace(
    /import StorytellingTimeline from '@\/components\/QuemSomos\/StorytellingTimeline';/,
    "import StorytellingTimeline from '@/components/QuemSomos/StorytellingTimeline';\nimport Infraestrutura from '@/components/QuemSomos/Infraestrutura';"
  );
}

if (!tsxContent.includes('<Infraestrutura />')) {
  tsxContent = tsxContent.replace(
    /      <StorytellingTimeline \/>\n\n      <Footer \/>/,
    "      <StorytellingTimeline />\n\n      <Infraestrutura />\n      \n      <Footer />"
  );
}

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Successfully restored Infraestrutura to the Diferenciais page!');
