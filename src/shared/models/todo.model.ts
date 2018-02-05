// tslint:disable-next-line:interface-name
export interface Todo {
  readonly description?: string;
  readonly id: string;
  readonly index: number;
  readonly isComplete: boolean;
  readonly name: string;
}

export function NewTodo(): Todo {
  return {
    description: '',
    id: '',
    index: 0,
    isComplete: false,
    name: '',
  };
}
