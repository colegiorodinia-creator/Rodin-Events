const fs = require('fs');
const file = 'src/components/Courses/Courses.tsx';
let code = fs.readFileSync(file, 'utf8');
const search = /<svg className=\{styles\.iconArrow\}.*?<\/svg>\s*Saiba mais/gs;
const replace = `SAIBA MAIS
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px', marginLeft: '10px' }}>
                          <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
                          <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
                        </svg>`;
code = code.replace(search, replace);
fs.writeFileSync(file, code);
