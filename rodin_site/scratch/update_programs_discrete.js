const fs = require('fs');
const path = 'src/components/Programs/Programs.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `    // Criando uma timeline para animar as seções de forma contínua com snap
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=400", // Distância curta para que "um toque" seja suficiente para passar
        scrub: 0.5, // Resposta mais imediata ao scroll
        snap: {
          snapTo: 1 / (sections.length - 1), // 0, 0.5, 1
          duration: { min: 0.2, max: 0.4 },
          ease: "power1.inOut"
        }
      }
    });

    // Passo 1: Slide 1 sobe
    tl.to(sections[1], { yPercent: 0, ease: "none" })
    // Passo 2: Slide 2 sobe
      .to(sections[2], { yPercent: 0, ease: "none" });`;

const replacementStr = `    // Configuração de Scroll Discreto ("tudo de uma vez")
    // Em vez de "scrub", usamos triggers independentes para animar os slides de uma vez.
    const totalScroll = 600;

    // Pin do container
    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "top top",
      end: \`+=\${totalScroll}\`,
      snap: {
        snapTo: [0, 0.5, 1], // Pontos de parada: 0px, 300px, 600px
        duration: 0.3,
        ease: "power2.inOut"
      }
    });

    // Trigger Slide 2 (quando passa de 100px)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top+=100 top",
      onEnter: () => gsap.to(sections[1], { yPercent: 0, duration: 0.6, ease: "power3.inOut" }),
      onLeaveBack: () => gsap.to(sections[1], { yPercent: 100, duration: 0.6, ease: "power3.inOut" })
    });

    // Trigger Slide 3 (quando passa de 400px)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top+=400 top",
      onEnter: () => gsap.to(sections[2], { yPercent: 0, duration: 0.6, ease: "power3.inOut" }),
      onLeaveBack: () => gsap.to(sections[2], { yPercent: 100, duration: 0.6, ease: "power3.inOut" })
    });`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Programs.tsx updated successfully!');
} else {
  console.log('Target string not found. Please verify the file contents.');
}
