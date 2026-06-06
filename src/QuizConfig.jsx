import React, { useState } from 'react';

const TIMER_OPTIONS = [
  { label: '1 Min', value: 1 },
  { label: '5 Min', value: 5 },
  { label: '10 Min', value: 10 },
  { label: 'No Limit', value: 0 },
];

const QuizConfig = ({ deckName, questions, onStart, onBack }) => {
  const max = questions.length;
  const [questionCount, setQuestionCount] = useState(Math.min(max, 10));
  const [timerMinutes, setTimerMinutes] = useState(0);

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-gray-500 hover:text-gray-800 font-bold text-sm flex items-center gap-2 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">Configure Quiz</p>
        <h2 className="text-2xl font-black text-[#1a2e4c] mb-8">{deckName}</h2>

        {/* Question Count */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="font-bold text-gray-700">Number of Questions</label>
            <span className="text-2xl font-black text-[#1a2e4c]">{questionCount}</span>
          </div>
          <input
            type="range"
            min={1}
            max={max}
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full accent-[#1a2e4c] h-2"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>1</span>
            <span>{max} available</span>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-10">
          <label className="font-bold text-gray-700 block mb-3">Timer</label>
          <div className="grid grid-cols-4 gap-2">
            {TIMER_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setTimerMinutes(value)}
                className={`py-2.5 rounded-xl font-bold text-sm transition-all ${
                  timerMinutes === value
                    ? 'bg-[#1a2e4c] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex justify-between text-sm font-medium text-gray-500">
          <span>{questionCount} questions</span>
          <span>{timerMinutes > 0 ? `${timerMinutes} min timer` : 'No time limit'}</span>
        </div>

        <button
          onClick={() => onStart({ questionCount, timerMinutes })}
          className="w-full bg-[#1a2e4c] text-white py-3.5 rounded-full font-bold text-base hover:bg-[#112036] transition-colors shadow-md"
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
};

export default QuizConfig;
