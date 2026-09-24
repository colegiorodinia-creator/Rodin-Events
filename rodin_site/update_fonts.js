const fs = require('fs');
const path = require('path');

const replaceInFile = (file, replacements) => {
  const filePath = path.join(__dirname, 'src', 'components', file);
  if (!fs.existsSync(filePath)) { console.log('File not found:', filePath); return; }
  let content = fs.readFileSync(filePath, 'utf8');
  for (const r of replacements) {
    content = content.replace(r.search, r.replace);
  }
  fs.writeFileSync(filePath, content);
  console.log('Updated', file);
};

// Hero
replaceInFile('Hero/Hero.module.css', [
  { search: /font-size:\s*clamp\(3rem,\s*8vw,\s*6rem\);/g, replace: 'font-size: var(--fs-hero-title);' },
  { search: /font-size:\s*1\.2rem;/g, replace: 'font-size: var(--fs-button);' }
]);

// Statement
replaceInFile('Statement/Statement.module.css', [
  { search: /font-size:\s*3\.5rem;/g, replace: 'font-size: var(--fs-section-title);' },
  { search: /font-size:\s*1\.1rem;/g, replace: 'font-size: var(--fs-button);' }
]);

// Programs
replaceInFile('Programs/Programs.module.css', [
  { search: /font-size:\s*clamp\(2rem,\s*3\.5vw,\s*4rem\);/g, replace: 'font-size: var(--fs-section-title);' },
  { search: /font-size:\s*clamp\(1rem,\s*1\.2vw,\s*1\.3rem\);/g, replace: 'font-size: var(--fs-body);' },
  { search: /font-size:\s*1\.1rem;/g, replace: 'font-size: var(--fs-button);' }
]);

// Courses
replaceInFile('Courses/Courses.module.css', [
  { search: /font-size:\s*4rem;/g, replace: 'font-size: var(--fs-section-title);' },
  { search: /font-size:\s*1\.2rem;\s*\/\*.*?\*\//g, replace: 'font-size: var(--fs-card-title);' },
  { search: /font-size:\s*0\.85rem;\s*\/\*.*?\*\//g, replace: 'font-size: var(--fs-card-desc);' },
  { search: /font-size:\s*0\.9rem;/g, replace: 'font-size: var(--fs-button);' }
]);

// Team
replaceInFile('Team/Team.module.css', [
  { search: /font-size:\s*4rem;/g, replace: 'font-size: var(--fs-section-title);' },
  { search: /font-size:\s*1\.2rem;\s*\/\*.*?\*\//g, replace: 'font-size: var(--fs-card-title);' },
  { search: /font-size:\s*0\.85rem;/g, replace: 'font-size: var(--fs-card-desc);' },
  { search: /font-size:\s*0\.9rem;/g, replace: 'font-size: var(--fs-button);' }
]);

// Highlight
replaceInFile('Highlight/Highlight.module.css', [
  { search: /font-size:\s*3\.5rem;/g, replace: 'font-size: var(--fs-section-title);' },
  { search: /font-size:\s*1\.2rem;/g, replace: 'font-size: var(--fs-card-desc);' }
]);

// Event
replaceInFile('Event/Event.module.css', [
  { search: /font-size:\s*3\.5rem;/g, replace: 'font-size: var(--fs-section-title);' },
  { search: /font-size:\s*1\.2rem;/g, replace: 'font-size: var(--fs-body);' },
  { search: /font-size:\s*1\.5rem;/g, replace: 'font-size: var(--fs-card-title);' }
]);
