import { Action } from '@ngrx/store';
import * as loadingActions from './loading.actions';

export interface LoadingState {
  getUsersInProgress: boolean;
  userDetailedInfoInProgress: boolean;
  deleteUserInProgress: string;
}

export const loadingInitialState: LoadingState = {
  getUsersInProgress: false,
  userDetailedInfoInProgress: false,
  deleteUserInProgress: ''
};

const reducerActions = {};

function updateState(state: LoadingState, updates: any) {
  return Object.assign({}, state, updates);
}

reducerActions[loadingActions.SET_LOADING_STATE] = (
  state: LoadingState,
  action: Action
): LoadingState => {
  return updateState(state, action.payload);
};

export function loadingReducer(
  state: LoadingState = loadingInitialState,
  action: Action
) {
  if (!action) {
    return state;
  }

  return reducerActions[action.type] !== undefined
    ? reducerActions[action.type](state, action)
    : state;
}
