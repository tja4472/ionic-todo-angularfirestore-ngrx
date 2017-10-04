import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionSheetController, NavController, ModalController, PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../../services/todo.service';

import { TodoListPopover, ITodoListPopoverResult } from '../../components/todo-list-popover/todo-list.popover';
import { Todo } from '../../shared/models/todo.model';
import { TodoDetailModal } from '../../modals/todo-detail/todo-detail.modal';
import { IReorderArrayIndexes } from '../../shared/models/reorder-array-indexes.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-page-todo-list',
  templateUrl: 'todo-list.page.html',
})
export class TodoListPage {
  todos$: Observable<Todo[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public actionSheetCtrl: ActionSheetController,
    private todoService: TodoService) {
    //
    this.todos$ = todoService.getData();
  }

  ionViewDidLoad() {
    this.todoService.initialise();
  }

  addItem() {
    console.log('addItem');
    this.showModal();
  }

  toggleCompleteItem(item: Todo) {
    console.log('completeItem:item>', item);
    const newItem = Object.assign(item, {});
    newItem.isComplete = !newItem.isComplete;
    // item.isComplete = !item.isComplete;
    /*
        if (item.isComplete) {
              console.log('was true');
          item.isComplete = false;
        } else {
              console.log('was false');
          item.isComplete = true;
        }
    */
    console.log('completeItem:item:BBBB>', newItem);

    this.todoService.save(newItem);

    /*
        if (item.isComplete) {
          this.presentActionSheet();
        }
    */
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
        }, {
          handler: () => {
            console.log('Cancel clicked');
          },
          role: 'cancel',
          text: 'Cancel',
        }
      ]
    });
    actionSheet.present();
  }

  presentPopover(ev: any) {
    const popover = this.popoverCtrl.create(TodoListPopover);

    popover.onDidDismiss((result: ITodoListPopoverResult) => {
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
      ev
    });
  }

  reorderItems(indexes: IReorderArrayIndexes) {
    console.log('reorderItems:indexes>', indexes);
    console.log('reorderItems:indexes.from>', indexes.from);
    console.log('reorderItems:indexes.to>', indexes.to);
    this.todoService.reorderItems(indexes);
    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }

  removeItem(item: Todo) {
    console.log('removeItem:item>', item);
    this.todoService.remove(item);
  }

  private showModal(item?: Todo) {
    //
    const modal = this.modalCtrl.create(TodoDetailModal, { todo: item });

    modal.onDidDismiss((data: Todo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present();
  }
}
