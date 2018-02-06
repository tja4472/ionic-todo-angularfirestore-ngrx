import { TodoCompleted } from '../../models/todo-completed.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

interface FormModel {
  description: any;
  isComplete: any;
  name: any;
}

@Component({
  selector: 'tja-todo-completed-detail',
  templateUrl: 'todo-completed-detail.component.html',
})
export class TodoCompletedDetailComponent {
  @Input('todoCompleted') public dataModel: TodoCompleted;
  @Output() public itemCancelled = new EventEmitter<TodoCompleted>();
  @Output() public itemRemoved = new EventEmitter<TodoCompleted>();
  @Output() public itemSaved = new EventEmitter<TodoCompleted>();

  public todoForm: any;

  private readonly CLASS_NAME = 'TodoCompletedDetailComponent';

  constructor(public formBuilder: FormBuilder) {
    //
    //  @Input() has no value here.
    console.log('###%s:constructor', this.CLASS_NAME);
  }

  ngOnInit() {
    //
    //  @Input() has value here.
    console.log('###%s:ngOnInit>', this.CLASS_NAME);

    this.todoForm = this.formBuilder.group({
      description: [this.dataModel.description],
      isComplete: [this.dataModel.isComplete],
      name: [this.dataModel.name, Validators.required],
    } as FormModel);
  }

  public viewDismiss() {
    console.log('###%s:viewDismiss', this.CLASS_NAME);
    this.itemCancelled.emit();
  }

  public viewRemove() {
    console.log('###%s:viewRemove', this.CLASS_NAME);
    this.itemRemoved.emit();
  }

  public viewSave() {
    console.log('###%s:viewSave', this.CLASS_NAME);

    if (!this.todoForm.valid) {
      return;
    }

    console.log('this.todoForm.value>', this.todoForm.value);
    console.log('this.todo>', this.dataModel);
    const saveItem = this.prepareSaveItem();
    console.log('saveItem>', saveItem);
    this.itemSaved.emit(saveItem);
  }

  private prepareSaveItem(): TodoCompleted {
    //
    const formModel: FormModel = this.todoForm.value;

    const saveItem: TodoCompleted = {
      ...this.dataModel,
      description: formModel.description,
      isComplete: formModel.isComplete,
      name: formModel.name,
    };

    return saveItem;
  }
}
