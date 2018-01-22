import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../../store/reducer';
import { LoadingService } from '../loading/loading.service';
import { UsersState } from '../../../store/users/users.reducer';
import * as usersActions from '../../../store/users/users.actions';
import { IPosition } from '../../interfaces/position';

@Injectable()
export class UsersService {
  public usersList$: Observable<IUser[]>;
  public selectedUserInfo$: Observable<IUser>;
  public userPositions$: Observable<IPosition[]>;

  constructor(
    private store: Store<AppState>,
    private loadingService: LoadingService
  ) {
    this.usersList$ = this.store
      .select('users')
      .filter((val: UsersState) => !!val.usersList)
      .map((usersState: UsersState) => usersState.usersList);

    this.selectedUserInfo$ = this.store
      .select('users')
      .filter((val: UsersState) => !!val.selectedUserInfo)
      .map((usersState: UsersState) => usersState.selectedUserInfo);

    this.userPositions$ = this.store
      .select('users')
      .filter((val: UsersState) => !!val.userPositions)
      .map((usersState: UsersState) => usersState.userPositions);
  }

  public getUsersList() {
    this.loadingService.setGetUsersInProgress(true);

    this.store.dispatch({
      type: usersActions.GET_USERS_LIST
    });
  }

  public getUserDetailedInfo(userId: string) {
    this.loadingService.setUserDetailedInfoInProgress(true);

    this.store.dispatch({
      type: usersActions.GET_USER_INFO,
      payload: { userId }
    });
  }

  public updateUserDetailedInfo(userId: string, userData: IUser) {
    this.loadingService.setUserDetailedInfoInProgress(true);

    this.store.dispatch({
      type: usersActions.UPDATE_USER_INFO,
      payload: { userId, userData }
    });
  }

  public saveUserDetailedInfo(userData: IUser) {
    this.loadingService.setUserDetailedInfoInProgress(true);

    this.store.dispatch({
      type: usersActions.SAVE_USER_INFO,
      payload: { userData }
    });
  }

  public deleteUser(userId: string) {
    this.loadingService.setDeleteUserInProgress(userId);

    this.store.dispatch({
      type: usersActions.DELETE_USER_INFO,
      payload: { userId }
    });
  }

  public clearSelectedUserInfo() {
    this.store.dispatch({
      type: usersActions.CLEAR_SELECTED_USER_INFO
    });
  }

  public getUserPositions() {
    this.store.dispatch({
      type: usersActions.GET_USER_POSITIONS
    });
  }
}
