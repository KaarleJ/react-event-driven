# Event-Driven vs Callbacks architecture for component communication

## Introduction

This project demonstrates two approaches for inter-component communication in a react application: the traditional callbacks approach and an event-driven approach proposed in this article [Event-Driven Architecture for Clean React Component Communication](https://dev.to/nicolalc/event-driven-architecture-for-clean-react-component-communication-fph) by Nicola Castella. The project implements identical functionality using both methods to compare their different strengths and weaknesses.

## Implementation overview

### Callbacks Strategy

The callbacks implementation follows the traditional React pattern of passing handler functions down through props:

- Parent components define state and handler functions
- These handlers are passed down to child components via props
- Child components call these functions when events occur
- State changes propagate back up to the parent

### Event-Driven Strategy
The event-driven implementation uses a custom event system based on the browser's native [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) API:

- Components dispatch events using a custom [useEvent](./src/hooks/UseEvent.ts) hook.
- Other components subscribe to these events regardless of their position in the component tree
- Communication happens without direct parent-child relationships
- State is managed independently by each component

## Comparison

### Component readability

#### Callbacks

- Straightforward implementation following React's standard patterns
- No additional abstractions or systems to understand
- Implementation matches mental model of React's unidirectional data flow

#### Event-Driven

- Requires understanding of custom event system
- Simpler component interfaces with fewer props
- Reduces the need for intermediate components to pass props

### Complexity

#### Callbacks

- Component relationships are explicit but rigid
- Adding new functionality often requires modifying multiple components in the tree
- Refactoring can be challenging as component hierarchies grow

#### Event-Driven

- Component Relationships are implicit and more flexible
- Adding new functionality can be done with minimal changes to existing components
- Debugging can be more challenging as event flow is less visible


### Performance

#### Test methodology
The performance tests measure the overhead of both communication patterns through a controlled experiment:

1. **Setup**:
   - Both implementations create a simulated component hierarchy that mirrors the actual application structure
   - The Callbacks test recreates the parent→grid→cell callback chain
   - The Event-Driven test uses the custom event system with dispatchers and subscribers

2. **Test Process**:
   - Each test dispatches 10,000 events in rapid succession
   - For Callbacks: Events flow through the simulated component hierarchy
   - For Event-Driven: Events flow through the CustomEvent system
   - Both tests measure the same metrics using `performance.now()`

3. **Component Simulation**:
   - The tests simulate component hierarchies without rendering to isolate communication overhead
   - Callbacks test uses functions that mimic the actual component tree's callback chain
   - Event-Driven test uses the actual event dispatchers and subscribers

4. **Code Example - Callbacks**:
```tsx
// Create simulated component hierarchy
const cellHandlers = SimulatedGrid({
  onGridCellClick: handleCellClick,
});

// Dispatch 10,000 events through the callback chain
for (let i = 0; i < 10000; i++) {
  const randomCellIndex = i % cellHandlers.length;
  cellHandlers[randomCellIndex]();
}
```

5. **Code Example - Event-Driven**:
```tsx
// Dispatch 10,000 events through the event system
for (let i = 0; i < 10000; i++) {
  dispatchLocation({ row: 2, col: 5 });
  dispatchCount(null);
}
```

#### Metrics explained

**Processing Duration**: The time between when the first event is processed by the component and when the 10,000th event completes processing. This measures how quickly React can update state in response to events.

**Dispatch Duration**: The time it takes to queue up all events for processing. This measures the overhead of the communication mechanism itself, separate from React's state updates.

##### Test results

| Metric | Callbacks | Event-Driven |
|--------|-----------|--------------|
| Processing Duration | 0.2-0.5 ms | 0.2-0.5 ms |
| Dispatch Duration | 2-3 ms | 40-60 ms |

#### Analysis

##### Processing Duration

Both approaches showed nearly identical processing durations (0.2-0.5 ms), indicating that React's state update mechanisn performs similarly regardless of how the events were triggered. This makes sense since both implementations use the same React state update patterns once an event is received.

##### Dispatch Duration

The significant difference in dispatch duration reveals an important performance consideration:

- **Callbacks (2-3 ms)**: Direct function invocation has minimal overhead. When a callback is triggered, it's simply a JavaScript function call, which is extremely efficient.
- **Event-Driven (40-60 ms)**: The CustomEvent system has considerably higher overhead. Each event must be created, dispatched through the DOM event system, bubbled up the tree, and processed by event listeners.

#### Performance implications
- **For High-Volume Events**: The callbacks approach is dramatically more efficient for applications that need to process thousands of events in rapid succession (like games, visualizations, or real-time data processing).

- **For Typical Applications**: For most user-driven applications where events occur at human interaction speeds (clicks, typing), the performance difference becomes negligible compared to other architectural benefits.

- **Scaling Considerations**: As applications grow in complexity, the dispatch performance difference may be offset by the reduced complexity and maintenance benefits of the event-driven approach.

### Trade-offs
The performance cost of the event-driven approach should be weighed against its architectural benefits:

- **Callbacks**: Better performance but more complex component relationships
- **Event-Driven**: Lower performance but more flexible and maintainable architecture

## Conclusions

**When to use Callbacks**
- Small to medium component trees
- When clear parent-child relationships exist
- When explicit data flow is important for maintenance
- For teams familiar with standard React patterns

**When to use Event-Driven**
- Larger applications with complex component relationships
- When components need to communicate across different parts of the app
- When you want to reduce prop drilling
- For more decoupled component architecture

### Future considerations
The custom Event-Driven system used in this project is not optimized and introduces considerable overhead. Is there other better ways to implement an Event-Driven Architecture for clean React component communication? Do state-management libraries like React Redux and Zustand offer better alternatives next to centralized state management? Are there ready-made libraries for event-driven architecture that are more optimized? Future considerations include:
- Exploring other communciation patterns (Context API, React Redux, Zustand, etc.)
- Hybrid approaches combining both patterns
- Performance optimized event-systems