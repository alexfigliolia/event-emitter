import { Subscriptable } from "./Subscriptable";
import type { Listener, MessageMap } from "./types";

/**
 * Event Emitter
 *
 * A low-code solution for type-safe event emitting outside of
 * the global scope
 *
 * ```typescript
 * const emitter = new EventEmitter<{
 *   "event-1": number[],
 *   "event-2": Map<string, () => {}>
 * }>();
 *
 * // Subscribe to permitted events
 * const ID1 = emitter.on("event-1", list => {});
 * const ID2 = emitter.on("event-2", map => {});
 *
 * // Emit permitted events
 * emitter.emit("event-1", [1, 2, 3]);
 * emitter.emit("event-2", new Map());
 *
 * // Clean up listeners to events
 *
 * emitter.off("event-1", ID1);
 * emitter.off("event-2", ID2);
 * ```
 */
export class EventEmitter<T extends MessageMap = MessageMap> {
  public readonly storage = new Map<keyof T, Subscriptable<Listener<any>>>();
  /**
   * On
   *
   * Registers an event handler on the `EventEmitter`. Your handler will
   * be invoked each time `EventEmitter.emit()` is called with an event
   * matching your handler.
   *
   * ```typescript
   * const emitter = new EventEmitter();
   *
   * const listenerID = emitter.on("event-1", event => {
   *   console.log("event-1", event);
   * });
   *
   * // Cleaning up
   * emitter.off("event-1", listenerID);
   * ```
   */
  public on<E extends keyof T>(event: E, listener: Listener<T[E]>) {
    const subscriptable = this.storage.get(event) || new Subscriptable();
    const ID = subscriptable.register(listener);
    this.storage.set(event, subscriptable);
    return ID;
  }

  /**
   * Off
   *
   * Removes an event handler from the `EventEmitter` given an
   * event and lister ID
   */
  public off<E extends keyof T>(event: E, ID: string) {
    const subscriptable = this.storage.get(event);
    if (!subscriptable) {
      return false;
    }
    const removed = subscriptable.remove(ID);
    if (!subscriptable.length) {
      this.storage.delete(event);
    }
    return removed;
  }

  /**
   * Emit
   *
   * Streams an event to all subscribers
   */
  public emit<E extends keyof T>(event: E, payload: T[E]) {
    const subscriptable = this.storage.get(event);
    if (subscriptable) {
      subscriptable.execute(payload);
    }
  }

  /**
   * Emit
   *
   * Streams an event to all subscribers handling
   * asynchronous subscriptions as sequential blocking tasks.
   * Returns a promise that'll resolve after all tasks complete
   */
  public emitBlocking<E extends keyof T>(event: E, payload: T[E]) {
    const subscriptable = this.storage.get(event);
    if (subscriptable) {
      return subscriptable.executeBlocking(payload);
    }
  }

  /**
   * Emit Concurrent
   *
   * Streams an event to all subscribers handling
   * asynchronous subscriptions as concurrent tasks.
   * Returns a promise that'll resolve after all tasks
   * complete
   */
  public async emitConcurrent<E extends keyof T>(event: E, payload: T[E]) {
    const subscriptable = this.storage.get(event);
    if (subscriptable) {
      return subscriptable.executeConcurrent(payload);
    }
  }
}
