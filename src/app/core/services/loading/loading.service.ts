import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { LoadingState } from '../../../store/loading/loading.reducer';
import { AppState } from '../../../store/reducer';
import * as loadingActions from '../../../store/loading/loading.actions';

@Injectable()
export class LoadingService {
  private _loadingState: Observable<LoadingState>;

  constructor(private store: Store<AppState>) {
    this._loadingState = this.store.select('loading');
  }

  public get getUsersInProgress$(): Observable<boolean | string> {
    return this._loadingState.map(state => state.getUsersInProgress);
  }

  public setGetUsersInProgress(value: boolean) {
    this.dispatch('getUsersInProgress', value);
  }

  public get userDetailedInfoInProgress$(): Observable<boolean> {
    return this._loadingState.map(state => state.userDetailedInfoInProgress);
  }

  public setUserDetailedInfoInProgress(value: boolean) {
    this.dispatch('userDetailedInfoInProgress', value);
  }

  public get deleteUserInProgress$(): Observable<string> {
    return this._loadingState.map(state => state.deleteUserInProgress);
  }

  public setDeleteUserInProgress(value: string) {
    this.dispatch('deleteUserInProgress', value);
  }

  private dispatch(type: string, value: boolean | string) {
    this.store.dispatch({
      type: loadingActions.SET_LOADING_STATE,
      payload: {
        [type]: value
      }
    });
  }
}
