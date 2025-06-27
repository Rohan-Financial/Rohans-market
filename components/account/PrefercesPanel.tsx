'use client';

import { useState } from 'react';

export default function PreferencesPanel() {
  const [newsletter, setNewsletter] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="newsletter" className="font-medium">
          Subscribe to newsletter
        </label>
        <input
          id="newsletter"
          type="checkbox"
          checked={newsletter}
          onChange={() => setNewsletter(!newsletter)}
          className="w-5 h-5"
        />
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="darkMode" className="font-medium">
          Enable dark mode
        </label>
        <input
          id="darkMode"
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-5 h-5"
        />
      </div>

      <p className="text-sm text-gray-500">
        Preferences are stored locally for now. Future versions can sync with user profiles.
      </p>
    </div>
  );
}
