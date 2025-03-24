# React Component Communication Patterns

This project demonstrates and compares two approaches for component communication in React applications:

1. **Traditional Callbacks** - Using props to pass handler functions down the component tree
2. **Event-Driven Architecture** - Using a custom event system for decoupled communication

## Purpose

The goal is to provide a practical comparison of these two communication patterns, analyzing:
- Component readability and complexity
- Performance characteristics
- Development and maintenance trade-offs

This project was inspired by the article [Event-Driven Architecture for Clean React Component Communication](https://dev.to/nicolalc/event-driven-architecture-for-clean-react-component-communication-fph) by Nicola Castella.

## Live Demo

The application implements two identical interfaces using each pattern. Users can click cells in a grid and see information about the last clicked cell.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository

```
  git clone https://github.com/yourusername/react-event-driven.git cd react-event-driven
```

2. Install dependencies

```
npm install
```

3. Start the development server

```
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

- `/src/components` - UI components including both implementation styles
- `/src/hooks` - Custom hooks including the event system
- `/src/pages` - Page components for each implementation
- `/src/lib` - Utility functions
- `/REPORT.md` - Detailed comparison and analysis

## Key Features

- **Interactive Grid** - Click cells to see location information
- **Performance Testing** - Run tests to compare response times
- **Side-by-Side Comparison** - See both implementations in action
- **Detailed Analysis** - Comprehensive report on findings

## Performance Testing

Each implementation includes a performance test that measures:
- Processing duration - How quickly React updates state
- Dispatch duration - Overhead of the communication mechanism

Run these tests on the respective pages to see the performance differences.

## Findings

A detailed analysis is available in the [full report](./REPORT.md), but key findings include:

- Callbacks are significantly faster for high-volume events (~20x)
- Event-driven architecture reduces component coupling and prop drilling
- Both approaches have valid use cases depending on application needs

## Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Custom event system