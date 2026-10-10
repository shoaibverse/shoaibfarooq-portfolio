import { useEffect, useState } from 'react';

/**
 * Types each phrase out, holds, deletes it, then moves to the next.
 * When `enabled` is false (reduced motion) it returns the first phrase unchanged.
 */
export function useTypewriter(
  phrases: readonly string[],
  enabled = true,
  { typeMs = 70, deleteMs = 38, holdMs = 1700 } = {},
): string {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || phrases.length === 0) return;

    const full = phrases[index % phrases.length];
    let delay = deleting ? deleteMs : typeMs;

    if (!deleting && text === full) delay = holdMs;

    const timer = window.setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, phrases, enabled, typeMs, deleteMs, holdMs]);

  return enabled ? text : phrases[0] ?? '';
}
