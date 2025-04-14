// src/utils/gameApi.ts

export interface Coord {
  x: number;
  y: number;
}

export interface GameLayout {
  floors: Coord[];
  walls: Coord[];
}

export interface GameData {
  coins: Coord[];
  enemy: Coord;
  player: Coord;
}

export const fetchGameData = async (width: number, height: number, id: string): Promise<GameData> => {
  const response = await fetch(`/api/state?width=${width}&height=${height}&sessionId=${id}`);
  if (!response.ok) throw new Error('Failed to load game state');
  return response.json();
};

export const fetchGameLayout = async (width: number, height: number,id: string): Promise<GameLayout> => {
  const response = await fetch(`/api/init?width=${width}&height=${height}&sessionId=${id}`);
  if (!response.ok) throw new Error('Failed to load game layout');
  return response.json();
};
