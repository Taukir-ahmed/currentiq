import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];

const sortMonthsDesc = (months) =>
  [...months].sort((a, b) => {
    const al = a.toLowerCase(), bl = b.toLowerCase();
    const aM = MONTHS.findIndex(m => al.includes(m));
    const bM = MONTHS.findIndex(m => bl.includes(m));
    return bM - aM;
  });

const sortWeeksDesc = (weeks) =>
  [...weeks].sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.replace(/\D/g, '')) || 0;
    return numB - numA;
  });

const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

const groupByMonthWeek = (data) =>
  data.reduce((acc, item) => {
    const month = item.month || 'Unknown';
    const week = item.week || 'Unknown';
    if (!acc[month]) acc[month] = {};
    if (!acc[month][week]) acc[month][week] = [];
    acc[month][week].push(item);
    return acc;
  }, {});

const getLatestWeekInfo = (data) => {
  if (!data?.length) return null;
  const grouped = groupByMonthWeek(data);
  const latestMonth = sortMonthsDesc(Object.keys(grouped))[0];
  if (!latestMonth) return null;
  const latestWeek = sortWeeksDesc(Object.keys(grouped[latestMonth]))[0];
  const count = latestWeek ? grouped[latestMonth][latestWeek].length : 0;
  return { month: latestMonth, week: latestWeek, count };
};

const Dashboard = () => {
  const [flashcardInfo, setFlashcardInfo] = useState(null);
  const [quizInfo, setQuizInfo] = useState(null);
  const [readInfo, setReadInfo] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      // Flashcard latest
      try {
        const { data } = await supabase.from('flashcard').select('month, week').limit(5000);
        setFlashcardInfo(getLatestWeekInfo(data));
      } catch {}

      // Quiz latest
      try {
        const { data } = await supabase.from('questions').select('month, week').limit(5000);
        setQuizInfo(getLatestWeekInfo(data));
      } catch {}

      // Read latest — walk study_materials/month/week/
      try {
        const { data: rootItems } = await supabase.storage.from('study_materials').list('', { limit: 100 });
        const monthFolders = (rootItems || []).filter(f => !f.name.startsWith('.'));
        const sortedMonths = sortMonthsDesc(monthFolders.map(f => f.name));
        const latestMonth = sortedMonths[0];
        if (!latestMonth) return;

        const { data: weekItems } = await supabase.storage.from('study_materials').list(latestMonth, { limit: 100 });
        const weekFolders = (weekItems || []).filter(f => !f.name.startsWith('.'));
        const latestWeek = sortWeeksDesc(weekFolders.map(f => f.name))[0];
        if (!latestWeek) return;

        const { data: files } = await supabase.storage
          .from('study_materials')
          .list(`${latestMonth}/${latestWeek}`, { limit: 100 });
        const actualFiles = (files || []).filter(f => f.id !== null && !f.name.startsWith('.'));
        if (!actualFiles.length) return;

        const file = actualFiles[0];
        const { data: urlData } = supabase.storage
          .from('study_materials')
          .getPublicUrl(`${latestMonth}/${latestWeek}/${file.name}`);
        setReadInfo({ month: latestMonth, week: latestWeek, url: urlData.publicUrl });
      } catch {}
    };

    fetchAll();
  }, []);

  const flashcardLabel = flashcardInfo
    ? `${cap(flashcardInfo.month)} — ${cap(flashcardInfo.week)}`
    : '—';

  return (
    <div className="max-w-5xl mx-auto">

          {/* Top Banner */}
          <section className="bg-[#c8dfe5] rounded-3xl p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-800/70 mb-2">
                New Deck Available
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a2e4c] mb-2 uppercase tracking-tight">
                {flashcardLabel}
              </h2>
              <p className="text-[#1a2e4c]/70 font-medium">
                {flashcardInfo
                  ? `${flashcardInfo.count} Active Recall cards ready. Swipe through key facts for this week.`
                  : 'New Active Recall cards ready.'}
              </p>
            </div>
            <Link
              to="/flashcard"
              className="bg-[#1a2e4c] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#112036] transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              REVISE NOW
            </Link>
          </section>

          {/* Grid Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                High-Yield MCQs
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Live Practice Pool</h3>
              <p className="text-sm text-gray-500 mb-6">
                {quizInfo
                  ? `Latest: ${cap(quizInfo.month)} ${cap(quizInfo.week)} · ${quizInfo.count} questions`
                  : 'Loading...'}
              </p>
              <Link
                to="/quiz"
                className="bg-orange-50 text-orange-600 px-5 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2 hover:bg-orange-100 transition-colors"
              >
                Start Quiz &rarr;
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Active Recall
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Flashcards</h3>
              <p className="text-sm text-gray-500 mb-6">
                {flashcardInfo
                  ? `${cap(flashcardInfo.month)} ${cap(flashcardInfo.week)} · ${flashcardInfo.count} cards`
                  : 'Loading...'}
              </p>
              <Link
                to="/flashcard"
                className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full text-sm font-bold inline-flex hover:bg-blue-100 transition-colors"
              >
                Revise
              </Link>
            </div>
          </section>

          {/* Focus Module Card */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Current Affairs Magazine
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Focus Module{readInfo ? ` — ${cap(readInfo.month)} ${cap(readInfo.week)}` : ''}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Your customized CurrentIQ digest is live for high-yield review.
            </p>
            <Link
              to="/read"
              className="bg-teal-50 text-teal-700 px-5 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2 hover:bg-teal-100 transition-colors"
            >
              Read Module &rarr;
            </Link>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-3 gap-3 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-1 sm:gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-gray-900">
                {quizInfo ? quizInfo.count : '0'}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">Questions This Week</span>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-1 sm:gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-gray-900">
                {flashcardInfo ? flashcardInfo.count : '0'}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">Cards This Week</span>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-1 sm:gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-gray-900">
                {readInfo ? '1' : '0'}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">Focus Modules</span>
            </div>
          </section>

    </div>
  );
};

export default Dashboard;
