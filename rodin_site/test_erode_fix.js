
const sharp = require("sharp");

async function erodeImage(inputPath, outputPath) {
  try {
    const img = sharp(inputPath);
    const metadata = await img.metadata();
    
    // Extract raw alpha channel
    const alphaRaw = await img.extractChannel(3).raw().toBuffer();
    
    // Process it
    const erodedAlpha = await sharp(alphaRaw, { raw: { width: metadata.width, height: metadata.height, channels: 1 } })
      .blur(2)
      .threshold(180) // 180 is high, so it will erode a lot
      .raw()
      .toBuffer();
      
    // Remove alpha from original, and add the new one
    await img.removeAlpha().joinChannel(erodedAlpha, { raw: { width: metadata.width, height: metadata.height, channels: 1 } }).toFile(outputPath);
    console.log("Sucesso!");
  } catch(e) {
    console.error("Erro:", e);
  }
}

erodeImage("public/equipe/Diego.png", "public/equipe/Diego_eroded.png");

