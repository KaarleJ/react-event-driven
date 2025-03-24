import EventDrivenGridCell from "./EventDrivenGridCell";

export default function EventDrivenGrid() {
  const cols = 10;
  const rows = 10;

  const cells = [];
  for (let r = 0; r < rows; r++) {
    const rowCells = [];
    for (let c = 0; c < cols; c++) {
      rowCells.push(
        <EventDrivenGridCell key={`${r}-${c}`} row={r} col={c} />
      );
    }
    cells.push(
      <div key={r} className="flex">
        {rowCells}
      </div>
    );
  }

  return <div className="inline-block">{cells}</div>;
}
