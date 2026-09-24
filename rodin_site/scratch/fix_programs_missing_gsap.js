const fs = require('fs');
const path = 'src/components/Programs/Programs.tsx';
let content = fs.readFileSync(path, 'utf8');

const useGsapBlock = `
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const sections = gsap.utils.toArray("." + styles.tiktokSection) as HTMLElement[];
    // Inicialmente esconde os slides 2 e 3 empurrando-os para baixo
    gsap.set(sections.slice(1), { yPercent: 100 });

    let currentIndex = 0;

    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "top top",
      end: "+=1200", // Distância para rolagem
      onUpdate: (self) => {
        const progress = self.progress;
        
        let targetIndex = 0;
        if (progress > 0.6) targetIndex = 2;
        else if (progress > 0.2) targetIndex = 1;

        if (targetIndex !== currentIndex) {
           if (targetIndex > currentIndex) {
             gsap.to(sections[targetIndex], { yPercent: 0, duration: 1.2, ease: "power3.inOut", overwrite: true });
           } else {
             gsap.to(sections[currentIndex], { yPercent: 100, duration: 1.2, ease: "power3.inOut", overwrite: true });
           }
           currentIndex = targetIndex;
        }
      }
    });
  }, { scope: containerRef });
`;

// Insert the block right before "const onReady ="
if (!content.includes('useGSAP(() => {')) {
  content = content.replace(
    /const onReady =/g,
    `${useGsapBlock}\n  const onReady =`
  );
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully inserted useGSAP block!');
} else {
  console.log('useGSAP already exists!');
}
