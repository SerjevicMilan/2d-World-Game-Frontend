
import { Image as KonvaImage  } from 'react-konva';
import { useImage } from '../../../hooks/useImage';

interface Props {
  tiles: { x: number; y: number }[];
  tileSize: number;
}

export default function FloorTiles({ tiles, tileSize }: Props) {
  const img = useImage('/assets/floor.jpeg');
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
