export type MessageMap<T extends Record<string, any> = Record<string, any>> =
  Record<string, T>;

export type Listener<T> = (event: T) => void | Promise<void>;
