
import { useEffect, useState } from 'react';

/**
 * useImage
 * - Loads an image from the given URL
 * - Returns the loaded HTMLImageElement or null while loading
 */
export function useImage(src: string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImage(img);
  }, [src]);
  return image;
}
