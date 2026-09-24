import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Statement from "@/components/Statement/Statement";
import Programs from "@/components/Programs/Programs";
import Courses from "@/components/Courses/Courses";
import Event from "@/components/Event/Event";
import Team from "@/components/Team/Team";
import Highlight from "@/components/Highlight/Highlight";
import Footer from "@/components/Footer/Footer";

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
