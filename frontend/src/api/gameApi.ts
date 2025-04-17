const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

/**
 * fetchGameData
 * Fetches the current game state (player, enemy, coins) for a given session
 */
export const fetchGameData = async (
  width: number,
  height: number,
  id: string
): Promise<GameData> => {
  const response = await fetch(`${baseUrl}/api/state?width=${width}&height=${height}&sessionId=${id}`);
  if (!response.ok) throw new Error('Failed to load game state');
  return response.json();
};

/**
 * fetchGameLayout
 * Initializes or retrieves the tile layout (floors, walls) for a session
 */
export const fetchGameLayout = async (
  width: number,
  height: number,
  id: string
): Promise<GameLayout> => {
  const response = await fetch(`${baseUrl}/api/init?width=${width}&height=${height}&sessionId=${id}`);
  if (!response.ok) throw new Error('Failed to load game layout');
  return response.json();
};

/**
 * sendReady
 * Notifies the backend that the client has loaded the layout and is ready
 */
export const sendReady = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/api/ready?sessionId=${id}`, {
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

/**
 * sendPlayerMove
 * Sends a player move command (W/A/S/D) to the backend for processing
 */
export const sendPlayerMove = async (id: string, direction: string): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/api/move?sessionId=${id}`, {
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
