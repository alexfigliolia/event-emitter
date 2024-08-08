export type MessageMap<T = any> = Record<string, T>;

export type Callback<A extends any[] = never[], V = void | Promise<void>> = (
  ...args: A
) => V;

export type Listener<T> = Callback<[event: T]>;
