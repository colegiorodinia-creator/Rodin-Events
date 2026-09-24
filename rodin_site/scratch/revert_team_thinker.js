const fs = require('fs');

// 1. REVERT CSS
const cssPath = 'src/components/Team/Team.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /\.teamSection \{\n  position: relative;\n  overflow: hidden; \/\* Evitar que o pensador passe da seção \*\//,
  '.teamSection {'
);

cssContent = cssContent.replace(
  /\.carouselContainer \{\n  position: relative;\n  z-index: 1;/,
  '.carouselContainer {'
);

cssContent = cssContent.replace(/[\s\S]*\.thinkerStatue \{[\s\S]*?\}\n\n\.thinkerStatue img \{[\s\S]*?\}\n\n@media \(max-width: 1024px\) \{[\s\S]*?\}\n\n/g, '');

// just replacing the exact block added earlier
const blockToRemove = `

.thinkerStatue {
  position: absolute;
  right: -2vw;
  bottom: -2vh;
  height: 90%;
  z-index: 0;
  pointer-events: none;
}

.thinkerStatue img {
  height: 100%;
  width: auto;
  object-fit: contain;
  opacity: 0.9;
}

@media (max-width: 1024px) {
  .thinkerStatue {
    height: 50%;
    right: -10vw;
    opacity: 0.4;
  }
}
`;
cssContent = cssContent.replace(blockToRemove, '');
fs.writeFileSync(cssPath, cssContent, 'utf8');

// 2. REVERT TSX
const tsxPath = 'src/components/Team/Team.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

const tsxBlockToRemove = `
      {/* Estátua do Pensador posicionada na direita */}
      <div className={styles.thinkerStatue}>
        <img src="/pensador_recortado.png" alt="O Pensador" />
      </div>`;
tsxContent = tsxContent.replace(tsxBlockToRemove, '');

fs.writeFileSync(tsxPath, tsxContent, 'utf8');

console.log('Successfully reverted Team section changes!');
