// src/hooks/useEscapeToMenu.ts
import { useEffect } from 'react';

export type GameStatus = 'MENU' | 'PLAYING' | 'WON' | 'LOST' | 'QUIT';

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
