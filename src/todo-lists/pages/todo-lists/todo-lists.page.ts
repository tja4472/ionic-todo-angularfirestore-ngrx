import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { TodoListsService } from '../../services/todo-lists.service';

import { TodoListsItem } from '../../todo-lists-item.model';

import { TodoListsDetailModal } from '../../modals/todo-lists-detail/todo-lists-detail.modal';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-page-todo-lists',
  templateUrl: 'todo-lists.page.html',
})
export class TodoListsPage {
  todos$: Observable<TodoListsItem[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private todoService: TodoListsService,
  ) {
    //
    this.todos$ = todoService.getItems$();
  }

  ionViewDidLoad() {
    this.todoService.initialise();
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload');
    this.todoService.unlisten();
  }

  addItem() {
    console.log('addItem');
    this.showModal();
  }

  editItem(item: TodoListsItem) {
    console.log('editItem:item>', item);
    this.showModal(item);
  }

  removeItem(item: TodoListsItem) {
    console.log('removeItem:item>', item);
    this.todoService.remove(item);
  }

  private showModal(item?: TodoListsItem) {
    //
    const modal = this.modalCtrl.create(TodoListsDetailModal, { todo: item });

    modal.onDidDismiss((data: TodoListsItem) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present();
  }
}
