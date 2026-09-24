const fs = require('fs');

const tsxPath = 'src/components/Highlight/Highlight.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Modifica as classes problemáticas adicionando estilos inline responsivos através do uso de useWindowSize ou inline simples
// Como não temos um hook pronto de resize na mão, vamos apenas forçar o font-size no CSS e rezar?
// Não, vamos aplicar inline styles direto nos elementos. Para responsividade, clamp() é mágico no inline style.

tsxContent = tsxContent.replace(
  /<h2 className=\{styles\.testimonyName\}>\{activeItem\.name\}<\/h2>/,
  '<h2 className={styles.testimonyName} style={{ fontSize: "clamp(2rem, 5vw, 4rem)", whiteSpace: "normal", wordBreak: "break-word", textAlign: "center", width: "100%", left: "0", transform: "none" }}>{activeItem.name}</h2>'
);

tsxContent = tsxContent.replace(
  /<p className=\{styles\.testimonyQuote\}>"\{activeItem\.quote\}"<\/p>/,
  '<p className={styles.testimonyQuote} style={{ fontSize: "clamp(1rem, 3vw, 1.3rem)", textAlign: "center" }}>"{activeItem.quote}"</p>'
);

// E a position do overlay?
tsxContent = tsxContent.replace(
  /<div className=\{styles\.textOverlay\}>/,
  '<div className={styles.textOverlay} style={{ width: "90vw", maxWidth: "100%", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 5vw" }}>'
);

// Vamos tirar o "left: 8%" e coisas assim do module.css para não conflitar se possível, ou o inline já ganha.
// O inline já ganha de tudo.

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Forced inline styles in TSX');
