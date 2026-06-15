interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  text,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white ${className}`}
    >
      {text}
    </button>
  );
}