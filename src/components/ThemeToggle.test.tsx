import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark';
    document.querySelector('meta[name="theme-color"]')?.remove();
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#0d0d10';
    document.head.append(themeColor);
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('switches the document between dark and light themes', () => {
    render(<ThemeToggle />);

    expect(screen.getByText('blackout')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /use light theme/i }));

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('polakapi-theme')).toBe('light');
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#f0ede6');
    expect(screen.getByText('daylight')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /use dark theme/i })).toBeInTheDocument();
  });

  it('keeps working when theme persistence is unavailable', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage denied');
    });
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button', { name: /use light theme/i }));

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(screen.getByRole('button', { name: /use dark theme/i })).toBeInTheDocument();
  });
});
