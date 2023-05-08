# @generics/event-emitter

### Installation

```bash
npm i -S @generics/event-emitter;
# or yarn
yarn add @generics/event-emitter;
```

### Basic Usage
#### Creating an instance
```typescript
import { EventEmitter } from "@generics/event-emitter";

export const MyEmitter = new EventEmitter();
```

#### Emitting Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

MyEmitter.emit("some-event", /* any data */);
```

#### Subscribing to Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

const ID = MyEmitter.on("some-event", (event) => {
	// any logic you wish!
});

// Cleaning up listeners
MyEmitter.off("some-event", ID);
```

### With Strict Typescript
#### Creating an Instance
```typescript
import { EventEmitter } from "@generics/event-emitter";

type MyEvents = {
	"my-event1": {
		type: "my-event1",
		datapoint: number;
		anotherDatapoint: any
	}
	// ... and so on
}

export const MyEmitter = new EventEmitter<MyEvents>();
```

#### Emitting type-safe Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

MyEmitter.emit("my-event1", {
	type: "my-event1",
	datapoint: 2,
	anotherDatapoint: [1, 2, 3]
});

// Fails typescript validation
MyEmitter.emit("my-event1", {
	type: "my-event1",
	datapoint: "one",
});

// Fails typescript validation
MyEmitter.emit("my-event2", /* event */);
```

#### Subscribing to Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

MyEmitter.on("my-event1", (event: MyEvents["my-events1"]) => {
	// any logic you wish!
});

// Fails typescript validation
MyEmitter.on("my-event2", /* handler */);
```