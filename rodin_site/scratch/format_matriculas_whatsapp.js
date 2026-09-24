const fs = require('fs');

const tsxPath = 'src/app/matriculas/page.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// 1. Add state variable
tsxContent = tsxContent.replace(
  /const \[isSubmitted, setIsSubmitted\] = useState\(false\);/,
  `const [isSubmitted, setIsSubmitted] = useState(false);\n  const [whatsapp, setWhatsapp] = useState("");`
);

// 2. Add handler function
const handlerFn = `  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\\D/g, '');
    
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    
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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {`;

tsxContent = tsxContent.replace(
  /  const handleSubmit = \(e: React\.FormEvent<HTMLFormElement>\) => \{/,
  handlerFn
);

// 3. Update the input
const oldInput = `<input type="tel" id="celular" name="celular" className={styles.input} required placeholder=" " />`;
const newInput = `<input type="tel" id="celular" name="celular" className={styles.input} required placeholder=" " value={whatsapp} onChange={handleWhatsappChange} maxLength={15} />`;

tsxContent = tsxContent.replace(oldInput, newInput);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Successfully added WhatsApp formatter to Matriculas page!');
