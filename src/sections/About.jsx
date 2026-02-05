import { motion } from "framer-motion";
import p from "../assets/p1.jpg";

export default function About() {
  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
  ];

  const stats = [
    { label: "Experience", value: "4-Month Internship" },
    { label: "Speciality", value: "MERN Full Stack" },
    { label: "Focus", value: "Performance & UX" },
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* Glow ball area */}
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10  lg:px-12 py-20 flex flex-col gap-12">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* image section */}
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] 
                                 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br 
                                 from-[#1cd8d2]/20 to-[#302b63]/20 border 
                                 border-[#1cd8d2]/25"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <img src={p} alt="Profile photo" className="absolute inset-0" />
          </motion.div>

          {/* Naming section */}
          <div className="flex flex-1 flex-col justify-center text-center md:text-left">
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent
                           bg-gradient-to-r from-[#1cd8d2] via-[#01936e] to-[#1cd8d2] "
            >
              Ankur Kumar
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Full Stack Developer | Software Engineer
            </p>
            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl [&_span]:text-[rgb(14,203,176)] [&_span]:font-semibold [&_span]:tracking-widest">
              I build scalable, modern application with a strong focus on clean
              architecture, delightful UX, and performance. My toolkit spans{" "}
              <span>C</span>,<span> Java</span>, <span> React</span>,{" "}
              <span>Node.js</span>, <span>Express.js</span>,{" "}
              <span>Tailwind CSS</span>, <span>MongoDB</span>,{" "}
              <span>MySql</span> and
              <span> RESTful APIs</span> - bringing ideas to life from concept
              to production with robust APIs and smooth interfaces.
            </p>

            {/* stats section - 3 box */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{s.label}</div>
                  <div className="text-base font-semibold">{s.value}</div>
                </motion.div>
              ))}
            </div>

            {/* button */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#project"
                className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 text-white bg-white/10 px-5 py-3 hover:bg-white/20 transition"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        {/* about me section */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            Aspiring Software Engineer with strong skills in MERN, and MySQL
            along with hands-on experience with real world projects, seeking to
            build scalable web solutions. Passionate about clean code, version
            control, and modern web development practices
          </p>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            I love turning ideas into scalable, user-friendly products that make
            an impact
          </p>
        </motion.div>
      </div>
    </section>
  );
}
