import { useEffect, useRef } from 'react';
import { sendPlayerMove } from './gameApi';

export function usePlayerControls(id: string, onMoveComplete: () => void) {
  const lastMoveRef = useRef<number>(0);
  const cooldown = 200; // milliseconds between allowed moves

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastMoveRef.current < cooldown) return; // too soon

      const key = event.key.toUpperCase();
      if (!['W', 'A', 'S', 'D'].includes(key)) return;

      lastMoveRef.current = now;

      try {
        await sendPlayerMove(id, key); // Send movement
        //onMoveComplete();              // Reload game state
      } catch (err) {
        console.error('Failed to send move:', err);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id, onMoveComplete]);
}
