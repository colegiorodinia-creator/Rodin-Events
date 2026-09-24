const fs = require('fs');
let c = fs.readFileSync('rodin_site/src/components/Event/Event.tsx', 'utf8');

const regex = /<div \s*className=\{styles\.mobileCardImg\}\s*style=\{\{ backgroundImage: `url\('\$\{item\.srcMobile \|\| item\.src\}'\)` \}\}\s*><\/div>\s*<h3 className=\{styles\.mobileCardTitle\}>\{item\.title\}<\/h3>\s*\{item\.videoUrl && \(\s*<a \s*href=\{item\.videoUrl\} \s*target=\{item\.videoUrl !== "#" \? "_blank" : undefined\}\s*rel="noopener noreferrer" \s*className=\{styles\.mobileWatchButton\}\s*onClick=\{\(e\) => \{ if \(item\.videoUrl === "#"\) e\.preventDefault\(\); \}\}\s*>\s*ASSISTA O V[^<]*COMPLETO\s*<\/a>\s*\)\}/;

const rep = `<div className={styles.mobileCardImg} style={{ backgroundImage: \`url('\${item.srcMobile || item.src}')\` }}> <div className={styles.mobileCardOverlay}> <h3 className={styles.mobileCardTitle}>{item.title}</h3> {item.videoUrl && ( <a href={item.videoUrl} target={item.videoUrl !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className={styles.mobileWatchButton} onClick={(e) => { if (item.videoUrl === "#") e.preventDefault(); }}> ASSISTA O V?DEO COMPLETO </a> )} </div> </div>`;

c = c.replace(regex, rep);
fs.writeFileSync('rodin_site/src/components/Event/Event.tsx', c);
