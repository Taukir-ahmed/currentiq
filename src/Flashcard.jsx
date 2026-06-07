import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import QuizConfig from './QuizConfig';
import QuizPlay from './QuizPlay';
import QuizResult from './QuizResult';

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];

const sortMonthsDesc = (months) =>
  [...months].sort((a, b) => {
    const al = a.toLowerCase(), bl = b.toLowerCase();
    const aYear = parseInt(al.match(/\d{4}/)?.[0] ?? '0');
    const bYear = parseInt(bl.match(/\d{4}/)?.[0] ?? '0');
    if (aYear !== bYear) return bYear - aYear;
    const aM = MONTHS.findIndex(m => al.includes(m));
    const bM = MONTHS.findIndex(m => bl.includes(m));
    return bM - aM;
  });

const sortWeeks = (weeks) =>
  [...weeks].sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.replace(/\D/g, '')) || 0;
    return numA - numB;
  });

const Quiz = () => {
  const navigate = useNavigate();
  const [monthData, setMonthData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMonth, setExpandedMonth] = useState(null);
  const [loadingWeek, setLoadingWeek] = useState(null);

  const [phase, setPhase] = useState('list');
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [playQuestions, setPlayQuestions] = useState([]);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        setIsLoading(true);
    
        const { data, error } = await supabase.rpc('get_distinct_flashcard_month_week');
        if (error) throw error;
    
        const grouped = data.reduce((acc, row) => {
          const month = (row.month || 'Unknown Month').trim();
          const week  = (row.week  || 'Unknown Week').trim();
          if (!acc[month]) acc[month] = {};
          acc[month][week] = Number(row.card_count) || 0;
          return acc;
        }, {});
    
        setMonthData(grouped);
        const sorted = sortMonthsDesc(Object.keys(grouped));
        if (sorted[0]) setExpandedMonth(sorted[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStructure();
  }, []);

  const openWeek = async (month, week) => {
    const key = `${month}||${week}`;
    setLoadingWeek(key);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('month', month)
        .eq('week', week)
        .limit(500);
      if (error) throw error;
      setSelectedDeck({ name: `${month} — ${week}`, questions: data });
      setPhase('config');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingWeek(null);
    }
  };

  const handleStartQuiz = ({ questionCount, timerMinutes: mins }) => {
    const shuffled = [...selectedDeck.questions].sort(() => Math.random() - 0.5);
    setPlayQuestions(shuffled.slice(0, questionCount));
    setTimerMinutes(mins);
    setPhase('play');
  };

  const handleFinishQuiz = (answers) => {
    setQuizAnswers(answers);
    setPhase('result');
  };

  if (phase === 'config') {
    return (
      <QuizConfig
        deckName={selectedDeck.name}
        questions={selectedDeck.questions}
        onStart={handleStartQuiz}
        onBack={() => setPhase('list')}
      />
    );
  }

  if (phase === 'play') {
    return (
      <QuizPlay
        deckName={selectedDeck.name}
        questions={playQuestions}
        timerMinutes={timerMinutes}
        onFinish={handleFinishQuiz}
        onBack={() => setPhase('config')}
      />
    );
  }

  if (phase === 'result') {
    return (
      <QuizResult
        deckName={selectedDeck.name}
        answers={quizAnswers}
        onRetry={() => setPhase('config')}
        onBackToHome={() => navigate('/')}
      />
    );
  }

  // ─── List View ─────────────────────────────────────────────────────────────
  const months = sortMonthsDesc(Object.keys(monthData));
  const totalQuestions = months.reduce((sum, m) =>
    sum + Object.values(monthData[m]).reduce((s, count) => s + count, 0), 0
  );
  const totalWeeks = months.reduce((sum, m) => sum + Object.keys(monthData[m]).length, 0);

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-black text-[#1a2e4c] tracking-tight">Practice Pool</h2>
        <p className="text-gray-500 mt-2">Browse by month and week. Tap a week to start practising.</p>
      </header>

      {isLoading && (
        <div className="flex items-center gap-3 text-gray-500 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <svg className="animate-spin h-5 w-5 text-[#1a2e4c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="font-medium">Fetching questions...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100">
          <p className="font-bold">Failed to load questions.</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <section className="bg-[#1a2e4c] text-white rounded-3xl p-8 mb-8 shadow-md">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">Question Bank</p>
            <h3 className="text-3xl font-black mb-1">{totalQuestions} Questions</h3>
            <p className="text-gray-300 text-sm font-medium">
              {months.length} {months.length === 1 ? 'Month' : 'Months'} &nbsp;·&nbsp; {totalWeeks} {totalWeeks === 1 ? 'Week' : 'Weeks'}
            </p>
          </section>

          {months.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
              <p className="text-gray-500 font-medium">No questions found in the database.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {months.map((month) => {
                const weeks = sortWeeks(Object.keys(monthData[month]));
                const monthTotal = weeks.reduce((s, w) => s + monthData[month][w], 0);
                const isOpen = expandedMonth === month;

                return (
                  <div key={month} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setExpandedMonth(isOpen ? null : month)}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1a2e4c] flex items-center justify-center text-white font-black text-sm">
                          {month.slice(0, 3).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <p className="font-black text-[#1a2e4c] text-base">{month}</p>
                          <p className="text-xs text-gray-400 font-medium">
                            {weeks.length} {weeks.length === 1 ? 'week' : 'weeks'} · {monthTotal} questions
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-gray-400 transition-transform duration-200"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}
                      >
                        ▾
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-gray-100 px-6 py-3 flex flex-col gap-2">
                        {weeks.map((week) => {
                          const count = monthData[month][week];
                          const weekKey = `${month}||${week}`;
                          const isWeekLoading = loadingWeek === weekKey;
                          return (
                            <button
                              key={week}
                              onClick={() => openWeek(month, week)}
                              disabled={!!loadingWeek}
                              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                                  {isWeekLoading ? (
                                    <svg className="animate-spin h-3.5 w-3.5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                  ) : (
                                    <span className="text-blue-700 font-black text-xs">
                                      {week.replace(/\D/g, '') || '?'}
                                    </span>
                                  )}
                                </div>
                                <span className="font-bold text-gray-700 text-sm group-hover:text-orange-700 transition-colors">
                                  {week}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-400 group-hover:text-orange-400">
                                  {count} {count === 1 ? 'question' : 'questions'}
                                </span>
                                <span className="text-gray-300 group-hover:text-orange-400 transition-colors">→</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;