const fs = require('fs');
const path = require('path');

// 1. Update Event.tsx
const eventTsxPath = path.join(__dirname, 'src', 'components', 'Event', 'Event.tsx');
let content = fs.readFileSync(eventTsxPath, 'utf8');

content = content.replace(/desc: "(.*?)"/g, 'desc: "$1",\n      videoUrl: "#"');

const buttonHtml = `<p className={styles.desc}>
            {mediaItems[activeIndex].desc}
          </p>
          {mediaItems[activeIndex].videoUrl && (
            <a 
              href={mediaItems[activeIndex].videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.watchButton}
            >
              ASSISTA O VÍDEO COMPLETO
            </a>
          )}`;

content = content.replace(/<p className=\{styles\.desc\}>[\s\S]*?<\/p>/, buttonHtml);

fs.writeFileSync(eventTsxPath, content);
console.log('Updated Event.tsx');

// 2. Update Event.module.css
const eventCssPath = path.join(__dirname, 'src', 'components', 'Event', 'Event.module.css');
const cssToAppend = `
.watchButton {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 10px 24px;
  background-color: var(--rodin-orange);
  color: var(--rodin-white);
  font-family: var(--font-headline);
  font-size: var(--fs-button);
  font-weight: 700;
  text-decoration: none;
  border-radius: 30px;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.watchButton:hover {
  background-color: #d95e00;
  transform: translateY(-2px);
}
`;

fs.appendFileSync(eventCssPath, cssToAppend);
console.log('Updated Event.module.css');
