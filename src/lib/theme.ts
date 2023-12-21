export type Theme = 'dark' | 'light';

export function getPreferredTheme(): Theme {
  let storedTheme = localStorage.getItem('top90-theme');
  if (storedTheme) {
    return storedTheme as Theme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setDocumentTheme(theme: Theme) {
  localStorage.setItem('top90-theme', theme);
  document.documentElement.setAttribute('data-bs-theme', theme);
}
