
import {motion} from "framer-motion"
import m1  from "../assets/m1.PNG"
import m2  from "../assets/m2.PNG"
import w1  from "../assets/w1.PNG"
import w2  from "../assets/w2.PNG" 


const testimonials = [
  {
    name: "Sonu Kumar",
    role: "Pursuing Bachelor's of Technology - Marwadi University",
    review:
      "Ankur is a visionary developer. His attention to detail and creativity blew us away. Our project was a massive success because of him.",
    image: m1,
  },
  {
    name: "Sahil Kumar",
    role: "Full Stack developer  - at AimDek",
    review:
      "Working with Ankur was an absolute pleasure. He brings design and code together like magic. Highly recommend him!",
    image: m2,
  },
  {
    name: "Ranvijay Singh",
    role: "Final Year Student - B.Tech(Marwadi University)",
    review:
      "From concept to execution, Ankur handled everything flawlessly. His work ethic and innovation are unmatched.",
    image: m2,
  },
  {
    name: "Sahil Kumar",
    role: "Final Year Student - B.Tech(Marwadi University)",
    review:
      "Ankur transformed our outdated platform into something modern and powerful. His skills are world-class.",
    image: w2,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.h2 className="text-4xl font-bold mb-16"
        intial={{opacity : 0 , y : -50}}
        animate={{opacity : 1 , y : 0}}
        transition = {{duration : 0.6}}
      >
        What People Say
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl w-full">
        {testimonials.map((t,i)=>(
          <motion.div 
            key={t.name + 1}
            intial = {{opacity : 0 , y : 50}}
            whileInView={{opacity  : 1 , y : 0}}
            transition={{duration : 0.5,  delay  : i * 0.2}}
            viewport={{once : true}}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6  flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
          >
            <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full border-2  border-white/40 mb-4 object-cover" loading="lazy" />
            <p className="text-gray-200 italic mb-4">{t.review}</p>
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-400">{t.role}</p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
