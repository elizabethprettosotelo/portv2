import Navbar from "../components/navbar";
import Footer from "../components/footer";
import UnderConstruction from "../components/wip";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full bg-[#FAF9F6]">
      <Navbar />
      <main className="site-main flex-1 pt-16 md:pt-0 overflow-x-hidden max-w-full bg-[#FAF9F6]" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
        <UnderConstruction />
      </main>
      <Footer />
    </div>
  );
}
