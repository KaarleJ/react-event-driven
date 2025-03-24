import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

// Simulated cell component
function SimulatedCell({
  row,
  col,
  onCellClick,
}: {
  row: number;
  col: number;
  onCellClick: (row: number, col: number) => void;
}) {
  const handleClick = () => {
    onCellClick(row, col);
  };

  // We're just returning a function, not rendering anything
  return handleClick;
}

// Simulated grid component
function SimulatedGrid({
  onGridCellClick,
}: {
  onGridCellClick: (row: number, col: number) => void;
}) {
  const cells: Array<() => void> = [];

  // Create 100 simulated cell callbacks (10x10 grid)
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const cellClickHandler = SimulatedCell({
        row: r,
        col: c,
        onCellClick: onGridCellClick,
      });
      cells.push(cellClickHandler);
    }
  }

  // Return all cell click handlers
  return cells;
}

export default function CallbacksPerformance() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [eventsReceived, setEventsReceived] = useState(0);
  const [dispatchTime, setDispatchTime] = useState<number | null>(null);
  const isRunningRef = useRef(false);

  // This simulates the page-level handler
  function handleCellClick() {
    if (!isRunningRef.current) return;

    setEventsReceived((prev) => {
      if (prev === 0) {
        setStartTime(performance.now());
      }
      const nextCount = prev + 1;
      if (nextCount === 10000) {
        setEndTime(performance.now());
        isRunningRef.current = false;
      }
      return nextCount;
    });
  }

  function runTest() {
    // Reset metrics
    setEventsReceived(0);
    setStartTime(null);
    setEndTime(null);
    setDispatchTime(null);
    isRunningRef.current = true;

    // Small timeout to let UI update before test
    setTimeout(() => {
      const dispatchStartTime = performance.now();

      const cellHandlers = SimulatedGrid({
        onGridCellClick: handleCellClick,
      });

      for (let i = 0; i < 10000; i++) {
        const randomCellIndex = i % cellHandlers.length;
        cellHandlers[randomCellIndex]();
      }

      const dispatchEndTime = performance.now();
      setDispatchTime(dispatchEndTime - dispatchStartTime);
    }, 0);
  }

  const timeTaken =
    endTime && startTime ? (endTime - startTime).toFixed(2) : "-";

  return (
    <Card className="w-[20rem]">
      <CardHeader>
        <CardTitle>Callbacks Performance</CardTitle>
        <Button onClick={runTest} className="mt-4">
          Run 10000 Events Test
        </Button>
      </CardHeader>
      <CardContent>
        <p>Events Processed: {eventsReceived}</p>
        <p>Processing Duration: {timeTaken} ms</p>
        <p>
          Dispatch Duration: {dispatchTime ? dispatchTime.toFixed(2) : "-"} ms
        </p>
      </CardContent>
    </Card>
  );
}
