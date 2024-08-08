import { AutoIncrementingID } from "./AutoIncrementingID";
import type { Callback, Listener } from "./types";

/**
 * Subscriptable
 *
 * Storage for the `EventEmitter`'s listeners. The `Subscriptable`
 * is an extension of the map prototype that provides ordered
 * indexing of callbacks with unique identifier for each index
 */
export class Subscriptable<T extends Callback> {
  public readonly storage = new Map<string, T>();
  private readonly IDs = new AutoIncrementingID();

  /**
   * Register
   *
   * Indexes a callback on the map and returns its unique
   * identifier
   */
  public register(callback: T) {
    const ID = this.IDs.get();
    this.storage.set(ID, callback);
    return ID;
  }

  /**
   * Remove
   *
   * Deletes a callback by ID. Returns true if a callback with
   * a corresponding ID existed, or false if it does not
   */
  public remove(ID: string) {
    return this.storage.delete(ID);
  }

  /**
   * Execute
   *
   * Iterates over each lister on the map and executes it with
   * the provided parameters
   */
  public execute(...params: Parameters<T>) {
    for (const listener of this) {
      void listener(...params);
    }
  }

  /**
   * Execute Blocking
   *
   * Iterates over each lister on the map and executes it. Using
   * this method will cause asynchronous operations to be handled
   * as sequential blocking tasks
   */
  public async executeBlocking(...params: Parameters<T>) {
    for (const listener of this) {
      await listener(...params);
    }
  }

  /**
   * Execute Concurrent
   *
   * Iterates over each lister on the map and executes it. Using
   * this method will cause asynchronous operations to be handled
   * concurrently
   */
  public async executeConcurrent(...params: Parameters<T>) {
    const tasks: ReturnType<Listener<T>>[] = [];
    for (const listener of this) {
      tasks.push(listener(...params));
    }
    return Promise.all(tasks);
  }

  /**
   * Length
   *
   * Returns the number of entries on the instance
   */
  public get length() {
    return this.storage.size;
  }

  *[Symbol.iterator]() {
    for (const [_, listener] of this.storage) {
      yield listener;
    }
  }
}
