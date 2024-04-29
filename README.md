# @figliolia/event-emitter

### Installation

```bash
npm i -S @figliolia/event-emitter
# or yarn
yarn add @figliolia/event-emitter
```

### Basic Usage
#### Creating an instance
```typescript
import { EventEmitter } from "@figliolia/event-emitter";

export const MyEmitter = new EventEmitter();
```

#### Emitting Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

MyEmitter.emit("my-event", /* any data to send to subscribers */);
```

#### Subscribing to Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

const ID = MyEmitter.on("my-event", (data) => {});

// Cleaning up listeners
MyEmitter.off("my-event", ID);
```

### With Strict Typescript
#### Creating a type-safe Instance
```typescript
import { EventEmitter } from "@figliolia/event-emitter";

type MyEvents = {
  event: {
    dataPoint: number;
    anotherDataPoint: any
  },
  // ...rest
}

export const MyEmitter = new EventEmitter<MyEvents>();
```

#### Emitting type-safe Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

MyEmitter.emit("event", {
  dataPoint: 2,
  anotherDataPoint: [1, 2, 3]
});

// Incorrect payload types fail typescript validation
MyEmitter.emit("event", {
  dataPoint: "one",
});

// Unsupported events fail typescript validation
MyEmitter.emit("another-event", /* event */);
```

#### Subscribing to Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

MyEmitter.on("event", (data) => {
  // data is strictly typed to the "event"
});

// Subscriptions to unsupported events fail typescript validation
MyEmitter.on("another-event", /* handler */);
```