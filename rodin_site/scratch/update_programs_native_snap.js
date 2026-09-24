const fs = require('fs');

// 1. UPDATE CSS
const cssPath = 'src/components/Programs/Programs.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace container
cssContent = cssContent.replace(
  /\.tiktokContainer {[\s\S]*?position: relative;\s*}/,
  `.tiktokContainer {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.tiktokContainer::-webkit-scrollbar {
  display: none;
}`
);

// Replace track
cssContent = cssContent.replace(
  /\.tiktokTrack {[\s\S]*?position: relative;\s*}/,
  `.tiktokTrack {
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
}`
);

// Replace section
cssContent = cssContent.replace(
  /\.tiktokSection {[\s\S]*?z-index: 2;\s*}/,
  `.tiktokSection {
  position: relative;
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
  background-color: #000;
  z-index: 2;
}`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

// 2. UPDATE TSX
const tsxPath = 'src/components/Programs/Programs.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

const useGsapRegex = /useGSAP\(\(\) => \{[\s\S]*?\}, \{ scope: containerRef \}\);/g;
tsxContent = tsxContent.replace(useGsapRegex, '');

// Add data-lenis-prevent to container
tsxContent = tsxContent.replace(
  /className=\{styles\.tiktokContainer\}/,
  'className={styles.tiktokContainer} data-lenis-prevent="true"'
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');

console.log('Successfully switched to Native CSS Scroll Snapping!');
