const fs = require('fs');
const path = 'src/components/Programs/Programs.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /title: "Itiner.+rios Formativos Eletivos",/g,
  'title: <>Itinerários<br/>formativos eletivos</>,'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully added line break to Itinerarios title!');
