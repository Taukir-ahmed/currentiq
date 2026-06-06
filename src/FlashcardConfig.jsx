import React, { useState, useMemo } from 'react';

const FlashcardConfig = ({ deckName, cards, onStart, onBack }) => {
  // Build tag → count map from the `tag` field
  const tagCounts = useMemo(() => {
    const map = {};
    cards.forEach((c) => {
      if (c.tag) map[c.tag] = (map[c.tag] || 0) + 1;
    });
    // Sort by count descending
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [cards]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [retryEnabled, setRetryEnabled] = useState(false);

  const toggleTag = (tag) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const filteredCards =
    selectedTags.length === 0
      ? cards
      : cards.filter((c) => selectedTags.includes(c.tag));

  const handleStart = () => {
    onStart({ cards: filteredCards, retryEnabled });
  };

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-gray-500 hover:text-gray-800 font-bold text-sm flex items-center gap-2 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">Configure Session</p>
        <h2 className="text-2xl font-black text-[#1a2e4c] mb-8">{deckName}</h2>

        {/* Tags / Categories */}
        {tagCounts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-gray-700">Categories</label>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Select categories to filter · leave empty to include all
            </p>
            <div className="flex flex-wrap gap-2">
              {tagCounts.map(([tag, count]) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-[#1a2e4c] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-black tabular-nums ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-gray-500 border border-gray-200'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Retry Mode */}
        <div className="mb-10">
          <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl">
            <div>
              <p className="font-bold text-gray-700">Retry Mode</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Cards you're unsure of loop back until you mark them correct
              </p>
            </div>
            <button
              onClick={() => setRetryEnabled((v) => !v)}
              aria-label="Toggle retry mode"
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 shrink-0 ml-4 ${
                retryEnabled ? 'bg-[#1a2e4c]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  retryEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex justify-between text-sm font-medium text-gray-500">
          <span>
            {filteredCards.length} {filteredCards.length === 1 ? 'card' : 'cards'}
            {selectedTags.length > 0 && (
              <span className="text-gray-400 font-normal">
                {' '}from {selectedTags.length} {selectedTags.length === 1 ? 'category' : 'categories'}
              </span>
            )}
          </span>
          <span>{retryEnabled ? 'Retry mode on' : 'Single pass'}</span>
        </div>

        <button
          onClick={handleStart}
          disabled={filteredCards.length === 0}
          className="w-full bg-[#1a2e4c] text-white py-3.5 rounded-full font-bold text-base hover:bg-[#112036] disabled:opacity-40 transition-colors shadow-md"
        >
          Start Session →
        </button>
      </div>
    </div>
  );
};

export default FlashcardConfig;
