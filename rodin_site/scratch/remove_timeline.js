const fs = require('fs');

const tsxPath = 'src/app/diferenciais/page.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Remove StorytellingTimeline completely from the page
tsxContent = tsxContent.replace(
  /import StorytellingTimeline from '@\/components\/QuemSomos\/StorytellingTimeline';\n/,
  ''
);

tsxContent = tsxContent.replace(
  /      <StorytellingTimeline \/>\n\n/,
  ''
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Successfully removed StorytellingTimeline!');
