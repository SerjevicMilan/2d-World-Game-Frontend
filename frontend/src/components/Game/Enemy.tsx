
import { Image as KonvaImage  } from 'react-konva';
import { useImage } from '../../utils/useImage';

interface Props {
  x: number;
  y: number;
  tileSize: number;
}

export default function Enemy({ x, y, tileSize }: Props) {
  const img = useImage('/public/assets/enemy.png');
  if (!img) return null;

  return (
    <>
        <KonvaImage
          x={x * tileSize}
          y={y * tileSize}
          width={tileSize}
          height={tileSize}
          image={img}
        />
    </>
  );
}
