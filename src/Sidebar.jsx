import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const getNavClass = (path) => {
    return location.pathname === path
      ? "bg-[#242424] text-white px-4 py-3 rounded-xl font-medium transition-colors"
      : "text-gray-400 hover:text-white hover:bg-[#242424] px-4 py-3 rounded-xl font-medium transition-colors";
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={[
      'w-64 bg-[#141414] text-white flex flex-col justify-between p-6 shrink-0 h-screen',
      'fixed top-0 left-0 z-30 transition-transform duration-300 ease-in-out',
      'md:relative md:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ].join(' ')}>

      {/* Close button — mobile only */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Top Section: Logo & Main Nav */}
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-wide flex items-center gap-1">
            <span>CA</span>
            <span className="text-orange-500">Weekly</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">
            High-Yield Digest
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          <Link to="/" className={getNavClass('/')} onClick={handleLinkClick}>Home</Link>
          <Link to="/quiz" className={getNavClass('/quiz')} onClick={handleLinkClick}>Quiz</Link>
          <Link to="/flashcard" className={getNavClass('/flashcard')} onClick={handleLinkClick}>Flashcards</Link>
          <Link to="/read" className={getNavClass('/read')} onClick={handleLinkClick}>Read</Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">

        <a
          href="#"
          className="flex items-center gap-3 bg-[#242424] hover:bg-[#2e2e2e] rounded-xl p-4 transition-colors group"
        >
          <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.18 23.5c.3.17.65.19.97.07l11.65-11.57L12.36 8.5 3.18 23.5zm15.34-12.93L15.6 9l-3.24 3.24 3.24 3.24 2.94-1.58c.84-.45.84-1.59-.02-2.33zM3.03.58C2.7.87 2.5 1.32 2.5 1.9v20.2c0 .58.2 1.03.53 1.32L3.18.5l-.15.08zm9.33 11.42L3.18.5l11.65 11.57-2.47-3.07z"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold leading-none mb-1">Coming Soon</p>
            <p className="text-white font-bold text-sm leading-tight">Get the App</p>
            <p className="text-gray-400 text-[11px] mt-0.5">Google Play Store</p>
          </div>
        </a>

        <div className="bg-[#242424] rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-semibold mb-1">This Week</p>
          <p className="font-bold text-white mb-1">May Week 2</p>
          <p className="text-sm text-orange-500 font-medium">3 items new</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 px-1 mt-2">
          <Link to="/about" className="text-[10px] font-medium text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider" onClick={handleLinkClick}>About</Link>
          <Link to="/privacy" className="text-[10px] font-medium text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider" onClick={handleLinkClick}>Privacy</Link>
          <Link to="/support" className="text-[10px] font-medium text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider" onClick={handleLinkClick}>Support</Link>
          <Link to="/terms" className="text-[10px] font-medium text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider" onClick={handleLinkClick}>Terms</Link>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
