const fs = require('fs');

const tsxPath = 'src/components/Programs/Programs.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Remove the invalid <style> tag
tsxContent = tsxContent.replace(
  /<style>\{`@media \(max-width: 768px\) \{ \.mobile-thumb-1 \{ background-image: url\("\/extracurriculares\/thumb\/thumb_video2_mobile\.png"\) !important; background-size: cover !important; background-position: center !important; \} \}`\}<\/style>\r?\n\s*/,
  ''
);

// Update className to use the CSS module class
tsxContent = tsxContent.replace(
  /className=\{`\$\{styles\.thumbnailLayer\} \$\{i === 1 \? "mobile-thumb-1" : ""\}`\}/,
  'className={`${styles.thumbnailLayer} ${i === 1 ? styles.mobileThumb1 : ""}`}'
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');

const cssPath = 'src/components/Programs/Programs.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const newCss = `
@media (max-width: 768px) {
  .mobileThumb1 {
    background-image: url('/extracurriculares/thumb/thumb_video2_mobile.png') !important;
    background-size: cover !important;
    background-position: center !important;
  }
}
`;

cssContent += newCss;
fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Fixed React correctly with CSS Modules');
