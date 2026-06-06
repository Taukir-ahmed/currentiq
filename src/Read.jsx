import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];

const sortMonthsDesc = (months) =>
  [...months].sort((a, b) => {
    const al = a.toLowerCase(), bl = b.toLowerCase();
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

const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

const formatFileName = (name) =>
  name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const Read = () => {
  const [monthData, setMonthData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMonth, setExpandedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);

  // Viewer state
  const [viewer, setViewer] = useState(null);       // { name, path }
  const [htmlContent, setHtmlContent] = useState('');
  const [viewerLoading, setViewerLoading] = useState(false);
  const [viewerError, setViewerError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setIsLoading(true);

        const { data: rootItems, error: rootError } = await supabase.storage
          .from('study_materials')
          .list('', { limit: 100 });
        if (rootError) throw rootError;

        const monthFolders = (rootItems || []).filter(f => !f.name.startsWith('.'));
        const grouped = {};

        await Promise.all(monthFolders.map(async (monthFolder) => {
          const monthKey = monthFolder.name;

          const { data: weekItems, error: weekError } = await supabase.storage
            .from('study_materials')
            .list(monthKey, { limit: 100 });
          if (weekError) return;

          const weekFolders = (weekItems || []).filter(f => !f.name.startsWith('.'));
          grouped[monthKey] = {};

          await Promise.all(weekFolders.map(async (weekFolder) => {
            const weekKey = weekFolder.name;

            const { data: fileItems, error: filesError } = await supabase.storage
              .from('study_materials')
              .list(`${monthKey}/${weekKey}`, { limit: 100 });
            if (filesError) return;

            grouped[monthKey][weekKey] = (fileItems || [])
              .filter(f => !f.name.startsWith('.') && f.id !== null)
              .map(f => ({ ...f, path: `${monthKey}/${weekKey}/${f.name}` }));
          }));
        }));

        setMonthData(grouped);
        const sorted = sortMonthsDesc(Object.keys(grouped));
        if (sorted[0]) setExpandedMonth(sorted[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const getPublicUrl = (path) => {
    const { data } = supabase.storage.from('study_materials').getPublicUrl(path);
    return data.publicUrl;
  };

  // Fetch the HTML text and render in an iframe via srcDoc — bypasses
  // Supabase's wrong Content-Type header that causes raw code to show
  const openFile = async (file) => {
    setViewer(file);
    setHtmlContent('');
    setViewerError(null);
    setViewerLoading(true);
    try {
      const url = getPublicUrl(file.path);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Could not load file (HTTP ${res.status})`);
      const text = await res.text();
      setHtmlContent(text);
    } catch (err) {
      setViewerError(err.message);
    } finally {
      setViewerLoading(false);
    }
  };

  const months = sortMonthsDesc(Object.keys(monthData));
  const totalFiles = months.reduce((sum, m) =>
    sum + Object.values(monthData[m] || {}).reduce((s, files) => s + files.length, 0), 0
  );
  const totalWeeks = months.reduce((sum, m) => sum + Object.keys(monthData[m] || {}).length, 0);

  // ─── Inline HTML Viewer ────────────────────────────────────────────────────
  if (viewer) {
    return (
      <div className="flex flex-col h-[calc(100vh-88px)] sm:h-[calc(100vh-64px)]">
        {/* Viewer toolbar */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <button
            onClick={() => setViewer(null)}
            className="text-gray-500 hover:text-gray-800 font-bold text-sm flex items-center gap-2 transition-colors"
          >
            ← Back
          </button>
          <h2 className="font-black text-[#1a2e4c] text-sm truncate mx-4 flex-1 text-center">
            {formatFileName(viewer.name)}
          </h2>
          <a
            href={getPublicUrl(viewer.path)}
            download={viewer.name}
            className="text-xs font-bold text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            ↓ Download
          </a>
        </div>

        {/* Loading */}
        {viewerLoading && (
          <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 text-gray-500">
              <svg className="animate-spin h-5 w-5 text-[#1a2e4c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="font-medium text-sm">Loading module...</span>
            </div>
          </div>
        )}

        {/* Error */}
        {viewerError && (
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center max-w-sm">
              <p className="font-bold mb-1">Failed to load file</p>
              <p className="text-sm">{viewerError}</p>
            </div>
          </div>
        )}

        {/* iframe — srcDoc renders the HTML directly, ignoring Supabase Content-Type */}
        {htmlContent && !viewerLoading && (
          <iframe
            srcDoc={htmlContent}
            title={viewer.name}
            className="flex-1 w-full rounded-2xl border border-gray-200 shadow-sm bg-white"
            style={{ minHeight: 0 }}
          />
        )}
      </div>
    );
  }

  // ─── Selected Week File List ───────────────────────────────────────────────
  if (selectedWeek) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setSelectedWeek(null)}
          className="mb-6 text-gray-500 hover:text-gray-800 font-bold text-sm flex items-center gap-2 transition-colors"
        >
          ← Back to Library
        </button>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-[#1a2e4c]">{selectedWeek.name}</h2>
          <span className="text-gray-400 font-medium text-sm">
            {selectedWeek.files.length} {selectedWeek.files.length === 1 ? 'file' : 'files'}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {selectedWeek.files.map((file) => (
            <div
              key={file.id || file.name}
              className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-teal-200 hover:bg-teal-50 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                  <span className="text-teal-700 font-black text-xs">
                    {file.name.split('.').pop().toUpperCase().slice(0, 4)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-700 text-sm truncate group-hover:text-teal-800 transition-colors">
                    {formatFileName(file.name)}
                  </p>
                  {file.metadata?.size && (
                    <p className="text-xs text-gray-400">
                      {(file.metadata.size / 1024).toFixed(0)} KB
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => openFile(file)}
                className="ml-3 shrink-0 text-[#1a2e4c] font-bold text-xs bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-[#1a2e4c] hover:text-white hover:border-[#1a2e4c] transition-all"
              >
                Read
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Accordion List View ───────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-black text-[#1a2e4c] tracking-tight">Focus Library</h2>
        <p className="text-gray-500 mt-2">Browse by month and week. Tap a week to read.</p>
      </header>

      {isLoading && (
        <div className="flex items-center gap-3 text-gray-500 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <svg className="animate-spin h-5 w-5 text-[#1a2e4c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="font-medium">Loading study materials...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100">
          <p className="font-bold">Failed to load study materials.</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <section className="bg-[#1a2e4c] text-white rounded-3xl p-8 mb-8 shadow-md">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">Your Library</p>
            <h3 className="text-3xl font-black mb-1">{totalFiles} {totalFiles === 1 ? 'Digest' : 'Digests'}</h3>
            <p className="text-gray-300 text-sm font-medium">
              {months.length} {months.length === 1 ? 'Month' : 'Months'} &nbsp;·&nbsp; {totalWeeks} {totalWeeks === 1 ? 'Week' : 'Weeks'}
            </p>
          </section>

          {months.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
              <p className="text-gray-500 font-medium">No study materials found.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {months.map((month) => {
                const weeks = sortWeeks(Object.keys(monthData[month] || {}));
                const monthTotal = weeks.reduce((s, w) => s + (monthData[month][w]?.length || 0), 0);
                const isOpen = expandedMonth === month;

                return (
                  <div key={month} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setExpandedMonth(isOpen ? null : month)}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1a2e4c] flex items-center justify-center text-white font-black text-sm">
                          {cap(month).slice(0, 3).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <p className="font-black text-[#1a2e4c] text-base">{cap(month)}</p>
                          <p className="text-xs text-gray-400 font-medium">
                            {weeks.length} {weeks.length === 1 ? 'week' : 'weeks'} · {monthTotal} {monthTotal === 1 ? 'digest' : 'digests'}
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
                          const files = monthData[month][week] || [];
                          return (
                            <button
                              key={week}
                              onClick={() => setSelectedWeek({ name: `${cap(month)} — ${cap(week)}`, files })}
                              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center">
                                  <span className="text-teal-700 font-black text-xs">
                                    {week.replace(/\D/g, '') || '?'}
                                  </span>
                                </div>
                                <span className="font-bold text-gray-700 text-sm group-hover:text-orange-700 transition-colors">
                                  {cap(week)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-400 group-hover:text-orange-400">
                                  {files.length} {files.length === 1 ? 'file' : 'files'}
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

export default Read;
