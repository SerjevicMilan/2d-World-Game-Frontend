import PixelButton from '../PixelButton/PixelButton';
import './GameMenu.css';

interface GameMenuProps {
    status: 'MENU' | 'WON' | 'LOST';
    onPlay: () => void;
    onQuit: () => void;
  }

  export default function GameMenu({ status, onPlay, onQuit }: GameMenuProps) {
    const getTitle = () => {
      switch (status) {
        case 'WON': return 'You Win!';
        case 'LOST': return 'You Lost!';
        default: return '2D World Game';
      }
    };

    const getPlayLabel = () => (status === 'MENU' ? 'Play' : 'Play Again');
    const colorClass = status === 'WON' ? 'Won' : 'Lost';

    return (
      <div className={`result-screen ${colorClass}`}>
        <h1>{getTitle()}</h1>
        <PixelButton onClick={onPlay}>{getPlayLabel()}</PixelButton>
        <br />
        <PixelButton onClick={onQuit}>Quit</PixelButton>
      </div>
    );
  }
