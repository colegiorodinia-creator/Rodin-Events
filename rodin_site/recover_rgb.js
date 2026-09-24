
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "public", "equipe");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".png"));

async function recover() {
  for (const file of files) {
    const inputPath = path.join(dir, file);
    try {
      // Remove the corrupted alpha channel by flattening it over a white background (or just extracting RGB)
      await sharp(inputPath).removeAlpha().toFile(inputPath + ".tmp");
      fs.renameSync(inputPath + ".tmp", inputPath);
      console.log(`Recuperado RGB de: ${file}`);
    } catch(e) {
      console.error(`Erro: ${file}`, e);
    }
  }
}
recover();

