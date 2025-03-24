import EventDrivenFooter from "@/components/EventDrivenFooter";
import EventDrivenGrid from "@/components/EventDrivenGrid";
import EventDrivenPerformance from "@/components/EventDrivenPerformance";

export default function Callbacks() {

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Event-Driven Strategy</h1>
      <p className="text-lg">
        Click a cell to see the last clicked cell's location.
      </p>
      <EventDrivenGrid />
      <EventDrivenFooter />
      <EventDrivenPerformance />
    </div>
  );
}
