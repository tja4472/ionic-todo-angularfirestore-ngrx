import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Todo, newTodo } from '../../shared/models/todo.model';

interface ModalInput {
  item?: Todo;
}

export function getModalInput(item: Todo | undefined) {
  //
  const modalInput: ModalInput = { item };

  return {
    modalInput,
  };
}

export interface ModalResult {
  save: boolean;
  item?: Todo;
}

@Component({
  selector: 'tja-modal-todo-detail',
  templateUrl: 'todo-detail.modal.html',
})
export class TodoDetailModal {
  // Called from view.
  public viewTodo: Todo;

  private readonly CLASS_NAME = 'TodoDetailModal';

  constructor(
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);

    const modalInput: ModalInput = this.getModalInput();

    if (modalInput.item === undefined) {
      // new item.
      this.viewTodo = newTodo();
    } else {
      // navParams passes by reference.
      this.viewTodo = { ...modalInput.item };
    }

    console.log('this.viewTodo>', this.viewTodo);
  }

  public viewItemCancelled() {
    console.log('viewItemCancelled>');
    const result: ModalResult = { save: false };
    this.viewController.dismiss(result);
  }

  public viewItemSaved(item: Todo) {
    console.log('viewItemSaved>', item);
    const result: ModalResult = { save: true, item };
    this.viewController.dismiss(result);
  }

  private getModalInput(): ModalInput {
    //
    return this.navParams.get('modalInput');
  }
}
