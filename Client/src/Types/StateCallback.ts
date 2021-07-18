export type Callback<T> = (value?: T) => void;
export type DispatchWithCallback<T> = (value: T, callback?: Callback<T>) => void;
