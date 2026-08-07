(() => {
  const darkColor = '#0d0d10';
  const lightColor = '#f0ede6';

  try {
    const savedTheme = localStorage.getItem('polakapi-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : prefersLight
        ? 'light'
        : 'dark';

    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'light' ? lightColor : darkColor,
    );
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
})();
