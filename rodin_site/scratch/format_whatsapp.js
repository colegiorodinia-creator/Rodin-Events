const fs = require('fs');

const tsxPath = 'src/components/ModalKit/ModalKit.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

const oldHandle = `  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove qualquer coisa que nǜo seja nǧmero
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setWhatsapp(onlyNums);
  };`;

const newHandle = `  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Pega apenas os números
    let value = e.target.value.replace(/\\D/g, '');
    
    // Limita a 11 números no máximo
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    
    // Formata no padrão (XX) XXXXX-XXXX
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = \`(\${value.substring(0, 2)})\`;
      if (value.length > 7) {
        formattedValue += \` \${value.substring(2, 7)}-\${value.substring(7)}\`;
      } else if (value.length > 2) {
        formattedValue += \` \${value.substring(2)}\`;
      }
    }
    
    setWhatsapp(formattedValue);
  };`;

// Replace handle function using string replace (in case of encoding issues with comments)
tsxContent = tsxContent.replace(
  /  const handleWhatsappChange = \(e: React\.ChangeEvent<HTMLInputElement>\) => \{[\s\S]*?setWhatsapp\(onlyNums\);\n  \};/,
  newHandle
);

// Update the placeholder
tsxContent = tsxContent.replace(
  /placeholder="Apenas n.meros \(Ex: 19999999999\)"/,
  'placeholder="(19) 99999-9999"'
);

// Add maxLength just in case, though the logic handles it
tsxContent = tsxContent.replace(
  /value=\{whatsapp\}/,
  'value={whatsapp} maxLength={15}'
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Successfully formatted WhatsApp field!');
