const fs = require('fs');
const path = 'src/components/Programs/Programs.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix the style tag
content = content.replace(
  /<style jsx>\{@media \(max-width: 768px\) \{ \.mobile-thumb-1 \{ background-image: url\('\/extracurriculares\/thumb\/thumb_video2_mobile\.png'\) !important; background-position: center !important; \} \}\}<\/style>/,
  '<style>{`@media (max-width: 768px) { .mobile-thumb-1 { background-image: url("/extracurriculares/thumb/thumb_video2_mobile.png") !important; background-size: cover !important; background-position: center !important; } }`}</style>'
);

// Fix the className
content = content.replace(
  /className=\{styles\.thumbnailLayer\} \{i === 1 \? 'mobile-thumb-1' : ''\}/,
  'className={`${styles.thumbnailLayer} ${i === 1 ? "mobile-thumb-1" : ""}`}'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed JSX syntax error');
