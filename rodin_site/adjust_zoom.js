const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'app', 'itinerarios', 'Itinerarios.module.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Substituir as regras antigas por um zoom maior e foco na direita
cssContent = cssContent.replace(
  /\.zoomedImage \{[\s\S]*?transform: scale\(1\.35\);\n\}/,
  `.zoomedImage {
  transform: scale(1.7);
  transform-origin: 80% 60%;
}
.card:hover .zoomedImage {
  transform: scale(1.75);
  transform-origin: 80% 60%;
}`
);

fs.writeFileSync(cssPath, cssContent);
console.log("Zoom adjusted");
