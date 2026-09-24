import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function main() {
    console.log('Starting background removal...');
    try {
        const blob = await removeBackground('public/pensador_aluno.jpg');
        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync('public/pensador_aluno.png', buffer);
        console.log('Background removed successfully! Saved to public/pensador_aluno.png');
    } catch (err) {
        console.error('Error removing background:', err);
    }
}
main();
