import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { TodoListsItem } from '../../todo-lists-item.model';

@Component({
  selector: 'tja-todo-lists-detail',
  templateUrl: 'todo-lists-detail.component.html',
})
export class TodoListsDetailComponent {
  @Input() public item: TodoListsItem;
  @Output() public itemCancelled = new EventEmitter<TodoListsItem>();
  @Output() public itemSaved = new EventEmitter<TodoListsItem>();

  public viewForm: any;

  // private isEditing: boolean = true;

  private readonly CLASS_NAME = 'TodoListsDetailComponent';

  constructor(public formBuilder: FormBuilder) {
    console.log('###%s:constructor', this.CLASS_NAME);
  }

  ngOnInit() {
    console.log('###%s:ngOnInit>', this.CLASS_NAME, this.item);
    console.log('this.todo.isNew()>', this.item.isNew());
    /*
                if (this.todo.$key === undefined) {
                    this.isEditing = false;
                }
        */
    this.viewForm = this.formBuilder.group({
      name: [this.item.name, Validators.required],
    });
  }

  dismiss() {
    console.log('###%s:dismiss', this.CLASS_NAME);
    this.itemCancelled.emit();
  }

  save() {
    console.log('###%s:save', this.CLASS_NAME);

    if (!this.viewForm.valid) {
      return;
    }

    console.log('this.todoForm.value>', this.viewForm.value);
    console.log('this.todo>', this.item);

    // const editedItem: ITodo = { ...this.todo, ...this.todoForm.value };
    const editedItem: TodoListsItem = Object.assign(
      new TodoListsItem(),
      this.item,
      this.viewForm.value,
    );
    console.log('editedItem>', editedItem);

    this.itemSaved.emit(editedItem);
  }
}
