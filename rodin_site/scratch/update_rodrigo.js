const fs = require('fs');
const path = 'src/components/Highlight/Highlight.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace thumbImage for Rodrigo Kenji (depoimento4.jpg to rodrigo_kenji_icon.png)
content = content.replace(
  /coverImage: "\/depoimentos\/depoimento4\.jpg",\s*thumbImage: "\/depoimentos\/depoimento4\.jpg"/g,
  'coverImage: "/depoimentos/depoimento4.jpg",\n        thumbImage: "/depoimentos/rodrigo_kenji_icon.png"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Done updating Rodrigo Kenji!');
