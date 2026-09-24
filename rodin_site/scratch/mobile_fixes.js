const fs = require('fs');

const cssToAppend = {
  'src/app/globals.css': `
@media (max-width: 768px) {
  :root {
    --fs-hero-title: 3.5rem; /* Ajustado para nǜo quebrar na tela pequena */
    --fs-section-title: 2.2rem;
  }
}
`,
  'src/components/Hero/Hero.module.css': `
@media (max-width: 768px) {
  .hero {
    padding: 0 1rem;
    align-items: center;
    text-align: center;
  }
  .content {
    align-items: center;
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
`,
  'src/components/Event/Event.module.css': `
@media (max-width: 768px) {
  .eventSection {
    flex-direction: column;
    justify-content: center;
    padding: 10vh 5vw;
  }
  .content {
    align-self: center;
    align-items: center;
    text-align: center;
    margin-top: 2rem;
  }
  .carouselContainer {
    margin-top: 0;
    transform: scale(0.8);
  }
}
`,
  'src/components/Team/Team.module.css': `
@media (max-width: 768px) {
  .teamSection {
    padding: 4rem 1rem;
  }
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .cardsGrid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .title {
    font-size: 2rem;
  }
}
`,
  'src/components/Highlight/Highlight.module.css': `
@media (max-width: 768px) {
  .highlightSection {
    flex-direction: column;
    justify-content: flex-end;
    padding: 2vh 5vw 10vh 5vw;
  }
  .textOverlay {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    margin-bottom: 2rem;
    text-align: center;
  }
  .textHeader {
    flex-direction: column;
    text-align: center;
  }
  .carouselContainer {
    flex-direction: column;
  }
  .thumbsGrid {
    justify-content: center;
  }
  .playCenter {
    top: 30%;
  }
}
`,
  'src/components/Footer/Footer.module.css': `
@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    padding: 3rem 2rem;
    text-align: center;
  }
  .contactInfo, .navLinks, .logoSection {
    align-items: center;
  }
}
`
};

for (const [file, content] of Object.entries(cssToAppend)) {
  if (fs.existsSync(file)) {
    let fileContent = fs.readFileSync(file, 'utf8');
    if (!fileContent.includes('@media (max-width: 768px) {')) {
       // if it doesn't have it, just append
       fs.writeFileSync(file, fileContent + content, 'utf8');
    } else {
       // if it already has one, append it at the end anyway, CSS will cascade
       fs.writeFileSync(file, fileContent + content, 'utf8');
    }
    console.log('Appended to', file);
  }
}
