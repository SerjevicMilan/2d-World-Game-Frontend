import { useState } from 'react';
import Game from './Game/Game';
import GameMenu from './Menu/GameMenu';

type GameStatus = 'MENU' | 'PLAYING' | 'WON' | 'LOST' | 'QUIT';

export default function GameWrapper() {
  const [status, setStatus] = useState<GameStatus>('MENU');
  const [sessionId, setSessionId] = useState('' + Math.random());

  const handlePlay = () => {
    setSessionId('' + Math.random()); // create new session
    setStatus('PLAYING');
  };

  const handleQuit = () => {
    window.close();
    // Fallback if close is blocked
    setTimeout(() => {
      setStatus('QUIT');
    }, 100);
  };

  const handleGameEnd = (result: 'WON' | 'LOST') => {
    setStatus(result);
  };

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
