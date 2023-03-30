export type FormEvent<T extends { [key: string]: string }> =
  React.FormEvent<HTMLFormElement> & {
    target: { elements: { [key in keyof T]: { value: T[key] } } }
  }
