import CallbacksFooter from "@/components/CallbacksFooter";
import CallbacksGrid from "@/components/CallbacksGrid";
import CallbacksPerformance from "@/components/CallbacksPerformance";
import { useState } from "react";

export default function Callbacks() {
  const [lastClicked, setLastClicked] = useState<{
    row: number;
    col: number;
  }>();
  const [clickCount, setClickCount] = useState(0);

  const handleCellClick = (row: number, col: number) => {
    setLastClicked({ row, col });
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Callbacks Strategy</h1>
      <p className="text-lg">
        Click a cell to see the last clicked cell's location.
      </p>
      <CallbacksGrid onCellClick={handleCellClick} />
      <CallbacksFooter lastClicked={lastClicked} clickCount={clickCount} />
      <CallbacksPerformance />
    </div>
  );
}
