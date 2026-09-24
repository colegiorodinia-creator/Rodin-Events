const fs = require('fs');
const path = require('path');

// Append CSS
const cssPath = path.join(__dirname, 'src', 'app', 'itinerarios', 'Itinerarios.module.css');
const cssToAppend = `
.zoomedImage {
  transform: scale(1.3);
}
.card:hover .zoomedImage {
  transform: scale(1.35);
}
`;
fs.appendFileSync(cssPath, cssToAppend);

// Update page.tsx
const pagePath = path.join(__dirname, 'src', 'app', 'itinerarios', 'page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Replace className={styles.image} with dynamic class
pageContent = pageContent.replace(
  /className=\{styles\.image\}/,
  "className={`${styles.image} ${item.id === 'financas-pessoais' ? styles.zoomedImage : ''}`}"
);

fs.writeFileSync(pagePath, pageContent);
console.log("Zoom applied");
