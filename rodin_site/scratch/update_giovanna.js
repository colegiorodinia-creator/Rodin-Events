const fs = require('fs');
const path = 'src/components/Highlight/Highlight.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace thumbImage for Giovanna Leonel (depoimento6.jpg to giovanna_leonel_icon.png)
content = content.replace(
  /coverImage: "\/depoimentos\/depoimento6\.jpg",\s*thumbImage: "\/depoimentos\/depoimento6\.jpg"/g,
  'coverImage: "/depoimentos/depoimento6.jpg",\n        thumbImage: "/depoimentos/giovanna_leonel_icon.png"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Done updating Giovanna Leonel!');
