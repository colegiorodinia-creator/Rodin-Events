const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      // Replace green overlay tint with neutral grey tint over cimento queimado
      if (content.includes('rgba(26, 35, 33')) {
        content = content.replace(/rgba\(26,\s*35,\s*33/g, 'rgba(30, 30, 30');
        changed = true;
      }
      
      // Replace solid green backgrounds with cimento queimado
      if (content.includes('#1a2321')) {
        content = content.replace(/background-color:\s*#1a2321;/g, "background: linear-gradient(rgba(30, 30, 30, 0.8), rgba(30, 30, 30, 0.95)), url('/cimento-queimado.png'); background-size: cover; background-position: center; background-attachment: fixed;");
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'src'));
