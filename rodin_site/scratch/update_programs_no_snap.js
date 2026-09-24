const fs = require('fs');
const path = 'src/components/Programs/Programs.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `    // Configuração de Scroll Discreto ("tudo de uma vez")
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

const replacementStr = `    // Configuração de Scroll por Gatilhos Discretos
    // Removemos o "snap" da barra de rolagem, que estava brigando com a animação.
    // Assim que passar do limite, a animação vai até o fim de uma vez.
    const totalScroll = 600;

    // Pin do container
    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "top top",
      end: \`+=\${totalScroll}\`,
    });

    // Trigger Slide 2
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top+=100 top",
      onEnter: () => gsap.to(sections[1], { yPercent: 0, duration: 0.7, ease: "power2.out", overwrite: true }),
      onLeaveBack: () => gsap.to(sections[1], { yPercent: 100, duration: 0.7, ease: "power2.in", overwrite: true })
    });

    // Trigger Slide 3
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top+=300 top",
      onEnter: () => gsap.to(sections[2], { yPercent: 0, duration: 0.7, ease: "power2.out", overwrite: true }),
      onLeaveBack: () => gsap.to(sections[2], { yPercent: 100, duration: 0.7, ease: "power2.in", overwrite: true })
    });`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Programs.tsx updated successfully without snap conflict!');
} else {
  console.log('Target string not found. Please verify the file contents.');
}
