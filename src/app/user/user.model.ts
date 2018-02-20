export interface User {
  readonly todoListId: string;
}

export function newUser(): User {
  return {
    todoListId: 'default-list',
  };
}
