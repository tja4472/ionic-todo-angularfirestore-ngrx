import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import {
  TodoCompleted,
  newTodoCompleted,
} from '../../shared/models/todo-completed.model';

interface ModalInput {
  item?: TodoCompleted;
}

export function getModalInput(item: TodoCompleted | undefined) {
  //
  const modalInput: ModalInput = { item };

  return {
    modalInput,
  };
}

export interface ModalResult {
  isRemoved: boolean;
  isCancelled: boolean;
  todo?: TodoCompleted;
}

@Component({
  selector: 'tja-modal-todo-completed-detail',
  templateUrl: 'todo-completed-detail.modal.html',
})
export class TodoCompletedDetailModal {
  public viewTodoCompleted: TodoCompleted;

  private readonly CLASS_NAME = 'TodoCompletedDetailModal';

  constructor(
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);

    const modalInput: ModalInput = this.getModalInput();

    if (modalInput.item === undefined) {
      // new item.
      this.viewTodoCompleted = newTodoCompleted();
    } else {
      // navParams passes by reference.
      this.viewTodoCompleted = { ...modalInput.item };
    }
  }

  public viewItemCancelled() {
    console.log('viewItemCancelled>');
    const modalResult: ModalResult = {
      isCancelled: true,
      isRemoved: false,
    };
    this.viewController.dismiss(modalResult);
  }

  public viewItemRemove() {
    console.log('viewItemRemove');
    const modalResult: ModalResult = {
      isCancelled: false,
      isRemoved: true,
      todo: this.viewTodoCompleted,
    };
    this.viewController.dismiss(modalResult);
  }

  public viewItemSaved(item: TodoCompleted) {
    console.log('viewItemSaved>', item);
    const modalResult: ModalResult = {
      isCancelled: false,
      isRemoved: false,
      todo: item,
    };

    this.viewController.dismiss(modalResult);
  }

  private getModalInput(): ModalInput {
    //
    return this.navParams.get('modalInput');
  }
}
