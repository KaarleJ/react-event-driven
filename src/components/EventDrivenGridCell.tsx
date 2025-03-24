import { useCallback, useState } from "react";
import { useEvent } from "@/hooks/UseEvent";

export default function EventDrivenGridCell({
  row,
  col,
}: {
  row: number;
  col: number;
}) {
  const [clicked, setClicked] = useState(false);
  const { dispatch: dispatchLocation } = useEvent("onLocationUpdate");
  const { dispatch: dispatchCount } = useEvent("onCountUpdate");

  const handleClick = useCallback(() => {
    setClicked(!clicked);
    dispatchLocation({ row, col });
    dispatchCount(null);
  }, [clicked, row, col, dispatchLocation, dispatchCount]);


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
