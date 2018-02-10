import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { TodoCompletedService } from '../../services/todo-completed.service';

import { TodoCompleted } from '../../shared/models/todo-completed.model';
import {
  getModalInput,
  ModalResult,
  TodoCompletedDetailModal,
} from '../../modals/todo-completed-detail/todo-completed-detail.modal';

@Component({
  selector: 'tja-page-todo-completed-list',
  templateUrl: 'todo-completed-list.page.html',
})
export class TodoCompletedListPage {
  data$: Observable<TodoCompleted[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public todoCompletedService: TodoCompletedService,
  ) {
    //
    this.data$ = todoCompletedService.getData();
  }

  ionViewDidLoad() {
    this.todoCompletedService.ListenForDataStart();
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload');
    this.todoCompletedService.ListenForDataStop();
  }

  checkItem(item: TodoCompleted) {
    if (!item.isComplete) {
      this.todoCompletedService.moveToCurrent(item);
    }
  }

  editItem(item: TodoCompleted) {
    console.log('editItem:item>', item);
    this.showModal(item);
  }

  toggleCompleteItem(item: TodoCompleted) {
    console.log('toggleCompleteItem:item>', item);

    if (item.isComplete) {
      this.todoCompletedService.moveToCurrent(item);
    }
  }
  /*
    removeItem(item: RemoveItemOutput) {
      console.log('removeItem:item>', item);
      this.todoCompletedService.remove(item);
    }
  */
  private showModal(item?: TodoCompleted) {
    //
    const modalInput = getModalInput(item);
    const modal = this.modalCtrl.create(TodoCompletedDetailModal, modalInput);

    modal.onDidDismiss((modalResult: ModalResult | null) => {
      console.log('onDidDismiss>', modalResult);

      if (modalResult === null) {
        console.log('onDidDismiss:NULL');
        return;
      }

      if (modalResult.isCancelled) {
        return;
      }

      if (modalResult.todo === undefined) {
        return;
      }
      if (modalResult.isRemoved) {
        this.todoCompletedService.deleteItem(modalResult.todo);
        return;
      }

      if (modalResult.todo.isComplete) {
        this.todoCompletedService.upsertItem(modalResult.todo);
      } else {
        this.todoCompletedService.moveToCurrent(modalResult.todo);
      }
    });

    modal.present();
  }
  /*
    const modal = this.modalCtrl.create(TodoCompletedDetailModal, {
      todo: item,
    });

    //    modal.onDidDismiss(data => {
    modal.onDidDismiss((modalResult: ModalResult) => {
      console.log('editItem:onDidDismiss>: modalResult', modalResult);

      if (modalResult.isCancelled) {
        return;
      }

      if (modalResult.todo === undefined) {
        return;
      }
      if (modalResult.isRemoved) {
        this.todoCompletedService.remove(modalResult.todo);
        return;
      }

      if (modalResult.todo.isComplete) {
        this.todoCompletedService.save(modalResult.todo);
      } else {
        this.todoCompletedService.moveToCurrent(modalResult.todo);
      }
    });

    modal.present();
*/
}
