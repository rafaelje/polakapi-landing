import { useState } from 'react';

interface CopyButtonProps {
  value: string;
}

export default function CopyButton({ value }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <button type="button" className="copy-button" aria-label="Copy command" onClick={copyValue}>
      <span aria-live="polite">
        {status === 'copied' ? 'copied' : status === 'failed' ? 'copy failed' : 'copy'}
      </span>
    </button>
  );
}
