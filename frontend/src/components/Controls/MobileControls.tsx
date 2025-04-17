// MobileControls.tsx
import './MobileControls.css';

interface Props {
  onMove: (direction: 'W' | 'A' | 'S' | 'D') => void;
}

export default function MobileControls({ onMove }: Props) {
  return (
    <div className="mobile-controls">
      <div className="row">
        <button onClick={() => onMove('W')}>↑</button>
      </div>
      <div className="row">
        <button onClick={() => onMove('A')}>←</button>
        <button onClick={() => onMove('S')}>↓</button>
        <button onClick={() => onMove('D')}>→</button>
      </div>
    </div>
  );
}
