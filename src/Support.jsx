import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'Is this app completely free?',
    a: 'Yes. Every feature — Flashcards, Quiz, and Focus Module — is free to use with no subscription, no paywall, and no hidden tier.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. There is no login, no sign-up, and no account of any kind. Open the app and start studying immediately.',
  },
  {
    q: 'How often is content updated?',
    a: 'Content is added on a weekly basis. Each new week brings fresh flashcards, new MCQs, and an updated Focus Module covering the most exam-relevant events of that week.',
  },
  {
    q: 'What topics does this app cover?',
    a: 'We cover topics relevant to competitive exams — Polity & Governance, Economy & Finance, International Relations, Science & Technology, Environment & Ecology, Sports, and more. Content is tagged by category so you can filter to what you need.',
  },
  {
    q: 'What is the Focus Module?',
    a: 'The Focus Module is our structured current affairs digest. Unlike a regular magazine or news summary, we separate the key facts, tag each item by topic, and format everything so the important points are immediately visible — no hunting through paragraphs.',
  },
  {
    q: 'How does Retry Mode work in Flashcards?',
    a: 'When Retry Mode is enabled, a "Retry ↩" button appears after you flip each card. If you\'re unsure about a card, tap Retry — it goes to the back of the queue and comes around again. Cards you mark "Got it ✓" are removed from the deck. The session ends only when every card has been answered correctly.',
  },
  {
    q: 'Can I filter flashcards by category?',
    a: 'Yes. On the Flashcard config screen before starting a session, you can select one or more categories (tags) to study. Leaving all categories unselected includes every card in the deck.',
  },
  {
    q: 'How does the quiz timer work?',
    a: 'On the Quiz config screen you can choose 1 min, 5 min, 10 min, or No Limit. If you pick a timer, a countdown appears during the quiz. When time runs out, all unanswered questions are marked as skipped and the result screen appears automatically.',
  },
  {
    q: 'Will my quiz scores or flashcard progress be saved?',
    a: 'Quiz scores are saved anonymously to track your progress over time. No personal information is stored — your data is not linked to any identity.',
  },
  {
    q: 'I found a mistake in the content. How do I report it?',
    a: 'Please reach out via email with the subject line "Content Error" and include the week, the question or card in question, and what you believe the correct information is. We review all reports and update content as needed.',
  },
];

const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-[#1a2e4c] transition-colors"
      >
        <span className="font-bold text-gray-800 text-sm leading-snug">{q}</span>
        <span
          className="text-gray-400 text-lg shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}
        >
          +
        </span>
      </button>
      {open && (
        <p className="text-sm text-gray-500 leading-relaxed pb-4 pr-8">{a}</p>
      )}
    </div>
  );
};

const Support = () => {
  return (
    <div className="max-w-2xl mx-auto pb-12">

      {/* Header */}
      <section className="bg-[#1a2e4c] text-white rounded-3xl p-8 mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Help Centre</p>
        <h1 className="text-3xl font-black mb-3">Support</h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          Find answers to common questions below, or reach out directly if you need something else.
        </p>
      </section>

      {/* Contact Card */}
      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-xl">
            ✉️
          </div>
          <div>
            <p className="font-black text-[#1a2e4c] text-sm mb-1">Email Us</p>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              For content errors, bugs, or anything else — drop us an email and we'll get back to you.
            </p>
            <a
              href="mailto:taukir.ahmad65@gmail.com"
              className="text-xs font-bold text-sky-500 hover:text-sky-700 transition-colors block truncate"
              title="taukir.ahmad65@gmail.com"
            >
              taukir.ahmad65@gmail.com →
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-xl">
            ⏱️
          </div>
          <div>
            <p className="font-black text-[#1a2e4c] text-sm mb-1">Response Time</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              We typically respond within 24–48 hours. Content correction reports are prioritised.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">FAQ</p>
        <h2 className="text-xl font-black text-[#1a2e4c] mb-6">Frequently Asked Questions</h2>
        <div>
          {faqs.map((item) => (
            <FAQ key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Also useful</p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/about"
            className="bg-white px-4 py-2 rounded-full text-sm font-bold text-gray-700 border border-gray-200 hover:border-gray-400 transition-colors"
          >
            About
          </Link>
          <Link
            to="/privacy"
            className="bg-white px-4 py-2 rounded-full text-sm font-bold text-gray-700 border border-gray-200 hover:border-gray-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="bg-white px-4 py-2 rounded-full text-sm font-bold text-gray-700 border border-gray-200 hover:border-gray-400 transition-colors"
          >
            Terms of Use
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Support;
