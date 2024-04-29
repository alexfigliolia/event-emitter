import { AutoIncrementingID } from "./AutoIncrementingID";
import type { Listener } from "./types";

/**
 * Indexer
 *
 * Storage for the `EventEmitter`'s listeners. The `Indexer`
 * is an extension of the map prototype that provides ordered
 * indexing of callbacks with unique identifier for each index
 */
export class Indexer<
  T extends (...args: any[]) => void | Promise<void>
> extends Map<string, T> {
  private IDs = new AutoIncrementingID();

  /**
   * Register
   *
   * Indexes a callback on the map and returns its unique
   * identifier
   */
  public register(callback: T) {
    const ID = this.IDs.get();
    this.set(ID, callback);
    return ID;
  }

  /**
   * Execute
   *
   * Iterates over each lister on the map and executes it with
   * the provided parameters
   */
  public execute(...params: Parameters<T>) {
    for (const [_, listener] of this) {
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
    for (const [_, listener] of this) {
      await listener(...params);
    }
  }

  /**
   * Execute Blocking
   *
   * Iterates over each lister on the map and executes it. Using
   * this method will cause asynchronous operations to be handled
   * concurrently
   */
  public async executeConcurrent(...params: Parameters<T>) {
    const tasks: ReturnType<Listener<T>>[] = [];
    for (const [_, listener] of this) {
      tasks.push(listener(...params));
    }
    return Promise.all(tasks);
  }
}
