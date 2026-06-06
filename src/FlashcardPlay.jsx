import React, { useState, useRef } from 'react';

const getFront = (c) => c.question ?? c.front ?? c.front_text ?? '';
const getBack = (c) => c.answer ?? c.back ?? c.back_text ?? '';

const FlashcardPlay = ({ deckName, cards, retryEnabled, onFinish, onBack }) => {
  const [queue, setQueue] = useState(() => [...cards]);
  const [isFlipped, setIsFlipped] = useState(false);
  // useRef so the value is always current when onFinish fires — no stale closure risk
  const retryCountRef = useRef(0);
  // separate state just to force a re-render when retry count changes (for the badge)
  const [retryBadge, setRetryBadge] = useState(0);

  const current = queue[0];
  const originalCount = cards.length;
  // each "Got it" shrinks the queue; retries keep it the same length → clean progress
  const progress = originalCount - queue.length;

  const handleKnow = () => {
    const newQueue = queue.slice(1);
    if (newQueue.length === 0) {
      // call onFinish synchronously with guaranteed-current retryCount from ref
      onFinish({ solvedCount: originalCount, retryCount: retryCountRef.current });
      return;
    }
    setQueue(newQueue);
    setIsFlipped(false);
  };

  const handleRetry = () => {
    retryCountRef.current += 1;
    setRetryBadge(retryCountRef.current); // triggers re-render so badge updates
    setQueue((prev) => [...prev.slice(1), prev[0]]);
    setIsFlipped(false);
  };

  if (!current) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-black text-[#1a2e4c] truncate mr-4">{deckName}</h2>
        <span className="text-gray-400 font-medium text-sm shrink-0">
          {progress} / {originalCount}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full mb-6">
        <div
          className="h-1.5 bg-orange-400 rounded-full transition-all duration-300"
          style={{ width: originalCount > 0 ? `${(progress / originalCount) * 100}%` : '0%' }}
        />
      </div>

      {/* Retry badge */}
      {retryEnabled && retryBadge > 0 && (
        <div className="flex justify-end mb-3">
          <span className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
            {retryBadge} {retryBadge === 1 ? 'card' : 'cards'} to retry
          </span>
        </div>
      )}

      {/* Flip Card */}
      <div
        className="cursor-pointer select-none mb-6"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped((f) => !f)}
      >
        <div
          style={{
            transition: 'transform 0.5s',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            position: 'relative',
            height: 'clamp(220px, 40vw, 300px)',
          }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            className="absolute inset-0 bg-[#1a2e4c] text-white rounded-3xl p-6 sm:p-10 flex flex-col justify-center items-center text-center"
          >
            {current.tag && (
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3">
                {current.tag}
              </span>
            )}
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Question</p>
            <h3 className="text-xl font-bold leading-relaxed">{getFront(current)}</h3>
            <p className="mt-8 text-gray-400 text-sm">Tap to reveal answer</p>
          </div>

          {/* Back */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 bg-white rounded-3xl p-6 sm:p-10 flex flex-col justify-center items-center text-center border border-gray-100 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-4">Answer</p>
            <h3 className="text-xl font-bold text-gray-800 leading-relaxed">{getBack(current)}</h3>
          </div>
        </div>
      </div>

      {/* Action Buttons — only visible after flipping */}
      {isFlipped ? (
        retryEnabled ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleRetry}
              className="py-3 rounded-full font-bold border-2 border-orange-400 text-orange-500 hover:bg-orange-50 active:bg-orange-100 transition-colors"
            >
              Retry ↩
            </button>
            <button
              onClick={handleKnow}
              className="py-3 rounded-full font-bold bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 transition-colors"
            >
              Got it ✓
            </button>
          </div>
        ) : (
          <button
            onClick={handleKnow}
            className="w-full py-3 rounded-full font-bold bg-[#1a2e4c] text-white hover:bg-[#112036] active:bg-black/80 transition-colors"
          >
            Next →
          </button>
        )
      ) : (
        <p className="text-center text-gray-400 text-sm font-medium py-3">
          Flip the card to see the answer
        </p>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors"
        >
          ← Exit Session
        </button>
      </div>
    </div>
  );
};

export default FlashcardPlay;
