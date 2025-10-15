import React from 'react';

const Footer = () => {
  return (
  <footer className="bg-gradient-to-t from-black via-zinc-900 to-black text-gray-300 py-6 mt-6 border-t border-zinc-800">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0 text-sm">© {new Date().getFullYear()} Rusil Koirala</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/rusilkoirala" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.125-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.044.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.244 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.622-5.475 5.92.43.372.814 1.102.814 2.222 0 1.606-.014 2.903-.014 3.296 0 .32.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            <span className="hidden sm:inline text-sm">GitHub</span>
          </a>
          <a href="https://twitter.com/rusilkoirala" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sky-400 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.5 2a4.48 4.48 0 00-4.5 4.5c0 .35.04.7.11 1.03A12.94 12.94 0 013 4.15s-4 9 5 13a13 13 0 01-8 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            <span className="hidden sm:inline text-sm">Twitter</span>
          </a>
          <a href="https://rusilkoirala.com.np/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-rose-400 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5V18h-2v-1.5a4 4 0 010-7V6h2v3.5a4 4 0 010 7z"/></svg>
            <span className="hidden sm:inline text-sm">Website</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
