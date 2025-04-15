import { useRef } from 'react';
import GameScene from './GameScene';
import { getScreenTileInfo } from '../../utils/screen';
import { useGameState } from '../../utils/useGameState';
import { useWorldLayout } from '../../utils/useWorldLayout';
import { usePlayerControls } from '../../utils/usePlayerControls';

export default function Game() {
  const { tileSize, tileCountX, tileCountY } = getScreenTileInfo();
  const sessionIdRef = useRef('' + Math.random());
  const id = sessionIdRef.current;

  const { layout, error: layoutError } = useWorldLayout(tileCountX, tileCountY, id);
  const { gameData, error: stateError, reload: reloadGameState } = useGameState(tileCountX, tileCountY, id);

  usePlayerControls(id, reloadGameState);

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
