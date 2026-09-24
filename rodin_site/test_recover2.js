
const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");

async function recover() {
  try {
    const blob = await removeBackground("public/equipe/Diego.png");
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync("public/equipe/Diego_recovered.png", buffer);
    console.log("Sucesso!");
  } catch(e) {
    console.error("Erro:", e);
  }
}
recover();

