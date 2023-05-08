import { AutoIncrementingID } from "./AutoIncrementingID";

export class Indexer<
  T extends (...args: any[]) => void | Promise<void>
> extends Map<string, T> {
  private IDs = new AutoIncrementingID();

  public register(callback: T) {
    const ID = this.IDs.get();
    this.set(ID, callback);
    return ID;
  }

  public execute(...params: Parameters<T>) {
    for (const [_, listener] of this) {
      void listener(...params);
    }
  }
}
