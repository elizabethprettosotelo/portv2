import About from "../components/about";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full bg-[#F3EDE2]">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-0 overflow-x-hidden max-w-full bg-[#F3EDE2]" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
        <About
          // Hero
          name="Eli Pretto-Sotelo"
          tagline="UI/UX Designer & Frontend Developer"
          
          // Bio
          bio={`Hi! I'm Eli, a designer and developer who loves creating beautiful, functional digital experiences.

I combine my background in UX design with frontend development skills to bridge the gap between design and code. I believe the best products come from understanding both sides of the process.`}
          
          // Skills
          skills={[
            {
              category: "Design",
              items: [
                "UI/UX Design",
                "Prototyping",
                "Design Systems",
                "User Research",
                "Figma",
                "Adobe Creative Suite",
              ],
            },
            {
              category: "Development",
              items: [
                "React / Next.js",
                "TypeScript",
                "HTML/CSS",
                "Tailwind CSS",
                "Git & GitHub",
                "Responsive Design",
              ],
            },
            {
              category: "Process",
              items: [
                "Agile Methodologies",
                "Design Thinking",
                "Wireframing",
                "Accessibility (a11y)",
                "Cross-functional Teams",
                "Documentation",
              ],
            },
          ]}
          
          // Interests
          interests={[
            "Photography",
            "Coffee Culture",
            "Hiking",
            "Reading",
            "Cooking",
            "Travel",
          ]}
          

          // Books
          books={[
            { title: "Circe", author: "Madeline Miller", cover: "/ABOUT/books/circe.jpg" },
            { title: "The Namesake", author: "Jhumpa Lahiri", cover: "/ABOUT/books/thenamesake.jpg" },
            { title: "War and Peace", author: "Leo Tolstoy", cover: "/ABOUT/books/warandpeace.jpg" },
            { title: "Yerba Buena", author: "Nina LaCour", cover: "/ABOUT/books/yerbabuena.jpg" },
            { title: "I'm Glad My Mom Died", author: "Jennette McCurdy", cover: "/ABOUT/books/gladmymomdied.jpg" },
          ]}
          readingPhoto="/ABOUT/books/mereading.jpg"
          readingBlurb="I've been an avid reader since I was young — it was honestly one of the main ways I taught myself English. There's something about getting completely lost in a story that never gets old. My taste leans toward literary fiction and the occasional intimidatingly long classic (yes, I finished War and Peace). A few of my current favorites are below."

          // Community gallery
          communityCaption="Some of my favorite moments with the people I love."
          communityMedia={[
            { src: "/ABOUT/photo1.jpg", type: "image", alt: "community photo 1" },
            { src: "/ABOUT/photo2.jpg", type: "image", alt: "community photo 2" },
            { src: "/ABOUT/photo3.jpg", type: "image", alt: "community photo 3" },
            { src: "/ABOUT/photo4.jpg", type: "image", alt: "community photo 4" },
            { src: "/ABOUT/64066501c35a4e39b226424b0efd22fb.mp4", type: "video", caption: "A silly little reel we made for Knight Hacks. 🫶" },
            { src: "/ABOUT/insta_video_19673.mp4", type: "video", caption: "A day in the life as a TechRanger at UCF CDL." },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
