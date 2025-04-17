import './PixelButton.css';

interface PixelButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function PixelButton({ onClick, children, style }: PixelButtonProps) {
  return (
    <button className="pixel-button" onClick={onClick} style={style}>
      {children}
    </button>
  );
}
