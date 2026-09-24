
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dir = path.join(__dirname, "public", "equipe");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".png"));

async function processImages() {
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, "trans_" + file);
    
    try {
      const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      
      for (let i = 0; i < data.length; i += info.channels) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // Se for muito proximo de branco
        if (r > 240 && g > 240 && b > 240) {
          data[i+3] = 0; // Alpha = 0 (transparente)
        }
      }
      
      await sharp(data, {
        raw: {
          width: info.width,
          height: info.height,
          channels: info.channels
        }
      }).png().toFile(inputPath); // Substitui a original
      
      console.log(`Processado: ${file}`);
    } catch (e) {
      console.error(`Erro no ${file}:`, e);
    }
  }
}
processImages();

