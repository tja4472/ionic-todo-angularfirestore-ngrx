// tslint:disable-next-line:interface-name
export interface TodoCompleted {
  readonly $key: string;
  readonly description?: string;
  readonly isComplete: boolean;
  readonly name: string;
}

export function NewTodoCompleted(): TodoCompleted {
  return {
    $key: '',
    description: '',
    isComplete: true,
    name: '',
  };
}
