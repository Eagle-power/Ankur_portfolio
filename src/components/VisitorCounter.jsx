import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

export default function VisitorCounter() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const namespace = "ankur-portfolio-v1"; 
    const key = "homepage_visits";

    // 1. Check if we are running locally
    const isLocal = window.location.hostname.includes("localhost") || window.location.hostname.includes("127.0.0.1");

    if (isLocal) {
      // If local, just set a fake number so you can see the UI design
      setVisits(100); 
    } else {
      // 2. Only hit the real API if we are in Production (on the internet)
      fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
        .then((res) => res.json())
        .then((data) => setVisits(data.count))
        .catch((err) => console.error("Counter Error:", err));
    }
  }, []);

  if (!visits) return null; 

  return (
    <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium text-gray-200 shadow-lg hover:bg-white/20 transition-all">
      <FaEye className="text-[#00bf8f]" /> 
      <span>{visits.toLocaleString()} Visitors</span>
    </div>
  );
}