import { useEffect, useState } from 'react';
import GameScene from './Scene/GameScene';
import { getScreenTileInfo } from '../../utils/screen';
import { useGameState } from '../../hooks/useGameState';
import { useWorldLayout } from '../../hooks/useWorldLayout';
import { usePlayerControls } from '../../hooks/usePlayerControls';
import RecreateWorldButton from './Button/RecreateWorldButton';
import MobileControls from '../Controls/MobileControls';
import { sendPlayerMove } from '../../api/gameApi';


interface GameProps {
  sessionId: string;
  onGameEnd: (result: 'WON' | 'LOST') => void;
}

export default function Game({ sessionId, onGameEnd }: GameProps) {
  const { tileSize, tileCountX, tileCountY } = getScreenTileInfo();
  const [worldKey, setWorldKey] = useState(0);//for difrent world
  const fullSessionId = sessionId + '-' + worldKey;

  const { layout, error: layoutError } = useWorldLayout(tileCountX, tileCountY, fullSessionId);
  const { gameData, error: stateError } = useGameState(tileCountX, tileCountY, fullSessionId);

  useEffect(() => {
    if (gameData?.isGameOver) {
      onGameEnd(gameData.status === 'WON' ? 'WON' : 'LOST');
    }
  }, [gameData, onGameEnd]);

  usePlayerControls(fullSessionId, gameData, (updated) => {
    Object.assign(gameData!, updated);
  });

  if (layoutError || stateError) return <div>Error loading game</div>;
  if (!layout || !gameData) return <div>Loading...</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <RecreateWorldButton onClick={() => setWorldKey((prev) => prev + 1)} />
      <GameScene
        tileSize={tileSize}
        width={tileCountX}
        height={tileCountY}
        walls={layout.walls}
        floors={layout.floors}
        coins={gameData.coins}
        enemy={gameData.enemy}
        player={gameData.player}
      />
       <MobileControls onMove={(dir) => sendPlayerMove(fullSessionId, dir)} />
    </div>
  );
}
