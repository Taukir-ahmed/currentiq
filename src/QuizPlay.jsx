import React, { useState, useEffect, useCallback } from 'react';

const getQ = (q) => q.question_text ?? q.question ?? q.title ?? '';
const getOptions = (q) => [
  { key: 'A', value: q.option_a ?? q.optionA ?? q.a },
  { key: 'B', value: q.option_b ?? q.optionB ?? q.b },
  { key: 'C', value: q.option_c ?? q.optionC ?? q.c },
  { key: 'D', value: q.option_d ?? q.optionD ?? q.d },
].filter((o) => o.value);
const getCorrect = (q) => (q.correct_answer ?? q.correctAnswer ?? q.answer ?? '').toUpperCase();

const formatTime = (secs) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const QuizPlay = ({ deckName, questions, timerMinutes, onFinish, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(timerMinutes > 0 ? timerMinutes * 60 : null);

  const finishQuiz = useCallback((answersArray) => {
    const remaining = questions.slice(answersArray.length);
    const final = [
      ...answersArray,
      ...remaining.map((q) => ({
        question: q,
        selectedOption: null,
        correctKey: getCorrect(q),
        isCorrect: false,
        skipped: true,
      })),
    ];
    onFinish(final);
  }, [questions, onFinish]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft === 0) { finishQuiz(answers); return; }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, answers, finishQuiz]);

  const currentQ = questions[currentIndex];
  const options = getOptions(currentQ);
  const correctKey = getCorrect(currentQ);
  const isLast = currentIndex === questions.length - 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const timerWarning = timeLeft !== null && timeLeft <= 30;

  const handleSubmit = () => {
    const newAnswer = {
      question: currentQ,
      selectedOption,
      correctKey,
      isCorrect: selectedOption === correctKey,
      skipped: false,
    };
    setRevealed(true);
    setAnswers((prev) => [...prev, newAnswer]);
  };

  const handleNext = () => {
    if (isLast) {
      finishQuiz([...answers]);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setRevealed(false);
    }
  };

  const getOptionStyle = (key) => {
    if (!revealed) {
      return selectedOption === key
        ? 'border-[#1a2e4c] bg-[#1a2e4c] text-white'
        : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400';
    }
    if (key === correctKey) return 'border-teal-500 bg-teal-50 text-teal-800';
    if (key === selectedOption && key !== correctKey) return 'border-red-400 bg-red-50 text-red-700';
    return 'border-gray-100 bg-gray-50 text-gray-400';
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-black text-[#1a2e4c] truncate mr-4">{deckName}</h2>
        <div className="flex items-center gap-4 shrink-0">
          {timeLeft !== null && (
            <span className={`font-black text-lg tabular-nums ${timerWarning ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>
              {formatTime(timeLeft)}
            </span>
          )}
          <span className="text-gray-400 font-medium text-sm">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full mb-6">
        <div
          className="h-1.5 bg-orange-400 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-sm border border-gray-100 mb-4">
        {currentQ.category && (
          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md inline-block mb-4">
            {currentQ.category}
          </span>
        )}
        <h3 className="text-xl font-bold text-gray-800 leading-snug mb-6">{getQ(currentQ)}</h3>

        <div className="flex flex-col gap-3">
          {options.map(({ key, value }) => (
            <button
              key={key}
              disabled={revealed}
              onClick={() => setSelectedOption(key)}
              className={`w-full text-left p-4 rounded-2xl border-2 font-medium transition-all flex items-center gap-4 ${getOptionStyle(key)}`}
            >
              <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold shrink-0">
                {key}
              </span>
              {value}
            </button>
          ))}
        </div>

        {!revealed ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="mt-6 w-full bg-[#1a2e4c] text-white py-3 rounded-full font-bold hover:bg-[#112036] disabled:opacity-40 transition-all"
          >
            Submit Answer
          </button>
        ) : (
          <div className="mt-6">
            <div className={`p-4 rounded-2xl mb-4 ${selectedOption === correctKey ? 'bg-teal-50 text-teal-800' : 'bg-red-50 text-red-700'}`}>
              <p className="font-bold">
                {selectedOption === correctKey ? '✓ Correct!' : `✗ Incorrect — Correct answer: ${correctKey}`}
              </p>
              {(currentQ.explanation || currentQ.explanation_text) && (
                <p className="text-sm mt-2 opacity-80">{currentQ.explanation ?? currentQ.explanation_text}</p>
              )}
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-[#1a2e4c] text-white py-3 rounded-full font-bold hover:bg-[#112036] transition-all"
            >
              {isLast ? 'Finish Quiz →' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors"
      >
        ← Exit Quiz
      </button>
    </div>
  );
};

export default QuizPlay;
