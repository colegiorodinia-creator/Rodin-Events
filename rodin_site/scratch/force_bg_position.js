const fs = require('fs');

const tsxPath = 'src/components/Programs/Programs.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Adiciona bgPosition aos dados
tsxContent = tsxContent.replace(
  'thumbUrl: "/extracurriculares/thumb/thumb_video2.png",',
  'thumbUrl: "/extracurriculares/thumb/thumb_video2.png", bgPositionMobile: "30% center",'
);

// Modifica o estilo inline do thumbnailLayer para aceitar o bgPositionMobile
tsxContent = tsxContent.replace(
  /style=\{\{\s*backgroundImage: `url\('\$\{prog\.thumbUrl\}'\)`\s*\}\}/,
  "style={{ backgroundImage: `url('${prog.thumbUrl}')`, backgroundPosition: (typeof window !== 'undefined' && window.innerWidth <= 768 && prog.bgPositionMobile) ? prog.bgPositionMobile : 'center' }}"
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');

console.log('Forced bg position via inline style');
