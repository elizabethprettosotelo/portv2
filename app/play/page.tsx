import Navbar from "../components/navbar";
import UnderConstruction from "../components/wip";

export default function PlayPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full bg-[#8EB522]">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-0 overflow-x-hidden max-w-full" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
        <UnderConstruction />
      </main>
    </div>
  );
}

