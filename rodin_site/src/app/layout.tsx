import type { Metadata } from "next";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";

export const metadata: Metadata = {
  title: "Colégio Rodin",
  description: "A gente acredita que todo aluno tem potencial para ser o que quiser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href="/cursos/capa.webp" />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

// Cache bust 2
