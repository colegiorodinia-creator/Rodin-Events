const fs = require('fs');
const path = 'src/components/Highlight/Highlight.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace thumbImage for Isabela Trevelato (depoimento5.jpg to isabela_trevelato_icon.jpg)
content = content.replace(
  /coverImage: "\/depoimentos\/depoimento5\.jpg",\s*thumbImage: "\/depoimentos\/depoimento5\.jpg"/g,
  'coverImage: "/depoimentos/depoimento5.jpg",\n        thumbImage: "/depoimentos/isabela_trevelato_icon.jpg"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Done updating Isabela Trevelato!');
