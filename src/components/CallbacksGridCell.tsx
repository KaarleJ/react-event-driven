import { useState } from "react";

export default function CallbacksGridCell({
  row,
  col,
  onClick,
}: {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    onClick(row, col);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-8 h-8 border border-gray-300 flex items-center justify-center cursor-pointer ${
        clicked ? "bg-blue-300" : "bg-white"
      }`}
    >
      {clicked ? "X" : ""}
    </div>
  );
}
