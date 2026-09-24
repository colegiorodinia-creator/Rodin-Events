const fs = require('fs');

const tsxPath = 'src/components/QuemSomos/Infraestrutura.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Add handle functions
const handleFns = `  const visibleCount = 4; // Mostra 4 fotos por vez

  const handlePrev = () => {
    setActiveIndex((prev) => {
      const nextIdx = Math.max(0, prev - 1);
      setStartIndex((currStart) => {
        if (nextIdx < currStart) return nextIdx;
        return currStart;
      });
      return nextIdx;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const nextIdx = Math.min(infraData.length - 1, prev + 1);
      setStartIndex((currStart) => {
        if (nextIdx >= currStart + visibleCount) return nextIdx - visibleCount + 1;
        return currStart;
      });
      return nextIdx;
    });
  };`;

tsxContent = tsxContent.replace(/  const visibleCount = 4; \/\/ Mostra 4 fotos por vez/, handleFns);

// Update Up arrow (prev)
const oldUpArrow = `        <div \n          className={\`\${styles.arrow} \${startIndex === 0 ? styles.disabled : ''}\`}\n          onClick={() => setStartIndex(Math.max(0, startIndex - 1))}\n        >`;
const newUpArrow = `        <div \n          className={\`\${styles.arrow} \${activeIndex === 0 ? styles.disabled : ''}\`}\n          onClick={handlePrev}\n        >`;
tsxContent = tsxContent.replace(oldUpArrow, newUpArrow);

// Update Down arrow (next)
const oldDownArrow = `        <div \n          className={\`\${styles.arrow} \${startIndex >= infraData.length - visibleCount ? styles.disabled : ''}\`}\n          onClick={() => setStartIndex(Math.min(infraData.length - visibleCount, startIndex + 1))}\n        >`;
const newDownArrow = `        <div \n          className={\`\${styles.arrow} \${activeIndex >= infraData.length - 1 ? styles.disabled : ''}\`}\n          onClick={handleNext}\n        >`;
tsxContent = tsxContent.replace(oldDownArrow, newDownArrow);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');
console.log('Successfully updated arrow click behavior in Infraestrutura!');
