
const fs = require("fs");
const path = require("path");

const destDir = path.join(__dirname, "public", "equipe");
const srcDir = "C:\\Users\\equip\\MHC Dropbox\\COMERCIAL E MARKETING\\COMPARTILHADA\\MARKETING\\2026\\Fotos e Vídeos\\Professores - Site\\Professores 2026";

const destFiles = fs.readdirSync(destDir).filter(f => f.endsWith(".png") && !f.includes("_"));
const srcFiles = fs.readdirSync(srcDir).filter(f => f.endsWith(".png"));

let count = 0;
for (const dFile of destFiles) {
  let sFile = srcFiles.find(f => f === dFile);
  if (!sFile) {
    if (dFile === "Emerson.png") sFile = "Emerson Bastos.png";
  }
  
  if (sFile) {
    const sPath = path.join(srcDir, sFile);
    const dPath = path.join(destDir, dFile);
    fs.copyFileSync(sPath, dPath);
    count++;
  } else {
    console.log("Não achou source para:", dFile);
  }
}
console.log(`Restaurados ${count} arquivos.`);

