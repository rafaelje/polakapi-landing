import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CopyButton from './CopyButton';

describe('CopyButton', () => {
  const writeText = vi.fn<() => Promise<void>>();

  beforeEach(() => {
    writeText.mockReset();
    writeText.mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('copies the supplied command and confirms success', async () => {
    render(<CopyButton value="pnpm tauri dev" />);

    fireEvent.click(screen.getByRole('button', { name: /copy command/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('pnpm tauri dev'));
    expect(screen.getByText('copied')).toBeInTheDocument();
  });

  it('reports when clipboard access fails', async () => {
    writeText.mockRejectedValueOnce(new Error('Clipboard denied'));
    render(<CopyButton value="pnpm tauri dev" />);

    fireEvent.click(screen.getByRole('button', { name: /copy command/i }));

    expect(await screen.findByText('copy failed')).toBeInTheDocument();
  });
});
