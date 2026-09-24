 "use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(curtainRef.current, { 
        opacity: 0, 
        duration: 0.6, 
        ease: "power2.out",
        onComplete: () => {
          if (curtainRef.current) {
            curtainRef.current.style.display = "none";
          }
        }
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      <div 
        ref={curtainRef} 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#F7F6F3",
          zIndex: 999999,
          pointerEvents: "none"
        }}
      />
      {children}
    </>
  );
}
