import { useState } from "react";
import emailjs from "@emailjs/browser";
import ParticlesBackground  from "../components/ParticlesBackground";
import {motion} from "framer-motion";
import Astra from "../assets/Astra.png" 

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;


export default function Contact() {
  const [formData , setFormData] = useState({
    name  : "",
    email : "",
    service:"",
    budget :"",
    idea   :""
  })

  const [error , setError] = useState({});
  const [status , setStatus] = useState("");

  const handleChange = (e)=>{
    const {name , value} = e.target;
    if(name === "budget" &&  value && !/^\d+$/.test(value)) return;
    setFormData((p)=>({...p  , [name] : value}))
    if(error[name]) setError((p)=>({...p , [name] : ""}))
  }

  const validateForm = () =>{
    const required = ["name" , "email" , "service" , "idea"];
    const newErrors = {};
    required.forEach((f)=>  !formData[f].trim() && (newErrors[f] = "Fill this field"))

    if(formData.service !== "other" && !formData.budget.trim()){
      newErrors.budget = "fill this field"
    }
    setError(newErrors);

    return !Object.keys(newErrors).length;
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!validateForm()) return;
    setStatus("sending");
    
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name : formData.name,
          reply_to :  formData.email
        }, 
        PUBLIC_KEY
      );
      setStatus("success")
      setFormData({name : "", email : "", service  : "", budget : "",idea : ""})
    } catch (err) {
      console.log("EmailJs Error : ", err)
      setStatus("Something went Wrong")
    }
  }

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white 
                py-20 px-6 md:px-20  flex flex-col md:flex-row items-center gap-10"
    >
      <ParticlesBackground />
      <div className="relative z-10 w-full flex flex-col  md:flex-row items-center gap-10">
        <motion.div className="w-full md:w-1/2 flex  justify-center"
          intial={{opacity : 0 , x :-50}}
          whileInView={{opacity : 1 ,x : 0}}
          transition={{duration : 0.6}}
        >
          <motion.img src={Astra} alt="Contact Person"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{y:[0,-10,0]}}  
            transition={{duration : 2 , repeat : Infinity , ease : "easeInOut"}}
          />
        </motion.div>
        
        <motion.div className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
          intial={{opacity : 0 , x : 50}}
          whileInView={{opacity : 1 , x : 0}}
          transition ={{duration : 0.6}}
        >
          <h2 className="text-3xl font-bold mb-6">
            Let's Build something Awesome ❤️
          </h2>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-1">Your Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="name"  
                placeholder="Your name" 
                value={formData.name} 
                onChange={handleChange}
                className={`p-3 rounde-md bg-white/10 border ${error.name ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              />
              {error.name  && <p className="text-red-500 text-xs">{error.name}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Your Email <span className="text-red-500">*</span></label>
              <input type="text"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounde-md bg-white/10 border ${error.email ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              />
              {error.email  && <p className="text-red-500 text-xs">{error.email}</p>} 
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Service Needed <span className="text-red-500">*</span></label>
              <select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounde-md bg-white/10 border ${error.service ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500 [&_option]:!text-black`}
              >
                <option value="" disabled>Something in mind ?</option>
                <option value="Web Developement">Web Developement</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Others">Others</option>

              </select>
              {error.service  && <p className="text-red-500 text-xs">{error.service}</p>} 
            </div>
            {
              formData.service && formData.service !== "Others" &&  (
                <div className="flex flex-col">
                  <label className="mb-1">Budget <span className="text-red-500">*</span></label>
                  <input type="text"
                    name="budget"
                    placeholder="Your budget"
                    onChange={handleChange}
                    value={formData.budget}
                    className={`p-3 rounde-md bg-white/10 border ${error.budget ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
                  />
                  {error.budget && <p className="text-red-500 text-xs">{error.budget}</p>}

                </div>
              )
            }
            <div className="flex flex-col">
              <label className="mb-1">Explain your Idea <span className="text-red-500">*</span></label>
              <textarea name="idea" 
                rows={5}
                placeholder="Enter your Idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounde-md bg-white/10 border ${error.idea ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              ></textarea>
              {error.idea && <p className="text-xs text-red-500">{error.idea}</p>} 
            </div>
            {
              status && (
                <p className={`text-sm ${status === "success" ? "text-green-500" : status === "error" ? "text-red-500" : "text-yellow-400"}`}>
                  {status === "sending" ? "sending..." : status === "success" ? "Message sent successfully✅" : "Something went wrong ❌ "}
                </p>
              )
            }

            <motion.button className="bg-blue-600 hover:bg-blue-700  disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
              whileHover={{scale : 1.05}}
              whileTap={{scale : 0.95}}
              disabled={status === "sending"}
              type="submit"
            >
              {status === "sending" ? "sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
