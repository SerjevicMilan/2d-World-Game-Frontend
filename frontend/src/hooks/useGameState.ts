// src/hooks/useGameState.ts
import { useEffect, useState, useCallback } from 'react';
import { fetchGameData, GameData } from '../api/gameApi';

export function useGameState(tileCountX: number, tileCountY: number, id: string) {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadGameState = useCallback(async () => {
    try {
      const state = await fetchGameData(tileCountX, tileCountY, id);
      setGameData(state);
    } catch (err) {
      console.error(err);
      setError('Failed to load game state');
    }
  }, [tileCountX, tileCountY, id]);

  useEffect(() => {
    loadGameState(); // Initial fetch

    const interval = setInterval(() => {
      loadGameState();
    }, 100); // Polling

    return () => clearInterval(interval);
  }, [loadGameState]);

  return { gameData, error};
}
