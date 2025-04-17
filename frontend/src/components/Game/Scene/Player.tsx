import { useEffect, useRef } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { useImage } from '../../../hooks/useImage';

interface Props {
  x: number;
  y: number;
  tileSize: number;
}

export default function Player({ x, y, tileSize }: Props) {
  const img = useImage('/assets/player.png');
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
    <KonvaImage
      ref={imageRef}
      x={x * tileSize}
      y={y * tileSize}
      width={tileSize}
      height={tileSize}
      image={img}
    />
  );
}
