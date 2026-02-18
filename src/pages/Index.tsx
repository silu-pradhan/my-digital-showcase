import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Code2, Database, Globe, Mail, Github, Linkedin, ExternalLink,
  ChevronDown, Award, Briefcase, User, Sparkles, Terminal, Layers,
  Download, FileText
} from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpeg";
import deltaCertificate from "@/assets/delta-certificate.png";
import dataScienceCertificate from "@/assets/data-science-certificate.jpg";

// ─── Animation Variants ───
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const }
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

// ─── Section Wrapper ───
const Section = ({ children, id, className = "" }: { children: React.ReactNode; id: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id={id} ref={ref} className={`relative py-20 md:py-28 ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </section>
  );
};

// ─── Data ───
const navLinks = ["About", "Skills", "Projects", "Certifications", "Contact"];

const skills = [
  { name: "JavaScript", icon: <Code2 size={22} /> },
  { name: "Node.js", icon: <Terminal size={22} /> },
  { name: "React", icon: <Code2 size={22} /> },
  { name: "Express.js", icon: <Terminal size={22} /> },
  { name: "MongoDB", icon: <Database size={22} /> },
  { name: "Python", icon: <Code2 size={22} /> },
  { name: "SQL", icon: <Database size={22} /> },
  { name: "TypeScript", icon: <Code2 size={22} /> },
  { name: "HTML/CSS", icon: <Globe size={22} /> },
  { name: "Docker", icon: <Layers size={22} /> },
  { name: "Git", icon: <Layers size={22} /> },
  { name: "Java", icon: <Code2 size={22} /> },
  { name: "NumPy", icon: <Code2 size={22} /> },
  { name: "Pandas", icon: <Database size={22} /> },
  { name: "Matplotlib", icon: <Layers size={22} /> },
  { name: "Scikit-Learn", icon: <Sparkles size={22} /> },
];

const projects = [
  {
    title: "Real-Time Collaborative Code Sharing",
    description: "Real-time collaborative code-sharing platform using Node.js and Socket.IO with room-based WebSocket communication and chat functionality.",
    tech: ["Node.js", "Express", "MongoDB", "React", "Socket.IO"],
    link: "#",
  },
  {
    title: "DilDraw",
    description: "A collaborative drawing application where users can create rooms and draw shapes, sketch ideas, and collaborate in real-time with others on a shared canvas.",
    tech: ["React", "Canvas API", "Socket.IO", "Node.js"],
    link: "#",
  },
  {
    title: "Blood Vault",
    description: "Centralized Blood Bank Management System with real-time inventory tracking, automated request workflows, and JWT-based role access control.",
    tech: ["Node.js", "Express", "MongoDB", "React"],
    link: "#",
  },
  {
    title: "NeoMeet",
    description: "A real-time video call and chat application where multiple users can join rooms, talk, and collaborate with each other seamlessly.",
    tech: ["WebRTC", "Node.js", "Socket.IO", "React"],
    link: "#",
  },
];

const certifications = [
  {
    title: "Alpha Delta – Full Stack Web Development",
    issuer: "Apna College",
    link: deltaCertificate,
  },
  {
    title: "The Ultimate Job Ready Data Science Course",
    issuer: "Code With Harry",
    link: dataScienceCertificate,
  },
];

// ─── Floating Particles ───
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/30"
        initial={{
          x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
          y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
        }}
        animate={{
          y: [null, Math.random() * -200 - 100],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: Math.random() * 4 + 3,
          repeat: Infinity,
          repeatType: "loop",
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>
);

// ─── Rotating Role Text ───
const roles = ["Backend Developer", "Full Stack Developer", "Data Science Enthusiast"];
const RotatingText = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="font-display inline-block h-8 relative overflow-hidden">
      <motion.span
        key={index}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-primary block"
      >
        {roles[index]}
      </motion.span>
    </span>
  );
};

// ─── Skill Icon Card ───
const SkillIcon = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <div className="group glass rounded-xl p-4 flex flex-col items-center gap-2 cursor-default shrink-0 mx-2 hover:scale-110 transition-transform duration-300">
    <span className="text-primary group-hover:text-[hsl(200,70%,50%)] transition-colors duration-300">{icon}</span>
    <span className="font-display text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">{name}</span>
  </div>
);

// ─── Marquee Row ───
const MarqueeRow = ({ items, direction = "left" }: { items: typeof skills; direction?: "left" | "right" }) => (
  <div className="relative overflow-hidden py-2">
    <motion.div
      className="flex w-max"
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map((skill, i) => (
        <SkillIcon key={`${skill.name}-${i}`} name={skill.name} icon={skill.icon} />
      ))}
    </motion.div>
  </div>
);

// ─── Main Component ───
const Index = () => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-[hsl(200,70%,50%)] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 glass"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.span
            className="font-display text-lg font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            &lt;SP /&gt;
          </motion.span>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-display relative group"
                whileHover={{ y: -2 }}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Particles />
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(174 60% 45% / 0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />
        </motion.div>
        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[120px] bg-primary/20"
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[100px] bg-[hsl(200,70%,50%,0.15)]"
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -60, 0], scale: [1, 0.8, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full blur-[80px] bg-[hsl(280,60%,50%,0.1)]"
          animate={{ x: [0, 30, -30, 0], y: [0, -30, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-primary font-display">
              <Sparkles size={14} className="animate-pulse" />
              Available for hire
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-6"
          >
            <img
              src={profilePhoto}
              alt="Santanu Pradhan"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-primary/40 shadow-lg"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-display mb-6 leading-tight"
          >
            Hi, I'm{" "}
            <span className="text-gradient">Santanu Pradhan</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-muted-foreground mb-8"
          >
            <RotatingText />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(174 60% 45% / 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm font-medium"
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="/santanu-resume.pdf"
              download="Santanu_Pradhan_Resume.pdf"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(200 70% 50% / 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg glass text-foreground font-display text-sm font-medium inline-flex items-center gap-2 border border-primary/30"
            >
              <Download size={16} />
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >
            <motion.a
              href="#about"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-muted-foreground hover:text-primary transition-colors inline-block"
            >
              <ChevronDown size={28} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* About */}
        <Section id="about">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="text-primary"># </span>About Me
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-[hsl(200,70%,50%)] rounded-full mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm Santanu Pradhan, a B.Tech CST student at Nalanda Institute of Technology, Bhubaneswar (CGPA 8.3). I specialize in backend development with Node.js, Express, and MongoDB.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Previously interned as a Backend Developer at SLK Software, building scalable REST APIs, authentication systems, and database solutions. Passionate about real-time applications and open source.
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-2xl p-6 glow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(45,90%,55%)]" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(140,60%,50%)]" />
                  <span className="ml-2 text-xs text-muted-foreground font-display">about.tsx</span>
                </div>
                <pre className="text-sm font-display leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-[hsl(200,70%,50%)]">const</span>{" "}
                    <span className="text-[hsl(45,90%,55%)]">developer</span>{" "}
                    <span className="text-muted-foreground">=</span> {`{`}{"\n"}
                    {"  "}<span className="text-primary">name</span>: <span className="text-[hsl(140,60%,50%)]">"Santanu Pradhan"</span>,{"\n"}
                    {"  "}<span className="text-primary">role</span>: <span className="text-[hsl(140,60%,50%)]">"Backend Developer"</span>,{"\n"}
                    {"  "}<span className="text-primary">passion</span>: <span className="text-[hsl(140,60%,50%)]">"Building scalable APIs"</span>,{"\n"}
                    {"  "}<span className="text-primary">learning</span>: <span className="text-[hsl(45,90%,55%)]">true</span>,{"\n"}
                    {"  "}<span className="text-primary">coffee</span>: <span className="text-[hsl(45,90%,55%)]">Infinity</span>{"\n"}
                    {`}`};
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills">
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              <span className="text-primary"># </span>Skills
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-[hsl(200,70%,50%)] rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground max-w-md mx-auto">Technologies and tools I work with</p>
          </motion.div>
          <div className="space-y-4">
            <MarqueeRow items={skills.slice(0, 8)} direction="left" />
            <MarqueeRow items={skills.slice(8)} direction="right" />
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects">
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              <span className="text-primary"># </span>Projects
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-[hsl(200,70%,50%)] rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground max-w-md mx-auto">Some of my recent work</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group glass rounded-2xl p-6 block cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <Code2 size={24} className="text-primary" />
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-display px-2 py-1 rounded-md bg-primary/10 text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section id="certifications">
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              <span className="text-primary"># </span>Certifications
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-[hsl(200,70%,50%)] rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground max-w-md mx-auto">Recognized achievements & credentials</p>
          </motion.div>
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            {certifications.map((cert, i) => (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ x: 8, boxShadow: "0 0 30px -5px hsl(174 60% 45% / 0.2)" }}
                className="group glass rounded-xl p-5 flex items-center gap-4 cursor-pointer"
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                  whileHover={{ rotate: 10 }}
                >
                  <Award size={24} className="text-primary" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors truncate">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </motion.a>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="text-primary"># </span>Get In Touch
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-[hsl(200,70%,50%)] rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground mb-10 max-w-md mx-auto">
                Have a project in mind or just want to say hi? Feel free to reach out!
              </p>
            </motion.div>

            <motion.div
              variants={scaleIn}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 glow"
            >
              <motion.a
                href="mailto:santanupradhan599@gmail.com"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(174 60% 45% / 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-display text-sm font-medium mb-8"
              >
                <Mail size={18} />
                Say Hello
              </motion.a>

              <div className="flex items-center justify-center gap-6 mt-4">
                {[
                  { icon: <Github size={22} />, href: "https://github.com/santanupradhan", label: "GitHub" },
                  { icon: <Linkedin size={22} />, href: "https://linkedin.com/in/santanupradhan", label: "LinkedIn" },
                  { icon: <Mail size={22} />, href: "mailto:santanupradhan599@gmail.com", label: "Email" },
                ].map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-sm transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground font-display">
            &lt; Built with <span className="text-primary">❤</span> /&gt;
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
