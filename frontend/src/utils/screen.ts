// src/utils/screen.ts

export interface ScreenInfo {
    tileSize: number;
    width: number;
    height: number;
    tileCountX: number;
    tileCountY: number;
  }

  export const getScreenTileInfo = (tileSize: number = 24): ScreenInfo => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      tileSize,
      width,
      height,
      tileCountX: Math.floor(width / tileSize),
      tileCountY: Math.floor(height / tileSize),
    };
  };
