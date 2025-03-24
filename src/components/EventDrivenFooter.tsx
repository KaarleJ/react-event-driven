import { useEvent } from "@/hooks/UseEvent";
import { useState } from "react";

export default function EventDrivenFooter() {
  const [lastClicked, setLastClicked] = useState<{
    row: number;
    col: number;
  }>();
  const [clickCount, setClickCount] = useState(0);

  function incrementClickCount() {
    setClickCount((prev) => prev + 1);
  }

  useEvent("onCountUpdate", incrementClickCount);
  useEvent("onLocationUpdate", setLastClicked);

  return (
    <div className="mt-4 text-center">
      {lastClicked ? (
        <div className="text-md">
          You last clicked a cell in row {lastClicked.row} and in column{" "}
          {lastClicked.col}. <br />
          Total Clicks: {clickCount}
        </div>
      ) : (
        <div className="text-md">Click a cell to see its location.</div>
      )}
    </div>
  );
}
