
const sharp = require("sharp");
const fs = require("fs");

async function erodeImage(inputPath, outputPath) {
  try {
    const img = sharp(inputPath);
    const metadata = await img.metadata();
    
    // Extrair o canal alpha
    const alpha = await img.extractChannel(3).toBuffer();
    
    // Erodil o alpha: blur e threshold
    const erodedAlpha = await sharp(alpha, { raw: { width: metadata.width, height: metadata.height, channels: 1 } })
      .blur(1.5)
      .threshold(128) // Ajuste o threshold para comer mais borda (maior = come mais)
      .raw()
      .toBuffer();
      
    // Juntar o novo alpha
    await img.joinChannel(erodedAlpha).toFile(outputPath);
    console.log("Sucesso!");
  } catch(e) {
    console.error("Erro:", e);
  }
}

erodeImage("public/equipe/Diego.png", "public/equipe/Diego_eroded.png");

