import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Conference Paper", "AI / NLP Research", "Data Science", "Teaching"];
  const filteredProyek = activeCategory === "All"
    ? listProyek
    : listProyek.filter(p => p.category === activeCategory);

  const handleProjectClick = (project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";
    if (isReload) {
      const baseUrl = window.location.origin + "/myportofolioacadmicmeg/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO ── */}
        <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
          <div className="animate__animated animate__fadeInUp animate__delay-3s">
            <div className="flex items-center gap-3 mb-6 bg bg-zinc-800 w-fit p-4 rounded-2xl">
              <img src="./assets/headshot.jpg" className="w-10 rounded-md object-cover object-top" style={{ height: "40px" }} />
              <q>Building AI that supports — not replaces — human agency</q>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <ShinyText text="Hi, I'm Shun Ching Hsieh" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="M.Ed. researcher at NCCU Taiwan, working at the intersection of human-centered AI, collaborative learning, and educational technology. Applying for HCI PhD programs in 2026."
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-6"
            />
            <div className="flex items-center sm:gap-4 gap-2">
              <a
                href="mailto:megan1001m@gmail.com"
                className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
              >
                <ShinyText text="Contact Me" disabled={false} speed={3} className="custom-class" />
              </a>
              <a href="#project" className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors">
                <ShinyText text="View Research" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>
          </div>

          <div className="md:ml-auto animate__animated animate__fadeInUp animate__delay-4s">
            <ProfileCard
              name="Shun Ching Hsieh"
              title="HCI Researcher · NCCU"
              handle="shunchingresearch"
              status="Open to PhD"
              contactText="Get in Touch"
              avatarUrl="./assets/headshot.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.location.href = 'mailto:megan1001m@gmail.com'}
            />
          </div>
        </div>

        {/* ── ABOUT ── */}
        <div
          className="mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-teal-500/40 shadow-[0_0_30px_rgba(31,151,166,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6"
          id="about"
        >
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8"
            data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"
          >
            {/* Left column */}
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-teal-500/30">
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">About Me</h2>
                <BlurText
                  text="I'm an M.Ed. student in Educational Technology at National Chengchi University (NCCU), Taiwan. My research combines transformer fine-tuning, RAG architecture, and prompt engineering with learning sciences theory — Knowledge Building, SSRL, and the OECD Learning Compass 2030 — plus hands-on K–12 classroom practicum. I'm pursuing a PhD in HCI to design AI systems where the interface between human cognition and machine intelligence is transparent, controllable, and educationally grounded."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-base md:text-lg leading-relaxed mb-10 text-gray-300"
                />
                <div className="flex flex-wrap gap-3 mb-4">
                  {["Film", "Design", "Fitness", "Hiking"].map(label => (
                    <span key={label} className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-sm text-zinc-300">
                      {label}
                    </span>
                  ))}
                </div>
                <ShinyText
                  text="Design AI that amplifies human intelligence, not replaces it."
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-teal-400"
                />
              </div>
            </div>

            {/* Right column — Lanyard */}
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </div>

        {/* ── SKILLS ── */}
        <div className="tools mt-32">
          <h1 className="text-4xl/snug font-bold mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            Technical Skills &amp; Methods
          </h1>
          <div className="mt-10 flex flex-col gap-8">
            {listTools.map((group, gi) => (
              <div key={group.category} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={gi * 100} data-aos-once="true">
                <p className="text-xs font-semibold tracking-widest uppercase text-teal-400 mb-3">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(name => (
                    <span key={name} className="px-3 py-1.5 text-sm text-zinc-200 bg-zinc-800/70 border border-zinc-700 rounded-full hover:border-teal-500/60 hover:text-teal-300 transition-colors duration-200">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROJECTS ── */}
        <div className="proyek mt-32 py-10" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div>
        <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
          Research &amp; Projects
        </h1>
        <p className="text-base/loose text-center opacity-50 mb-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
          Conference Papers · AI / NLP · Data Science · Teaching
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="350" data-aos-once="true">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-teal-500/20 border-teal-400 text-teal-300"
                  : "bg-zinc-800/60 border-zinc-700 text-zinc-400 hover:border-zinc-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="proyek-box">
          <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
            <ChromaGrid
              items={filteredProyek}
              onItemClick={handleProjectClick}
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>

        {/* ── CONTACT ── */}
        <div className="kontak mt-32 sm:p-10 p-0" id="contact">
          <h1
            className="text-4xl mb-2 font-bold text-center"
            data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"
          >
            Get in Touch
          </h1>
          <p
            className="text-base/loose text-center mb-10 opacity-50"
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true"
          >
            Interested in my research or HCI PhD opportunities?
          </p>

          <div className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto">
            {/* Info cards */}
            <div className="flex-1 flex flex-col gap-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
              {[
                { label: "Email", value: "megan1001m@gmail.com", href: "mailto:megan1001m@gmail.com" },
                { label: "GitHub", value: "github.com/Megan123123", href: "https://github.com/Megan123123" },
                { label: "Institution", value: "NCCU · Taipei, Taiwan", href: "#" },
                { label: "Status", value: "Open to HCI PhD 2026", href: "#" },
              ].map(c => (
                <a key={c.label} href={c.href}
                  className="flex flex-col p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-teal-500/60 transition-colors no-underline">
                  <span className="text-xs text-zinc-500 mb-1">{c.label}</span>
                  <span className="text-sm font-medium text-teal-400">{c.value}</span>
                </a>
              ))}
            </div>

            {/* Contact form */}
            <div className="flex-1">
              <form
                action="https://formsubmit.co/megan1001m@gmail.com"
                method="POST"
                className="bg-zinc-800 p-10 w-full rounded-md"
                autoComplete="off"
                data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Full Name</label>
                    <input type="text" name="Name" placeholder="Your name..." className="border border-zinc-500 p-2 rounded-md" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email</label>
                    <input type="email" name="Email" placeholder="your@email.com" className="border border-zinc-500 p-2 rounded-md" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold">Message</label>
                    <textarea name="message" id="message" cols="45" rows="7" placeholder="Your message..." className="border border-zinc-500 p-2 rounded-md" required></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full w-full cursor-pointer border border-gray-700 hover:bg-[#222] transition-colors"
                    >
                      <ShinyText text="Send Message" disabled={false} speed={3} className="custom-class" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}

export default App;
