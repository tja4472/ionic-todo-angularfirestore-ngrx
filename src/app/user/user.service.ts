import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as FromRootReducer from '../../reducers';
import { SetTodoListId } from './user.action';

@Injectable()
export class UserService {
  constructor(private store: Store<FromRootReducer.State>) {}

  public SetTodoListId(todoListId: string): void {
    this.store.dispatch(new SetTodoListId({ todoListId }));
  }
}
