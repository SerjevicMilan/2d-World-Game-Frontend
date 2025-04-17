// src/GameWrapper.tsx
import { useState } from 'react';
import Game from '../Game/Game';
import GameMenu from '../Menu/GameMenu/GameMenu';
import { useEscapeToMenu, GameStatus } from '../../hooks/useEscapeToMenu';

export default function GameWrapper() {
  const [status, setStatus] = useState<GameStatus>('MENU');
  const [sessionId, setSessionId] = useState('' + Math.random());

  const handlePlay = () => {
    setSessionId('' + Math.random());
    setStatus('PLAYING');
  };

  const handleQuit = () => {
    window.close();
    setTimeout(() => setStatus('QUIT'), 100);
  };

  const handleGameEnd = (result: 'WON' | 'LOST') => {
    setStatus(result);
  };

  useEscapeToMenu(status, setStatus); // ✅ works with typed state now

  return (
    <div className="game-background">
      {(status === 'MENU' || status === 'WON' || status === 'LOST') && (
        <GameMenu status={status} onPlay={handlePlay} onQuit={handleQuit} />
      )}

      {status === 'PLAYING' && (
        <Game sessionId={sessionId} onGameEnd={handleGameEnd} />
      )}

      {status === 'QUIT' && (
        <div style={{ textAlign: 'center' }}>
          <h1>👋 Thanks for playing!</h1>
          <p>Feel free to close the window.</p>
        </div>
      )}
    </div>
  );
}
