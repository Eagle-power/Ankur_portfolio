import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Show banner after a small delay (0.5s) so it feels smooth
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Save consent in localStorage so we don't ask again
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 p-6 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl flex flex-col gap-4 transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🍪</span>
        <p className="text-sm text-gray-300 leading-relaxed">
          I use cookies to count unique visitors and improve your experience. No
          personal data is collected!
        </p>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setIsVisible(false)}
          className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
