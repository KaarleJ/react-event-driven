import { useState, useRef } from "react";
import { useEvent } from "@/hooks/UseEvent";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export default function EventDrivenPerformance() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [eventsReceived, setEventsReceived] = useState(0);
  const [dispatchTime, setDispatchTime] = useState<number | null>(null);
  const isRunningRef = useRef(false);

  const { dispatch: dispatchLocation } = useEvent("onLocationUpdate");
  const { dispatch: dispatchCount } = useEvent("onCountUpdate");

  function handleLocationEvent() {
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

  useEvent("onLocationUpdate", handleLocationEvent);

  async function runTest() {
    setEventsReceived(0);
    setStartTime(null);
    setEndTime(null);
    setDispatchTime(null);
    isRunningRef.current = true;

    // Use setTimeout to allow React to update the UI before starting the test
    setTimeout(() => {
      const dispatchStartTime = performance.now();

      for (let i = 0; i < 100000; i++) {
        dispatchLocation({ row: 2, col: 5 });
        dispatchCount(null);
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
        <CardTitle>Event-Driven Performance</CardTitle>
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
