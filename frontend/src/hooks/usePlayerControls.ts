import { useEffect, useRef } from 'react';
import { sendPlayerMove, GameData } from '../api/gameApi';

/**
 * usePlayerControls
 * - Listens for keyboard events when gameData is available
 * - 200ms cooldown between moves
 */
export function usePlayerControls(
  id: string,
  gameData: GameData | null,
  setGameData: (data: GameData) => void
) {
  const lastMoveRef = useRef<number>(0);
  const cooldown = 200; // ms between moves

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const now = Date.now();
      // dont update if inside cooldown period
      if (now - lastMoveRef.current < cooldown) return;

      // Calculate new player position based on key
      const key = event.key.toUpperCase();
      const deltas: Record<string, [number, number]> = {
        W: [0, -1],
        A: [-1, 0],
        S: [0, 1],
        D: [1, 0],
      };

      const delta = deltas[key];
      if (!delta || !gameData) return;

       // Mark time of this move
      lastMoveRef.current = now;

      // Optimistic local update
      const newPlayer = {
        x: gameData.player.x + delta[0],
        y: gameData.player.y + delta[1],
      };

      setGameData({ ...gameData, player: newPlayer });

      try {
        await sendPlayerMove(id, key);
        // Polling will handle sync
      } catch (err) {
        console.error('Failed to send move:', err);
      }
    };

     // Attach and cleanup event listener
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id, gameData, setGameData]);
}
