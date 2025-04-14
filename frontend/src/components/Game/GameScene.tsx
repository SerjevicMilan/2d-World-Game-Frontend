
import { Stage, Layer } from 'react-konva';
import FloorTiles from './FloorTiles';
import WallTiles from './WallTiles';
import Coins from './Coins';
import Enemies from './Enemy';
import Player from './Player';

interface Coord { x: number; y: number }

interface Props {
  tileSize: number;
  width: number;
  height: number;
  floors: Coord[];
  walls: Coord[];
  coins: Coord[];
  enemy: Coord;
  player: Coord;
}

export default function GameScene({
  tileSize,
  width,
  height,
  floors,
  walls,
  coins,
  enemy,
  player
}: Props) {
  return (
    <Stage width={width * tileSize} height={height * tileSize}>
      <Layer>
        <WallTiles tiles={walls} tileSize={tileSize} />
        <FloorTiles tiles={floors} tileSize={tileSize} />
        <Coins tiles={coins} tileSize={tileSize} />
        <Enemies x={enemy.x} y={enemy.y} tileSize={tileSize} />
        <Player x={player.x} y={player.y} tileSize={tileSize} />
      </Layer>
    </Stage>
  );
}
