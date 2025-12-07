// components/ChangelogModal.tsx
import { useState, useEffect } from 'react';
import { CURRENT_VERSION, changelogEntries } from '@/lib/changelog';

export default function ChangelogModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem('changelog_version');
    const latest = changelogEntries[0];

    if (lastSeen !== CURRENT_VERSION) {
      setIsOpen(true); // Show if user never saw this version
    }
  }, []);

  const closeForever = () => {
    localStorage.setItem('changelog_version', CURRENT_VERSION);
    setIsOpen(false);
  };

  const closeTemporarily = () => setIsOpen(false);

  if (!isOpen) return null;

  const entry = changelogEntries[0];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-70 z-40" onClick={closeTemporarily} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <span className="text-3xl">✨</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What's New
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Version {entry.version} · {entry.date}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-5 mb-6">
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              {entry.highlight}
            </p>
          </div>

          <ul className="space-y-3 mb-8">
            {entry.changes.map((change, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{change}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 justify-center">
            <button
              onClick={closeForever}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition"
            >
              Awesome! Don't show again
            </button>
            <button
              onClick={closeTemporarily}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:underline"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
