import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoListsItem } from '../../todo-lists-item.model';

@Component({
  selector: 'tja-todo-lists-list',
  templateUrl: 'todo-lists-list.component.html',
})
export class TodoListsListComponent {
  @Input() public items: TodoListsItem[];
  @Output() public addItem = new EventEmitter();
  @Output() public editItem = new EventEmitter<TodoListsItem>();
  @Output() public removeItem = new EventEmitter<TodoListsItem>();

  private readonly CLASS_NAME = 'TodoListsListComponent';

  constructor() {
    console.log(`%s:constructor`, this.CLASS_NAME);
  }
}
