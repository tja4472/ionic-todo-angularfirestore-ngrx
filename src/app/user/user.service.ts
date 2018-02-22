import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as FromRootReducer from '../../reducers';
import { SetTodoListId } from './user.action';
import { take } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private store: Store<FromRootReducer.State>) {}

  todoListId$() {
    return this.store.select(FromRootReducer.getUser_TodoListId);
  }

  public SetTodoListId(todoListId: string): void {
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((authState) => {
        this.store.dispatch(
          new SetTodoListId({ userId: authState.userId, todoListId }),
        );
      });
  }
}
