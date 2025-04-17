import { Group, Image as KonvaImage, Circle } from 'react-konva';
import { useImage } from '../../utils/useImage';

interface Props {
  tiles: { x: number; y: number }[];
  tileSize: number;
}

export default function Coins({ tiles, tileSize }: Props) {
  const img = useImage('/assets/coin.png');
  if (!img) return null;

  return (
    <>
      {tiles.map((tile, i) => {
        const x = tile.x * tileSize;
        const y = tile.y * tileSize;
        const centerX = x + tileSize / 2;
        const centerY = y + tileSize / 2;

        return (
          <Group key={i}>
            {/* Glowing light behind coin */}
            <Circle
              x={centerX}
              y={centerY}
              radius={tileSize * 0.6}
              fillRadialGradientStartRadius={0}
              fillRadialGradientEndRadius={tileSize * 0.6}
              fillRadialGradientColorStops={[
                0, 'rgba(255, 255, 0, 0.5)',
                1, 'rgba(255, 255, 0, 0)',
              ]}
            />
            {/* Coin image */}
            <KonvaImage
              x={x}
              y={y}
              width={tileSize}
              height={tileSize}
              image={img}
            />
          </Group>
        );
      })}
    </>
  );
}
