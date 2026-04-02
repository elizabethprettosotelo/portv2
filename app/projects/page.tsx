import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AllProjects from "../components/allprojects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full">
      <Navbar />
      <main
        className="flex-1 pt-16 md:pt-0 overflow-x-hidden max-w-full"
        style={{ marginLeft: "var(--sidebar-width, 0px)" }}
      >
        <AllProjects />
      </main>
      <Footer />
    </div>
  );
}
