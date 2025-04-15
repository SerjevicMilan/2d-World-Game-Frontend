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
  status: String;
  isGameOver: boolean;
}

export const fetchGameData = async (
  width: number,
  height: number,
  id: string
): Promise<GameData> => {
  const response = await fetch(`/api/state?width=${width}&height=${height}&sessionId=${id}`);
  if (!response.ok) throw new Error('Failed to load game state');
  return response.json();
};

export const fetchGameLayout = async (
  width: number,
  height: number,
  id: string
): Promise<GameLayout> => {
  const response = await fetch(`/api/init?width=${width}&height=${height}&sessionId=${id}`);
  if (!response.ok) throw new Error('Failed to load game layout');
  return response.json();
};

export const sendReady = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/ready?sessionId=${id}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to send ready status (HTTP ${response.status})`);
    }

    console.log("Ready signal sent.");
  } catch (error) {
    console.error("Error sending ready signal:", error);
  }
};

export const sendPlayerMove = async (id: string, direction: string): Promise<void> => {
  try {
    const response = await fetch(`/api/move?sessionId=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ direction }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send movement (HTTP ${response.status})`);
    }

    console.log(`Move ${direction} sent.`);
  } catch (error) {
    console.error("Error sending player movement:", error);
  }
};
