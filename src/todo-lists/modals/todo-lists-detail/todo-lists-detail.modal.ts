import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { TodoListsItem} from '../../todo-lists-item.model';

@Component({
  selector: 'tja-modal-todo-lists-detail',
  templateUrl: 'todo-lists-detail.modal.html',
})
export class TodoListsDetailModal {
  // Called from view.
  public viewItem: TodoListsItem;

  private readonly CLASS_NAME = 'TodoListsDetailModal';

  constructor(
    navParams: NavParams,
    public viewController: ViewController
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
    // navParams passes by reference.
    const navParamsTodo: Readonly<TodoListsItem> = Object.assign(new TodoListsItem(), navParams.get('todo'));
    console.log('navParamsTodo>', navParamsTodo);
    console.log('navParamsTodo.isNew()>', navParamsTodo.isNew());

    this.viewItem = Object.assign(new TodoListsItem(), navParamsTodo);
    console.log('this.todo>', this.viewItem);
    /*
    if (navParamsTodo) {
      //  this.todo = Object.assign(this.todo, paramTodo);
      console.log('paramTodo = true');
      this.viewTodo = Object.assign(new Todo(), navParamsTodo);
    } else {
      console.log('paramTodo = false');
      this.viewTodo = new Todo();
    }
    */


    /*
        this.isEditing = !!paramTodo;

        if (this.isEditing) {
          console.log('isEditing');
          this._todo = paramTodo;
        }
        this.todo = this._todo;
        console.log('+++this.todo>', this.todo);
    */

  }

  public viewItemCancelled() {
    console.log('viewItemCancelled>');
    this.viewController.dismiss();
  }

  public viewItemSaved(item: TodoListsItem) {
    console.log('viewItemSaved>', item);
    this.viewController.dismiss(item);
  }
}
