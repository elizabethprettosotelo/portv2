import FeaturedProjects from "../components/featuredprojects";
import Experiences from "../components/experiences";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full">
      <Navbar />
      {/* Add padding for left sidebar on desktop, top padding for mobile header */}
      <main className="flex-1 pt-16 md:pt-0 transition-all duration-300 overflow-x-hidden max-w-full" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
        {/* Hero Section */}
        <section id="hero" className="min-h-[50vh] flex items-center justify-center bg-linear-to-b from-[#B5AD21] to-[#F3EDE2] px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#45140C] font-formadjr mb-4">
              Eli Pretto-Sotelo
            </h1>
            <p className="text-xl md:text-2xl text-[#45140C]/80 font-formadjr">
              UI/UX Designer & Frontend Developer
            </p>
          </div>
        </section>

        <FeaturedProjects />
        <Experiences />
      </main>
      <Footer />
    </div>
  );
}
