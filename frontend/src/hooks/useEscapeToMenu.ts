// src/hooks/useEscapeToMenu.ts
import { useEffect } from 'react';

export type GameStatus = 'MENU' | 'PLAYING' | 'WON' | 'LOST' | 'QUIT';

/**
 * useEscapeToMenu
 * Listens for the Escape key when the game is in PLAYING status
 * and switches game status back to MENU.
 */
export function useEscapeToMenu(
  status: GameStatus,
  setStatus: React.Dispatch<React.SetStateAction<GameStatus>>
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status === 'PLAYING') {
        setStatus('MENU');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, setStatus]);
}
