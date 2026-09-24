
const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "public", "equipe");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".png") && !f.includes("_eroded") && !f.includes("_flat") && !f.includes("_recovered"));

async function run() {
  for (const file of files) {
    try {
      const inputPath = "public/equipe/" + file;
      console.log(`Recuperando ${file}...`);
      const blob = await removeBackground(inputPath);
      const buffer = Buffer.from(await blob.arrayBuffer());
      fs.writeFileSync(inputPath, buffer);
      console.log(`Sucesso: ${file}`);
    } catch(e) {
      console.error(`Erro no ${file}:`, e.message);
    }
  }
}
run();

