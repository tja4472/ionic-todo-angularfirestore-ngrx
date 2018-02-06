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

  clearCompletedTodos(items: Todo[]) {
    console.log('clearCompletedTodos>', items);

    items.map((x: Todo) => {
      console.log('x>', x);

      const todoCompleted = {
        ...newTodoCompleted(),
        description: x.description,
        name: x.name,
      };
      /*
      const todoCompleted = Object.assign(new TodoCompleted(), {
        description: x.description,
        name: x.name,
      });
      */
      this.todoCompletedDataService.save(todoCompleted);

      this.todoDataService.removeItem(x.id);
    });
  }

  public moveToCurrent(item: TodoCompleted) {
    console.log('moveToCurrent>', item);

    const todo: Todo = {
      ...newTodo(),
      description: item.description,
      id: item.id!,
      name: item.name,
    };

    this.todoDataService.save(todo);

    if (item.id === undefined) {
      return;
    }
    this.todoCompletedDataService.removeItem(item.id);
  }
}
