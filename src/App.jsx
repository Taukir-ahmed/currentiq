import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Quiz from './Quiz';
import Flashcards from './Flashcard';
import Read from './Read';
import About from './About';
import Privacy from './Privacy';
import Terms from './Terms';
import Support from './Support';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-[#f7f5f0] font-sans text-slate-800">

        {/* Mobile backdrop overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile top bar */}
          <header className="md:hidden flex items-center justify-between bg-[#141414] px-4 py-3 shrink-0">
            <h1 className="text-xl font-black tracking-wide flex items-center gap-1">
              <span className="text-white">CURRENT</span>
              <span className="text-orange-500">IQ</span>
            </h1>
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white p-1"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </header>

          <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/flashcard" element={<Flashcards />} />
              <Route path="/read" element={<Read />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </main>
        </div>

      </div>
    </Router>
  );
}

export default App;
