import { Injectable } from '@angular/core';

import { Todo } from '../shared/models/todo.model';

import { TodoCompleted } from '../shared/models/todo-completed.model';
import { TodoDataService } from '../services/todo.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';

// const FIREBASE_KEY = '/todoCompleted';

@Injectable()
export class Fb1DataService {
    constructor(
        private todoCompletedDataService: TodoCompletedDataService,
        private todoDataService: TodoDataService
    ) { }

    clearCompletedTodos(items: Todo[]) {
        console.log('clearCompletedTodos>', items);

        items.map((x: Todo) => {
            console.log('x>', x);
            if (x.$key === undefined) {
                return;
            }
            const todoCompleted = Object.assign(new TodoCompleted(),
                {
                    description: x.description,
                    name: x.name,
                });

            this.todoCompletedDataService.save(todoCompleted);

            this.todoDataService.removeItem(x.$key);
        });
    }

    moveToCurrent(item: TodoCompleted) {
        console.log('moveToCurrent>', item);

        const todo: Todo = new Todo();
        todo.description = item.description;
        // todo.isComplete = item.isComplete;
        todo.name = item.name;

        /*
                const todo: ITodo = {
                    $key: item.$key,
                    description: item.description,
                    index: 0,
                    isComplete: item.isComplete,
                    name: item.name,
                    userId: '',
                };
        */
        this.todoDataService.save(todo);

        if (item.$key === undefined) {
            return;
        }
        this.todoCompletedDataService.removeItem(item.$key);
    }
}
