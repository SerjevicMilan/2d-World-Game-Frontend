import "./RecreateWorldButton.css";

interface RecreateWorldButtonProps {
    onClick: () => void;
  }

  export default function RecreateWorldButton({ onClick }: RecreateWorldButtonProps) {
    return (
      <button
        onClick={onClick}
        className="recreate"
      >
        Recreate
      </button>
    );
  }
