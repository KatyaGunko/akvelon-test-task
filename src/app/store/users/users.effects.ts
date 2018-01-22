import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as usersActions from './users.actions';
import * as loadingActions from '../loading/loading.actions';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  @Effect()
  public getUsersList$ = this.actions$
    .ofType(usersActions.GET_USERS_LIST)
    .debounceTime(1000)
    .switchMap(() => {
      const url = `${environment.apiUrl}/users`;
      return this.httpClient
        .get(url, {
          observe: 'response'
        })
        .map(res => {
          return {
            type:
              res.status === 200
                ? usersActions.GET_USERS_LIST_SUCCESS
                : usersActions.GET_USERS_LIST_FAILED,
            payload: {
              usersList: res.body
            }
          };
        })
        .catch(() => {
          return Observable.of({
            type: usersActions.GET_USERS_LIST_FAILED
          });
        });
    });

  @Effect()
  public getUsersListSuccess$ = this.actions$
    .ofType(usersActions.GET_USERS_LIST_SUCCESS)
    .map(() => {
      return {
        type: loadingActions.SET_LOADING_STATE,
        payload: {
          getUsersInProgress: false
        }
      };
    });

  @Effect()
  public getUsersListFailed$ = this.actions$
    .ofType(usersActions.GET_USERS_LIST_FAILED)
    .map(() => {
      return {
        type: loadingActions.SET_LOADING_STATE,
        payload: {
          getUsersInProgress: false
        }
      };
    });

  @Effect()
  public getUserDetailedInfo$ = this.actions$
    .ofType(usersActions.GET_USER_INFO)
    .debounceTime(1000)
    .switchMap(action => {
      const { userId } = action.payload;
      const url = `${environment.apiUrl}/users/${userId}`;
      return this.httpClient
        .get(url, {
          observe: 'response'
        })
        .map(res => {
          return {
            type:
              res.status === 200
                ? usersActions.GET_USER_INFO_SUCCESS
                : usersActions.GET_USER_INFO_FAILED,
            payload: {
              selectedUserInfo: res.body
            }
          };
        })
        .catch(() => {
          return Observable.of({
            type: usersActions.GET_USER_INFO_FAILED
          });
        });
    });

  @Effect()
  public getUserDetailedInfoSuccess$ = this.actions$
    .ofType(usersActions.GET_USER_INFO_SUCCESS)
    .switchMap(() => {
      return Observable.from([
        {
          type: loadingActions.SET_LOADING_STATE,
          payload: {
            userDetailedInfoInProgress: false
          }
        },
        {
          type: usersActions.GET_USERS_LIST
        }
      ]);
    });

  @Effect()
  public getUserDetailedInfoFailed$ = this.actions$
    .ofType(usersActions.GET_USER_INFO_FAILED)
    .map(() => {
      this.router.navigate(['/users']);
      return {
        type: loadingActions.SET_LOADING_STATE,
        payload: {
          userDetailedInfoInProgress: false
        }
      };
    });

  @Effect()
  public saveUserDetailedInfo$ = this.actions$
    .ofType(usersActions.SAVE_USER_INFO)
    .debounceTime(1000)
    .switchMap(action => {
      const { userData } = action.payload;
      const url = `${environment.apiUrl}/users`;

      return this.httpClient
        .post(url, userData, {
          observe: 'response'
        })
        .map(res => {
          return {
            type:
              res.status === 201
                ? usersActions.SAVE_USER_INFO_SUCCESS
                : loadingActions.SET_LOADING_STATE,
            payload:
              res.status === 201
                ? { selectedUserInfo: res.body }
                : { userDetailedInfoInProgress: false }
          };
        })
        .catch(() => {
          return Observable.of({
            type: loadingActions.SET_LOADING_STATE,
            userDetailedInfoInProgress: false
          });
        });
    });

  @Effect()
  public saveUserDetailedInfoSuccess$ = this.actions$
    .ofType(usersActions.SAVE_USER_INFO_SUCCESS)
    .switchMap(() => {
      return Observable.from([
        {
          type: loadingActions.SET_LOADING_STATE,
          payload: {
            userDetailedInfoInProgress: false,
            getUsersInProgress: true
          }
        },
        {
          type: usersActions.GET_USERS_LIST
        }
      ]);
    });

  @Effect()
  public setUserDetailedInfo$ = this.actions$
    .ofType(usersActions.UPDATE_USER_INFO)
    .debounceTime(1000)
    .switchMap(action => {
      const { userId, userData } = action.payload;
      const url = `${environment.apiUrl}/users/${userId}`;

      return this.httpClient
        .put(url, userData, {
          observe: 'response'
        })
        .map(res => {
          return {
            type:
              res.status === 200
                ? usersActions.UPDATE_USER_INFO_SUCCESS
                : loadingActions.SET_LOADING_STATE,
            payload:
              res.status === 200
                ? { selectedUserInfo: res.body }
                : { userDetailedInfoInProgress: false }
          };
        })
        .catch(() => {
          return Observable.of({
            type: loadingActions.SET_LOADING_STATE,
            userDetailedInfoInProgress: false
          });
        });
    });

  @Effect()
  public updateUserDetailedInfoSuccess$ = this.actions$
    .ofType(usersActions.UPDATE_USER_INFO_SUCCESS)
    .switchMap(({ payload }) => {
      return Observable.from([
        {
          type: loadingActions.SET_LOADING_STATE,
          payload: {
            userDetailedInfoInProgress: false,
            getUsersInProgress: true
          }
        },
        {
          type: usersActions.GET_USERS_LIST
        },
        {
          type: usersActions.GET_USER_INFO_SUCCESS,
          payload
        }
      ]);
    });

  @Effect()
  public deleteUserDetailedInfo$ = this.actions$
    .ofType(usersActions.DELETE_USER_INFO)
    .debounceTime(1000)
    .switchMap(action => {
      const { userId } = action.payload;
      const url = `${environment.apiUrl}/users/${userId}`;

      return this.httpClient
        .delete(url, {
          observe: 'response'
        })
        .map(res => {
          return {
            type:
              res.status === 200
                ? usersActions.DELETE_USER_INFO_SUCCESS
                : usersActions.DELETE_USER_INFO_FAILED,
            payload: {
              selectedUserInfo: res.body
            }
          };
        })
        .catch(() => {
          return Observable.of({
            type: usersActions.DELETE_USER_INFO_FAILED
          });
        });
    });

  @Effect()
  public deleteUserDetailedInfoSuccess$ = this.actions$
    .ofType(usersActions.DELETE_USER_INFO_SUCCESS)
    .switchMap(() => {
      return Observable.from([
        {
          type: loadingActions.SET_LOADING_STATE,
          payload: {
            deleteUserInProgress: '',
            getUsersInProgress: true
          }
        },
        {
          type: usersActions.GET_USERS_LIST
        }
      ]);
    });

  @Effect()
  public deleteUserDetailedInfoFailed$ = this.actions$
    .ofType(usersActions.DELETE_USER_INFO_FAILED)
    .map(() => {
      return {
        type: loadingActions.SET_LOADING_STATE,
        payload: {
          deleteUserInProgress: ''
        }
      };
    });

  @Effect()
  public getUserPositions$ = this.actions$
    .ofType(usersActions.GET_USER_POSITIONS)
    .switchMap(() => {
      const url = `${environment.apiUrl}/positions`;

      return this.httpClient
        .get(url, {
          observe: 'response'
        })
        .map(res => {
          return {
            type:
              res.status === 200
                ? usersActions.GET_USER_POSITIONS_SUCCESS
                : usersActions.GET_USER_POSITIONS_FAILED,
            payload: {
              userPositions: res.body
            }
          };
        })
        .catch(() => {
          return Observable.of({
            type: usersActions.GET_USER_POSITIONS_FAILED
          });
        });
    });
}
