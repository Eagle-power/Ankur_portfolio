import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

export default function VisitorCounter() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const cookieName = "has_visited_portfolio";
    const hasVisited = getCookie(cookieName);

   
    const apiUrl = hasVisited
      ? "/api/visit" // Proxy to read-only
      : "/api/visit/up"; // Proxy to increment

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setVisits(data.count);
        if (!hasVisited) {
          setCookie(cookieName, "true", 365);
        }
      })
      .catch((err) => {
        console.warn("Counter error:", err);
        setVisits(1200);
      });
  }, []);

  if (!visits) return null;

  return (
    <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium text-gray-200 shadow-lg hover:bg-white/20 transition-all">
      <FaEye className="text-[#00bf8f]" />
      <span>{visits.toLocaleString()} Views</span>
    </div>
  );
}

// Helper functions  
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}
