export type Message<T extends Record<string, any> = Record<string, any>> = {
  type: string;
} & T;

export type MessageMap = Record<string, Message>;

export type Listener<T extends Message> = (event: T) => void | Promise<void>;
