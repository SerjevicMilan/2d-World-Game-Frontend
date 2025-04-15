import { useEffect } from 'react';
import GameScene from './GameScene';
import { getScreenTileInfo } from '../../utils/screen';
import { useGameState } from '../../utils/useGameState';
import { useWorldLayout } from '../../utils/useWorldLayout';
import { usePlayerControls } from '../../utils/usePlayerControls';

interface GameProps {
  sessionId: string;
  onGameEnd: (result: 'WON' | 'LOST') => void;
}

export default function Game({ sessionId, onGameEnd }: GameProps) {
  const { tileSize, tileCountX, tileCountY } = getScreenTileInfo();


  const { layout, error: layoutError } = useWorldLayout(tileCountX, tileCountY, sessionId);
  const {gameData,error: stateError, } = useGameState(tileCountX, tileCountY, sessionId);

  useEffect(() => {
    if (gameData?.isGameOver) {
      onGameEnd(gameData.status === 'WON' ? 'WON' : 'LOST');
    }
  }, [gameData, onGameEnd]);

  usePlayerControls(sessionId, gameData, (updated) => {
    // Direct state update hook here
    Object.assign(gameData!, updated); // This preserves reference for stability
  });

  if (layoutError || stateError) return <div>Error loading game</div>;
  if (!layout || !gameData) return <div>Loading...</div>;

  return (
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
  );
}
