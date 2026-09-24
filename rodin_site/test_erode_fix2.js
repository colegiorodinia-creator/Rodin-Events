
const sharp = require("sharp");

async function erodeImage(inputPath, outputPath) {
  try {
    const img = sharp(inputPath).ensureAlpha();
    const metadata = await img.metadata();
    
    // Convert palette to actual RGBA buffer
    const rawBuffer = await img.raw().toBuffer();
    
    // Extract Alpha channel manually from the buffer
    const alphaRaw = Buffer.alloc(metadata.width * metadata.height);
    for (let i = 0, j = 0; i < rawBuffer.length; i += 4, j++) {
      alphaRaw[j] = rawBuffer[i + 3];
    }
    
    // Erode it
    const erodedAlpha = await sharp(alphaRaw, { raw: { width: metadata.width, height: metadata.height, channels: 1 } })
      .blur(2)
      .threshold(180)
      .raw()
      .toBuffer();
      
    // Put back the new Alpha
    for (let i = 0, j = 0; i < rawBuffer.length; i += 4, j++) {
      rawBuffer[i + 3] = erodedAlpha[j];
    }
    
    await sharp(rawBuffer, { raw: { width: metadata.width, height: metadata.height, channels: 4 } }).png().toFile(outputPath);
    console.log("Sucesso!");
  } catch(e) {
    console.error("Erro:", e);
  }
}

erodeImage("public/equipe/Diego.png", "public/equipe/Diego_eroded.png");

