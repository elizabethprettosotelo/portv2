import FeaturedProjects from "./components/featuredprojects";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Add other sections here above projects */}
        <FeaturedProjects />
      </main>
      <Footer />
    </div>
  );
}
