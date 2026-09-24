const fs = require('fs');

const cssPath = 'src/components/Hero/Hero.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// The block we want to replace looks like this:
/*
  .cta {
    align-self: center;
    margin-top: auto !important; /* Empurra o botão brutalmente pro fundo * /
  }
*/

const targetRegex = /\.cta\s*\{\s*align-self: center;\s*margin-top: auto !important;[^\}]*\}/;

const newBlock = `.cta {
    align-self: center;
    margin-top: auto !important;
    padding: 1rem 1.5rem;
    font-size: 0.85rem;
    white-space: nowrap !important;
    width: auto !important;
    display: inline-flex !important;
    align-items: center !important;
    flex-wrap: nowrap !important;
  }`;

cssContent = cssContent.replace(targetRegex, newBlock);

fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Force applied button nowrap');
