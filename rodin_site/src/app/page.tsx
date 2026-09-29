import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import dynamic from 'next/dynamic';

const Statement = dynamic(() => import("@/components/Statement/Statement"));
const Programs = dynamic(() => import("@/components/Programs/Programs"));
const Courses = dynamic(() => import("@/components/Courses/Courses"));
const Event = dynamic(() => import("@/components/Event/Event"));
const Team = dynamic(() => import("@/components/Team/Team"));
const Highlight = dynamic(() => import("@/components/Highlight/Highlight"));
const Footer = dynamic(() => import("@/components/Footer/Footer"));

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <Statement />
      <Programs />
      <Courses />
      <div className={styles.mobileReorder}>
        <Event />
        <Team />
      </div>
      <Highlight />
      <Footer />
    </main>
  );
}

// Cache bust 2
