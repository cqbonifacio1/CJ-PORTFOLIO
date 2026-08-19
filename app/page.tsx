import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import ProjectsList from "@/components/sections/ProjectsList";
import Disciplines from "@/components/sections/Disciplines";
import Ending from "@/components/sections/Ending";

export default function Home() {
  return (
    <Preloader>
      <Nav startElongated />
      <main>
        <Hero />
        <About />
        <Experience />
        <ProjectsList />
        <Disciplines />
        <Ending />
      </main>
    </Preloader>
  );
}