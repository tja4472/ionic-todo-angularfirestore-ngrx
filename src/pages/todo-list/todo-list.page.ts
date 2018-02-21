import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ActionSheetController,
  NavController,
  ModalController,
  PopoverController,
} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../../services/todo.service';

import {
  TodoListPopover,
  TodoListPopoverResult,
} from '../../components/todo-list-popover/todo-list.popover';
import { Todo } from '../../shared/models/todo.model';
import {
  TodoDetailModal,
  getModalInput,
  ModalResult,
} from '../../modals/todo-detail/todo-detail.modal';
import { ReorderArrayIndexes } from '../../shared/models/reorder-array-indexes.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-page-todo-list',
  templateUrl: 'todo-list.page.html',
})
export class TodoListPage {
  todos$: Observable<Todo[]>;

  aaaa$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public actionSheetCtrl: ActionSheetController,
    private todoService: TodoService,
  ) {
    //
    this.todos$ = todoService.getData$();
  }

  ionViewDidLoad() {
   //
    this.todoService.ListenForDataStart();
  }

  ionViewWillUnload() {
    //
    console.log('ionViewWillUnload');
    this.todoService.ListenForDataStop();
  }

  addItem() {
    console.log('addItem');
    this.showModal();
  }

  toggleCompleteItem(item: Todo) {
    /*
    const newItem: Todo = Object.assign(new Todo(), item);
    newItem.isComplete = !newItem.isComplete;
    this.todoService.save(newItem);
*/
    const newItem: Todo = { ...item, isComplete: !item.isComplete };
    this.todoService.upsertItem(newItem);
  }

  editItem(item: Todo) {
    console.log('editItem:item>', item);
    this.showModal(item);
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          handler: () => {
            console.log('Clear completed clicked');
            this.todoService.clearCompletedItems();
          },
          text: 'Clear completed?',
        },
        {
          handler: () => {
            console.log('Cancel clicked');
          },
          role: 'cancel',
          text: 'Cancel',
        },
      ],
    });
    actionSheet.present();
  }

  presentPopover(ev: any) {
    const popover = this.popoverCtrl.create(TodoListPopover);

    popover.onDidDismiss((result: TodoListPopoverResult) => {
      console.log('popover.onDidDismiss>', result);

      if (!!!result) {
        // no result.
        console.log('result is null.');
        return;
      }

      console.log('result.clearCompleted>', result.clearCompleted);
      if (result.clearCompleted) {
        this.todoService.clearCompletedItems();
        return;
      }
    });

    /*
        popover.onDidDismiss((data: string) => {
          if (data === 'ClearCompleted') {
            this.todoService.clearCompletedItems();
          }
        });
    */
    popover.present({
      ev,
    });
  }

  reorderItems(indexes: ReorderArrayIndexes) {
    console.log('reorderItems:indexes>', indexes);
    console.log('reorderItems:indexes.from>', indexes.from);
    console.log('reorderItems:indexes.to>', indexes.to);
    this.todoService.reorderItems(indexes);
    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }

  removeItem(item: Todo) {
    console.log('removeItem:item>', item);
    this.todoService.deleteItem(item);
  }

  private showModal(item?: Todo) {
    //
    const modalInput = getModalInput(item);
    const modal = this.modalCtrl.create(TodoDetailModal, modalInput);

    modal.onDidDismiss((data: ModalResult | null) => {
      console.log('onDidDismiss>', data);

      if (data === null) {
        console.log('onDidDismiss:NULL');
        return;
      }

      if (data.save && data.item) {
        this.todoService.upsertItem(data.item);
      }
    });

    modal.present();
  }
}
