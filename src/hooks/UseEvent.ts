import { useCallback, useEffect, type Dispatch } from "react";

interface AppEvent<PayloadType = unknown> extends Event {
  detail: PayloadType;
}


/* Custom event map */
export interface CustomWindowEventMap extends WindowEventMap {
  onCountUpdate: AppEvent;
  onLocationUpdate: AppEvent<{ row: number; col: number }>;
}

export const useEvent = <PayloadType = unknown>(
  eventName: keyof CustomWindowEventMap,
  callback?: Dispatch<PayloadType> | VoidFunction
) => {
  useEffect(() => {
    if (!callback) {
      return;
    }

    const listener = ((event: AppEvent<PayloadType>) => {
      callback(event.detail); // Use `event.detail` for custom payloads
    }) as EventListener;

    window.addEventListener(eventName, listener);
    return () => {
      window.removeEventListener(eventName, listener);
    };
  }, [callback, eventName]);

  const dispatch = useCallback(
    (detail: PayloadType) => {
      const event = new CustomEvent(eventName, { detail });
      window.dispatchEvent(event);
    },
    [eventName]
  );

  // Return a function to dispatch the event
  return { dispatch };
};
