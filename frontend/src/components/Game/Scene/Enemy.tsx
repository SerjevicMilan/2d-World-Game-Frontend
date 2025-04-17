import { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Image as KonvaImage  } from 'react-konva';
import { useImage } from '../../../hooks/useImage';

interface Props {
  x: number;
  y: number;
  tileSize: number;
}

export default function Enemy({ x, y, tileSize }: Props) {
  const img = useImage('/assets/enemy.png');
  const imageRef = useRef<any>(null);

 // Animate on position change
 useEffect(() => {
  if (imageRef.current) {
    new Konva.Tween({
      node: imageRef.current,
      duration: 0.2,
      x: x * tileSize,
      y: y * tileSize,
      easing: Konva.Easings.EaseInOut,
    }).play();
  }
}, [x, y, tileSize]);

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
