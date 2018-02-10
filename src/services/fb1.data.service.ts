import { Injectable } from '@angular/core';

import { newTodo, Todo } from '../shared/models/todo.model';

import {
  TodoCompleted,
  newTodoCompleted,
} from '../shared/models/todo-completed.model';
import { TodoDataService } from '../services/todo.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';

@Injectable()
export class Fb1DataService {
  constructor(
    private todoCompletedDataService: TodoCompletedDataService,
    private todoDataService: TodoDataService,
  ) {}

  clearCompletedTodos(items: Todo[], todoListId: string, userId: string) {
    //
    items.map((x: Todo) => {
      const todoCompleted = {
        ...newTodoCompleted(),
        description: x.description,
        name: x.name,
      };

      this.todoCompletedDataService.save(todoCompleted, todoListId, userId);
      this.todoDataService.removeItem(x.id, todoListId, userId);
    });
  }

  public moveToCurrent(
    item: TodoCompleted,
    todoListId: string,
    userId: string,
  ): void {
    console.log('moveToCurrent>', item);

    const todo: Todo = {
      ...newTodo(),
      description: item.description,
      id: item.id!,
      name: item.name,
    };

    this.todoDataService.save(todo, todoListId, userId);

    if (item.id === undefined) {
      return;
    }
    this.todoCompletedDataService.removeItem(item.id, todoListId, userId);
  }
}
