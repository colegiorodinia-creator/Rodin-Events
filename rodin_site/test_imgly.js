
const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");

async function run() {
  try {
    const blob = await removeBackground("public/equipe/Carla.png");
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync("public/equipe/Carla.png", buffer);
    console.log("Sucesso Carla!");
  } catch(e) {
    console.error("Erro:", e);
  }
}
run();

