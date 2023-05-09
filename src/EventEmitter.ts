import { Indexer } from "./Indexer";
import type { Listener, MessageMap } from "./types";

export class EventEmitter<T extends MessageMap> extends Map<
  keyof T,
  Indexer<Listener<any>>
> {
  public on<E extends Extract<keyof T, string>>(
    event: E,
    listener: Listener<T[E]>
  ) {
    const index = this.get(event) || new Indexer();
    const ID = index.register(listener);
    this.set(event, index);
    return ID;
  }

  public off<E extends Extract<keyof T, string>>(event: E, ID: string) {
    const index = this.get(event);
    if (index) {
      return index.delete(ID);
    }
  }

  public emit<E extends Extract<keyof T, string>>(event: E, param: T[E]) {
    const index = this.get(event);
    if (index) {
      index.execute(param);
    }
  }
}
