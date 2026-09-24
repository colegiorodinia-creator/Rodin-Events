const fs = require('fs');

const cssPath = 'src/components/Hero/Hero.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const newMobileCss = `
@media (max-width: 768px) {
  .hero {
    padding: 0 1rem;
    align-items: center;
    text-align: center;
  }
  .bgImage {
    background-position: right center; /* Foca na menina (lado direito da foto) */
  }
  .content {
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 15vh;
  }
  .title {
    font-size: 3rem;
  }
  .cta {
    width: 100%;
    justify-content: center;
    padding: 1rem 1rem;
    font-size: 0.9rem;
  }
}
`;

// Replace the existing @media block that I appended earlier
cssContent = cssContent.replace(
  /@media \(max-width: 768px\) \{\n  \.hero \{\n    padding: 0 1rem;\n    align-items: center;\n    text-align: center;\n  \}\n  \.content \{\n    align-items: center;\n  \}\n  \.title \{\n    font-size: 3rem;\n  \}\n  \.cta \{\n    width: 100%;\n    justify-content: center;\n    padding: 1rem 1rem;\n    font-size: 0\.9rem;\n  \}\n\}/,
  newMobileCss.trim()
);

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully updated Hero mobile layout (background-position and content pushed down)!');
