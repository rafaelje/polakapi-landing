import { useState } from 'react';

type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

  function toggleTheme() {
    document.documentElement.dataset.theme = nextTheme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', nextTheme === 'light' ? '#f0ede6' : '#0d0d10');
    try {
      localStorage.setItem('polakapi-theme', nextTheme);
    } catch {}
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Use ${nextTheme} theme`}
      onClick={toggleTheme}
    >
      <span aria-hidden="true">{theme === 'dark' ? '◐' : '◑'}</span>
      <span>{theme === 'dark' ? 'ink' : 'paper'}</span>
    </button>
  );
}
