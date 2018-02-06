import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { Todo } from '../../models/todo.model';

interface FormModel {
  description: any;
  isComplete: any;
  name: any;
}

@Component({
  selector: 'tja-todo-detail',
  templateUrl: 'todo-detail.component.html',
})
export class TodoDetailComponent {
  @Input('todo') public dataModel: Todo;
  @Output() public itemCancelled = new EventEmitter<Todo>();
  @Output() public itemSaved = new EventEmitter<Todo>();

  public viewForm: any;

  private readonly CLASS_NAME = 'TodoDetailComponent';

  constructor(public formBuilder: FormBuilder) {
    //
    console.log('###%s:constructor', this.CLASS_NAME);
    //  @Input() has no value here.
  }

  ngOnInit() {
    //
    //  @Input() has value here.
    console.log('###%s:ngOnInit>', this.CLASS_NAME);

    this.viewForm = this.formBuilder.group({
      description: [this.dataModel.description],
      isComplete: [this.dataModel.isComplete],
      name: [this.dataModel.name, Validators.required],
    } as FormModel);
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
    console.log('this.dataModel>', this.dataModel);
    const saveItem = this.prepareSaveItem();
    console.log('saveItem>', saveItem);

    this.itemSaved.emit(saveItem);
  }

  private prepareSaveItem(): Todo {
    const formModel: FormModel = this.viewForm.value;

    const saveItem: Todo = {
      ...this.dataModel,
      description: formModel.description,
      isComplete: formModel.isComplete,
      name: formModel.name,
    };

    return saveItem;
  }
}
