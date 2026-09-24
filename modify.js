const fs = require('fs');
let c = fs.readFileSync('rodin_site/src/components/Highlight/Highlight.tsx', 'utf8');

c = c.replace('const [isMobile, setIsMobile] = useState(false);', 
'const [isMobile, setIsMobile] = useState(false);\n  const [touchStart, setTouchStart] = useState<number | null>(null);\n  const [touchEnd, setTouchEnd] = useState<number | null>(null);\n\n  const minSwipeDistance = 50;\n\n  const onTouchStart = (e: React.TouchEvent) => {\n    setTouchEnd(null);\n    setTouchStart(e.targetTouches[0].clientX);\n  };\n\n  const onTouchMove = (e: React.TouchEvent) => {\n    setTouchEnd(e.targetTouches[0].clientX);\n  };\n\n  const onTouchEndHandler = () => {\n    if (!touchStart || !touchEnd) return;\n    const distance = touchStart - touchEnd;\n    const isLeftSwipe = distance > minSwipeDistance;\n    const isRightSwipe = distance < -minSwipeDistance;\n    \n    if (isLeftSwipe) {\n      handleNext();\n    } else if (isRightSwipe) {\n      handlePrev();\n    }\n  };');

c = c.replace('<section className={styles.highlightSection} ref={containerRef}>',
'<section className={styles.highlightSection} ref={containerRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndHandler}>');

fs.writeFileSync('rodin_site/src/components/Highlight/Highlight.tsx', c);
