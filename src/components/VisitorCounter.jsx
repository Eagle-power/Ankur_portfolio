// import { useEffect, useState } from "react";
// import { FaEye } from "react-icons/fa";

// let visitPromise = null;

// export default function VisitorCounter() {
//   const [visits, setVisits] = useState(0);

//   useEffect(() => {
//     if (!visitPromise) {
//       const cookieName = "has_visited_portfolio";
//       const hasVisited = getCookie(cookieName);

//       // const endpoint = hasVisited ? "/" : "/up";
//       // const apiUrl = `/api/visit${endpoint}`;

//       const apiUr = hasVisited ? "https://api.api-ninjas.com/v1/counter?id=portfolio"
//         : "https://api.api-ninjas.com/v1/counter?id=portfolio&hit=true";

//       // Start the request and store the Promise in our global variable
//       visitPromise = fetch(apiUrl, {
//         headers: {
//           "X-Api-Key": "[ENCRYPTION_KEY]"
//         }
//       })
//         .then((res) => {
//           const type = res.headers.get("content-type");
//           if (type && type.includes("text/html")) throw new Error("Got HTML");
//           if (!res.ok) throw new Error("Network error");
//           return res.json();  // if everything is ok 200
//         })
//         .then((data) => {
//           // Only set the cookie if we actually incremented
//           if (!hasVisited) {
//             setCookie(cookieName, "true", 365);
//           }
//           return data.count;
//         });
//     }

//     // 3. Consume the promise (whether it's new or cached)
//     visitPromise
//       .then((count) => setVisits(count))
//       .catch((err) => {
//         console.warn("Counter Error:", err);
//         setVisits(1200); // Fallback
//         visitPromise = null; // Reset on error so we can try again later
//       });
//   }, []);

//   if (!visits) return null;

//   return (
//     <div className="inline-flex items-center gap-2 mt-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium text-gray-200 shadow-lg hover:bg-white/20 transition-all">
//       <FaEye className="text-[#00bf8f]" />
//       <span>{visits.toLocaleString()} Visitors</span>
//     </div>
//   );
// }

// // --- Helper Functions ---
// function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   const expires = "expires=" + d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//   const name = cname + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") c = c.substring(1);
//     if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
//   }
//   return "";
// }



import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

let visitPromise = null;

export default function VisitorCounter() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const cookieName = "has_visited_portfolio";
    const hasVisited = getCookie(cookieName);

    const storedCount = localStorage.getItem("visitor_count");

    // ✅ Show cached value instantly (fast UI)
    if (storedCount) {
      setVisits(Number(storedCount));
    }

    if (!visitPromise) {
      const apiUrl = hasVisited
        ? "/.netlify/functions/visit"
        : "/.netlify/functions/visit?hit=true";

      visitPromise = fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          if (!data || data.error) {
            throw new Error("Invalid response");
          }

          const count = data.value || 0;

          // ✅ update cookie if first visit
          if (!hasVisited) {
            setCookie(cookieName, "true", 365);
          }

          // ✅ update UI with fresh value
          setVisits(count);

          // ✅ update cache
          localStorage.setItem("visitor_count", count);

          return count;
        });
    }

    visitPromise.catch(() => {
      setVisits((prev) => prev || 1200);
      visitPromise = null;
    });
  }, []);

  return (
    <div className="inline-flex items-center gap-2 mt-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium text-gray-200 shadow-lg hover:bg-white/20 transition-all">
      <FaEye className="text-[#00bf8f]" />
      <span>{visits.toLocaleString()} Visitors</span>
    </div>
  );
}

// --------------------
// Cookie Helpers
// --------------------

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

  document.cookie =
    cname + "=" + cvalue + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}