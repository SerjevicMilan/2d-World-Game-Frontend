
import { Image as KonvaImage } from 'react-konva';
import { useImage } from '../../utils/useImage';

interface Props {
  tiles: { x: number; y: number }[];
  tileSize: number;
}

export default function WallTiles({ tiles, tileSize }: Props) {
  const img = useImage('/public/assets/wall.png');
  if (!img) return null;

  return (
    <>
      {tiles.map((tile, i) => (
        <KonvaImage
          key={i}
          x={tile.x * tileSize}
          y={tile.y * tileSize}
          width={tileSize}
          height={tileSize}
          image={img}
        />
      ))}
    </>
  );
}
