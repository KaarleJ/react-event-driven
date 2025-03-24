export default function CallbacksFooter({
  lastClicked,
  clickCount,
}: {
  lastClicked?: { row: number; col: number };
  clickCount: number;
}) {
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
