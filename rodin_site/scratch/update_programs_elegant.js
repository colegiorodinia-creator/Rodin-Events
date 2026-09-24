const fs = require('fs');

// 1. REVERT CSS to absolute stacking
const cssPath = 'src/components/Programs/Programs.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /\.tiktokContainer {[\s\S]*?display: none;\n}/,
  `.tiktokContainer {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}`
);

cssContent = cssContent.replace(
  /\.tiktokTrack {[\s\S]*?flex-direction: column;\n}/,
  `.tiktokTrack {
  width: 100vw;
  height: 100vh;
  position: relative;
}`
);

cssContent = cssContent.replace(
  /\.tiktokSection {[\s\S]*?z-index: 2;\n}/,
  `.tiktokSection {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.8);
  z-index: 2;
}`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

// 2. REVERT AND UPDATE TSX with the flawless onUpdate logic
const tsxPath = 'src/components/Programs/Programs.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// remove data-lenis-prevent
tsxContent = tsxContent.replace(/ data-lenis-prevent="true"/g, '');

const useGsapBlock = `
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const sections = gsap.utils.toArray("." + styles.tiktokSection) as HTMLElement[];
    gsap.set(sections.slice(1), { yPercent: 100 });

    let currentIndex = 0;

    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "top top",
      end: "+=1200", // Distância suave
      onUpdate: (self) => {
        const progress = self.progress;
        
        let targetIndex = 0;
        if (progress > 0.6) targetIndex = 2;
        else if (progress > 0.2) targetIndex = 1;

        if (targetIndex !== currentIndex) {
           if (targetIndex > currentIndex) {
             // Descendo: anima a NOVA seção subindo
             gsap.to(sections[targetIndex], { yPercent: 0, duration: 1.2, ease: "power3.inOut", overwrite: true });
           } else {
             // Subindo: anima a seção ATUAL descendo de volta
             gsap.to(sections[currentIndex], { yPercent: 100, duration: 1.2, ease: "power3.inOut", overwrite: true });
           }
           currentIndex = targetIndex;
        }
      }
    });

  }, { scope: containerRef });
`;

// Insert useGSAP after the useEffect
tsxContent = tsxContent.replace(
  /(\}\);(?:[\s\n]*)(?=const onReady =))/g,
  `});\n${useGsapBlock}\n\n`
);

fs.writeFileSync(tsxPath, tsxContent, 'utf8');

console.log('Successfully applied smooth elegant GSAP thresholds!');
