export interface FormAction<T> {
  type: keyof T;
  payload: T[keyof T];
}
