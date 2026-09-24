
const sharp = require("sharp");
const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");

async function recover() {
  try {
    // 1. Remove corrupted alpha -> creates black background
    await sharp("public/equipe/Diego.png").removeAlpha().toFile("public/equipe/Diego_flat.png");
    
    // 2. Run AI on the flat image
    const blob = await removeBackground("public/equipe/Diego_flat.png");
    const buffer = Buffer.from(await blob.arrayBuffer());
    
    // 3. Save as recovered
    fs.writeFileSync("public/equipe/Diego_recovered.png", buffer);
    console.log("Sucesso na recuperação do Diego!");
  } catch(e) {
    console.error(e);
  }
}
recover();

