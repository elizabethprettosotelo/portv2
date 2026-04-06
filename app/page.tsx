import FeaturedProjects from "./components/featuredprojects";
import Experiences from "./components/experiences";
import Skills from "./components/skills";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-0 overflow-x-hidden max-w-full bg-[#F3EDE2]" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
        <Hero />
        <FeaturedProjects />
        <Experiences />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
