import { useEffect, useState } from 'react';
import GameScene from './GameScene';
import { fetchGameData, fetchGameLayout, GameData, GameLayout } from '../../utils/gameApi';
import { getScreenTileInfo } from '../../utils/screen';

export default function Game() {
  const { tileSize, tileCountX, tileCountY } = getScreenTileInfo();
  const id : string = '' + Math.random();

  const [gameData, setGameData] = useState<GameData | null>(null);
  const [gameLayout, setGameLayout] = useState<GameLayout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInit = async () => {
      try {
        const [layout, state] = await Promise.all([
          fetchGameLayout(tileCountX, tileCountY, id),
          fetchGameData(tileCountX, tileCountY, id)
        ]);
        setGameLayout(layout);
        setGameData(state);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load game');
        setLoading(false);
      }
    };

    loadInit();
  }, [tileCountX, tileCountY]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log('gameData:', gameData);
console.log('gameLayout:', gameLayout);
console.log('player:', gameData?.player);

  return gameData && gameLayout && gameData.player ? (
    <GameScene
      tileSize={tileSize}
      width={tileCountX}
      height={tileCountY}
      walls={gameLayout.walls}
      floors={gameLayout.floors}
      coins={gameData.coins}
      enemy={gameData.enemy}
      player={gameData.player}
    />
  ) : null;
}
