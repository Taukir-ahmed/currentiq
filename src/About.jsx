import React from 'react';
import { Link } from 'react-router-dom';

const Feature = ({ icon, title, description, accent }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 ${accent}`}>
      {icon}
    </div>
    <h3 className="font-black text-[#1a2e4c] text-base mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="max-w-3xl mx-auto pb-12">

      {/* Hero */}
      <section className="bg-[#1a2e4c] text-white rounded-3xl p-10 mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">About CA Weekly</p>
        <h1 className="text-4xl font-black leading-tight mb-4">
          Stay sharp on current affairs —<br />
          <span className="text-orange-400">without paying a fortune.</span>
        </h1>
        <p className="text-gray-300 text-base leading-relaxed max-w-xl">
          CA Weekly is a focused current affairs platform built for serious learners. We deliver
          the same quality of preparation tools that premium coaching apps charge hundreds for —
          completely streamlined and accessible.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Our Mission</p>
        <h2 className="text-2xl font-black text-[#1a2e4c] mb-4">
          Premium prep, no subscription wall.
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Big coaching platforms have turned current affairs preparation into a subscription game —
          paywalling flashcards, locking quiz banks, and selling watered-down summaries as premium
          content. We believe that anyone preparing for competitive exams deserves access to
          high-quality, structured material without a monthly fee eating into their budget.
        </p>
        <p className="text-gray-600 leading-relaxed">
          CA Weekly curates, formats, and delivers current affairs every week in three powerful
          formats that complement each other — so you retain more in less time.
        </p>
      </section>

      {/* What We Offer */}
      <section className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">What We Offer</p>
        <h2 className="text-2xl font-black text-[#1a2e4c] mb-6">Three tools. One goal.</h2>

        <div className="grid grid-cols-1 gap-4">
          <Feature
            icon="⚡"
            accent="bg-orange-100"
            title="Flashcards — Active Recall"
            description="Every week's current affairs distilled into high-yield question-answer pairs. Study by category, enable retry mode so tricky cards loop back, and track exactly how many you nailed on the first try. No bloat — just the facts that matter for your exam."
          />
          <Feature
            icon="🎯"
            accent="bg-blue-100"
            title="Practice Quiz — MCQ Bank"
            description="Multiple-choice questions modelled on the pattern of real competitive exams. Choose how many questions to attempt, set a timer or go at your own pace, then review every answer with detailed explanations. Each week's quiz is fresh and exam-relevant."
          />
          <Feature
            icon="📖"
            accent="bg-teal-100"
            title="Focus Module — Smart Digest"
            description="The Focus Module is our take on the traditional current affairs magazine — rebuilt from scratch. Instead of dense paragraphs that bury the important points, we separate key facts, tag each story by category (Polity, Economy, International, Science, etc.), and format everything for quick, structured reading. Think of it as a magazine that already did the highlighting for you."
          />
        </div>
      </section>

      {/* Why CA Weekly */}
      <section className="bg-[#f0f4f8] rounded-3xl p-8 mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Why CA Weekly</p>
        <h2 className="text-2xl font-black text-[#1a2e4c] mb-6">Built different, on purpose.</h2>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'No login required', sub: 'Jump straight in. Your study time is precious.' },
            { label: 'Weekly updates', sub: 'Fresh content every week, timed to exam cycles.' },
            { label: 'Category-tagged', sub: 'Filter by topic — Polity, Economy, World, and more.' },
            { label: 'Exam-pattern MCQs', sub: 'Questions written the way exams actually ask them.' },
            { label: 'Retry until you know it', sub: 'Flashcard retry mode keeps weak cards in rotation.' },
            { label: 'No paywalls', sub: 'Every feature on this platform is free to use.' },
          ].map(({ label, sub }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-black text-[#1a2e4c] text-sm mb-1">{label}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
        <h2 className="text-2xl font-black text-[#1a2e4c] mb-3">Start studying. Right now.</h2>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          No sign-up. No credit card. No tutorial to sit through.<br />
          Pick a week and go.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link
            to="/flashcard"
            className="bg-[#1a2e4c] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#112036] transition-colors"
          >
            Start Flashcards
          </Link>
          <Link
            to="/quiz"
            className="bg-orange-50 text-orange-600 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-100 transition-colors"
          >
            Take a Quiz
          </Link>
          <Link
            to="/read"
            className="bg-teal-50 text-teal-700 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-teal-100 transition-colors"
          >
            Read Focus Module
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
