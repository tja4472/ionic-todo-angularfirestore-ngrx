import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Todo, newTodo } from '../../shared/models/todo.model';

@Component({
  selector: 'tja-modal-todo-detail',
  templateUrl: 'todo-detail.modal.html',
})
export class TodoDetailModal {
  // Called from view.
  public viewTodo: Todo;

  private readonly CLASS_NAME = 'TodoDetailModal';

  constructor(navParams: NavParams, public viewController: ViewController) {
    console.log(`%s:constructor`, this.CLASS_NAME);

    const paramItem: Todo = navParams.get('todo');

    if (paramItem === undefined) {
      // new item.
      this.viewTodo = newTodo();
    } else {
      // navParams passes by reference.
      this.viewTodo = { ...paramItem };
    }

    console.log('this.viewTodo>', this.viewTodo);
  }

  public viewItemCancelled() {
    console.log('viewItemCancelled>');
    this.viewController.dismiss();
  }

  public viewItemSaved(item: Todo) {
    console.log('viewItemSaved>', item);
    this.viewController.dismiss(item);
  }
}
