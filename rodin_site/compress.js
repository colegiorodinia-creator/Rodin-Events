const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function findLargeImages(dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(findLargeImages(file));
        } else {
            if (stat.size > 2 * 1024 * 1024 && /\.(png|jpg|jpeg)$/i.test(file)) {
                results.push(file);
            }
        }
    });
    return results;
}

async function compressAll() {
    const files = findLargeImages(path.join(__dirname, 'public'));
    for (const file of files) {
        console.log('Compressing', file);
        const buffer = fs.readFileSync(file);
        const tempPath = file + '.tmp';
        try {
            await sharp(buffer).jpeg({ quality: 60 }).toFile(tempPath);
            fs.unlinkSync(file);
            fs.renameSync(tempPath, file);
            console.log('Done', file);
        } catch(e) { console.error(e); }
    }
}
compressAll();