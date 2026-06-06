import React from 'react';

const FlashcardResult = ({ deckName, solvedCount, retryCount, onRetry, onBackToHome }) => {
  const totalSeen = solvedCount + retryCount;
  const accuracy = totalSeen > 0 ? Math.round((solvedCount / totalSeen) * 100) : 100;

  return (
    <div className="max-w-xl mx-auto">
      {/* Hero Card */}
      <div className="bg-[#1a2e4c] text-white rounded-3xl p-8 mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3">Session Complete</p>
        <p className="text-gray-400 font-medium mb-4">{deckName}</p>
        <div className="text-7xl font-black text-teal-400 mb-2">{solvedCount}</div>
        <p className="text-gray-300 text-lg font-bold">
          {solvedCount === 1 ? 'Card Solved' : 'Cards Solved'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
          <p className="text-3xl font-black text-teal-600">{solvedCount}</p>
          <p className="text-xs text-gray-400 font-medium mt-1">Total Solved</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
          <p className="text-3xl font-black text-orange-500">{retryCount}</p>
          <p className="text-xs text-gray-400 font-medium mt-1">Repeated</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
          <p className="text-3xl font-black text-blue-600">{accuracy}%</p>
          <p className="text-xs text-gray-400 font-medium mt-1">First-try Rate</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onRetry}
          className="py-3 rounded-full font-bold border-2 border-[#1a2e4c] text-[#1a2e4c] hover:bg-[#1a2e4c] hover:text-white transition-all"
        >
          Study Again
        </button>
        <button
          onClick={onBackToHome}
          className="py-3 rounded-full font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default FlashcardResult;
