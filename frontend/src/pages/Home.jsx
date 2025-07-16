// Home.jsx

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black font-geist">
      {/* Subtle grid background, always dark */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg className="w-full h-full opacity-10" style={{filter:'blur(1px)'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Spotlight/blurred light effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-[-120px] w-[700px] h-[400px] bg-white/10 blur-3xl rounded-full z-0 animate-pulse-slow" />
      {isLoggedIn ? (
        <div className="w-full flex flex-col items-center justify-center animate-fadein">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-satoshi text-center text-white drop-shadow-[0_2px_32px_rgba(0,0,0,0.8)] animate-hero-glow">Welcome, {user?.name || "User"}!</h1>
          <p className="text-gray-300 mb-8 font-inter text-center text-lg max-w-2xl">Manage your short links, view stats, and more.</p>
          <Dashboard />
        </div>
      ) : (
        <section className="flex flex-col items-center justify-center w-full py-32 animate-fadein relative z-10">
          <h1 className="text-7xl sm:text-8xl font-extrabold mb-6 font-satoshi text-center text-white drop-shadow-[0_2px_32px_rgba(0,0,0,0.8)] animate-hero-glow">Shortly</h1>
          <p className="text-2xl text-gray-200 mb-6 font-inter text-center max-w-2xl animate-fadein-slow">
            The <span className="font-bold text-white">craziest</span> way to shorten, manage, and share your links.<br/>
            <span className="text-gray-400">Lightning fast. Beautiful. Free. No sign-up required to try. <br/>Paste, shorten, and share instantly.</span>
          </p>
          <ul className="text-gray-400 text-lg mb-10 font-inter text-center space-y-1 animate-fadein-slow">
            <li>• Unlimited short links</li>
            <li>• Analytics for every link</li>
            <li>• One-click copy & share</li>
            <li>• No ads, no clutter, just speed</li>
          </ul>
          <a href="/register" className="inline-block bg-white text-black px-12 py-4 rounded-full font-satoshi text-2xl font-bold shadow-xl hover:scale-105 hover:bg-gray-200 transition-all duration-200 animate-bounce-slow">Get Started</a>
        </section>
      )}
    </div>
  );
};

export default Home;

/*
Add to your global CSS (e.g. index.css):
.animate-hero-glow {
  animation: hero-glow 2.5s ease-in-out infinite alternate;
}
@keyframes hero-glow {
  0% { text-shadow: 0 0 32px #fff, 0 0 64px #0ff; }
  100% { text-shadow: 0 0 64px #fff, 0 0 128px #0ff; }
}
.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(.4,0,.6,1) infinite;
}
@keyframes pulse-slow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
.animate-fadein-slow {
  animation: fadein 2.5s cubic-bezier(.4,0,.6,1) both;
}
.animate-bounce-slow {
  animation: bounce 2.5s infinite;
}
*/