import React, { useState } from 'react';

const getQ = (q) => q.question_text ?? q.question ?? q.title ?? '';
const getOptions = (q) => [
  { key: 'A', value: q.option_a ?? q.optionA ?? q.a },
  { key: 'B', value: q.option_b ?? q.optionB ?? q.b },
  { key: 'C', value: q.option_c ?? q.optionC ?? q.c },
  { key: 'D', value: q.option_d ?? q.optionD ?? q.d },
].filter((o) => o.value);

const QuizResult = ({ deckName, answers, onRetry, onBackToHome }) => {
  const [showSolutions, setShowSolutions] = useState(false);

  const total = answers.length;
  const correct = answers.filter((a) => a.isCorrect).length;
  const skipped = answers.filter((a) => a.skipped).length;
  const wrong = total - correct - skipped;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const scoreColor =
    percentage >= 70 ? 'text-teal-400' : percentage >= 40 ? 'text-orange-400' : 'text-red-400';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score Card */}
      <div className="bg-[#1a2e4c] text-white rounded-3xl p-8 mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3">Quiz Complete</p>
        <p className="text-gray-400 font-medium mb-4">{deckName}</p>
        <div className={`text-7xl font-black mb-2 ${scoreColor}`}>{percentage}%</div>
        <p className="text-gray-300 text-lg font-bold">{correct} / {total} correct</p>
        {skipped > 0 && <p className="text-gray-500 text-sm mt-1">{skipped} skipped (timer ran out)</p>}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
          <p className="text-3xl font-black text-teal-600">{correct}</p>
          <p className="text-xs text-gray-400 font-medium mt-1">Correct</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
          <p className="text-3xl font-black text-red-500">{wrong}</p>
          <p className="text-xs text-gray-400 font-medium mt-1">Wrong</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
          <p className="text-3xl font-black text-gray-400">{skipped}</p>
          <p className="text-xs text-gray-400 font-medium mt-1">Skipped</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={onRetry}
          className="py-3 rounded-full font-bold border-2 border-[#1a2e4c] text-[#1a2e4c] hover:bg-[#1a2e4c] hover:text-white transition-all"
        >
          Try Again
        </button>
        <button
          onClick={onBackToHome}
          className="py-3 rounded-full font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
        >
          Back to Home
        </button>
      </div>

      {/* Solutions Toggle */}
      <button
        onClick={() => setShowSolutions((v) => !v)}
        className="w-full py-3 rounded-full font-bold bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors mb-6"
      >
        {showSolutions ? 'Hide Solutions ▲' : 'See Solutions ▼'}
      </button>

      {showSolutions && (
        <div className="flex flex-col gap-4 pb-8">
          {answers.map((ans, i) => {
            const q = ans.question;
            const opts = getOptions(q);
            return (
              <div
                key={i}
                className={`bg-white p-6 rounded-2xl border shadow-sm ${ans.isCorrect ? 'border-teal-200' : ans.skipped ? 'border-gray-200' : 'border-red-200'}`}
              >
                {/* Question */}
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                      ans.isCorrect ? 'bg-teal-100 text-teal-700' : ans.skipped ? 'bg-gray-100 text-gray-400' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {ans.isCorrect ? '✓' : ans.skipped ? '–' : '✗'}
                  </span>
                  <p className="font-bold text-gray-800 text-sm leading-snug">{getQ(q)}</p>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-1.5 ml-10">
                  {opts.map(({ key, value }) => {
                    const isCorrect = key === ans.correctKey;
                    const isSelected = key === ans.selectedOption;
                    let cls = 'text-gray-400';
                    if (isCorrect) cls = 'text-teal-700 font-bold';
                    if (isSelected && !isCorrect) cls = 'text-red-600 font-bold line-through';
                    return (
                      <p key={key} className={`text-sm ${cls}`}>
                        <span className="font-black mr-1">{key}.</span>{value}
                      </p>
                    );
                  })}
                </div>

                {/* Explanation */}
                {(q.explanation || q.explanation_text) && (
                  <div className="mt-3 ml-10 p-3 bg-blue-50 rounded-xl text-xs text-blue-800 leading-relaxed">
                    {q.explanation ?? q.explanation_text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizResult;
