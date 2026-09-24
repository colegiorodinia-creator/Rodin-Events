const fs = require('fs');
const path = 'src/components/Highlight/Highlight.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace thumbImage for Laura Festa (depoimento3.png to laura_festa_icon.jpg)
content = content.replace(
  /coverImage: "\/depoimentos\/depoimento3\.png",\s*thumbImage: "\/depoimentos\/depoimento3\.png"/g,
  'coverImage: "/depoimentos/depoimento3.png",\n        thumbImage: "/depoimentos/laura_festa_icon.jpg"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Done!');
