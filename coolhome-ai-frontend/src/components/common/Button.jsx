export default function Button({
  text,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className="
      bg-blue-600
      text-white
      px-6
      py-3
      rounded-lg
      hover:bg-blue-700
      "
    >
      {text}
    </button>
  );
}