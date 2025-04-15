import { useEffect, useState } from 'react';
import { fetchGameLayout, GameLayout, sendReady } from './gameApi';

export function useWorldLayout(tileCountX: number, tileCountY: number, id: string) {
  const [layout, setLayout] = useState<GameLayout | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLayout = async () => {
      try {
        const layout = await fetchGameLayout(tileCountX, tileCountY, id);
        setLayout(layout);
        await sendReady(id); // Send ready status after layout is loaded
      } catch (err) {
        console.error(err);
        setError('Failed to load layout');
      }
    };

    loadLayout();
  }, [tileCountX, tileCountY, id]);

  return { layout, error };
}
