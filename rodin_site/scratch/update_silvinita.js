const fs = require('fs');
const path = 'src/components/Highlight/Highlight.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace thumbImage for Silvinita (depoimento2.jpg to silvinita_icon.jpg)
content = content.replace(
  /coverImage: "\/depoimentos\/depoimento2\.jpg",\s*thumbImage: "\/depoimentos\/depoimento2\.jpg"/g,
  'coverImage: "/depoimentos/depoimento2.jpg",\n        thumbImage: "/depoimentos/silvinita_icon.jpg"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Done updating Silvinita!');
