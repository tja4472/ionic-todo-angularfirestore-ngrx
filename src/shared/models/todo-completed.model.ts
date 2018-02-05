// tslint:disable-next-line:interface-name
export interface TodoCompleted {
  readonly id: string;
  readonly description?: string;
  readonly isComplete: boolean;
  readonly name: string;
}

export function NewTodoCompleted(): TodoCompleted {
  return {
    description: '',
    id: '',
    isComplete: true,
    name: '',
  };
}
