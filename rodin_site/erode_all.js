
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "public", "equipe");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".png") && !f.includes("_eroded"));

async function erodeImage(file) {
  const inputPath = path.join(dir, file);
  try {
    const img = sharp(inputPath).ensureAlpha();
    const metadata = await img.metadata();
    
    // Convert to raw buffer
    const rawBuffer = await img.raw().toBuffer();
    
    // Extract Alpha channel manually from the buffer
    const alphaRaw = Buffer.alloc(metadata.width * metadata.height);
    for (let i = 0, j = 0; i < rawBuffer.length; i += 4, j++) {
      alphaRaw[j] = rawBuffer[i + 3];
    }
    
    // Erode it
    const erodedAlpha = await sharp(alphaRaw, { raw: { width: metadata.width, height: metadata.height, channels: 1 } })
      .blur(2)
      .threshold(160) // Not too harsh, 160 is good
      .raw()
      .toBuffer();
      
    // Put back the new Alpha
    for (let i = 0, j = 0; i < rawBuffer.length; i += 4, j++) {
      rawBuffer[i + 3] = erodedAlpha[j];
    }
    
    await sharp(rawBuffer, { raw: { width: metadata.width, height: metadata.height, channels: 4 } }).png().toFile(inputPath + ".tmp");
    fs.renameSync(inputPath + ".tmp", inputPath);
    console.log(`Sucesso: ${file}`);
  } catch(e) {
    console.error(`Erro no ${file}:`, e.message);
  }
}

async function runAll() {
  for (const file of files) {
    await erodeImage(file);
  }
}
runAll();

