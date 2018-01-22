import { Action } from '@ngrx/store';
import * as usersActions from './users.actions';
import { IUser } from '../../core/interfaces/user';
import { IPosition } from '../../core/interfaces/position';

export interface UsersState {
  usersList: IUser[];
  selectedUserInfo: IUser;
  userPositions: IPosition[];
}

export const usersInitialState: UsersState = {
  usersList: [],
  selectedUserInfo: null,
  userPositions: []
};

const reducerActions = {};

function updateState(state: UsersState, updates: any) {
  let newUsersList: IUser[];
  let newSelectedUserInfo: IUser;
  let newUserPositions: IPosition[];

  newUsersList = updates.hasOwnProperty('usersList')
    ? [...updates.usersList]
    : state.usersList;

  newSelectedUserInfo = updates.hasOwnProperty('selectedUserInfo')
    ? Object.assign({}, updates.selectedUserInfo)
    : state.selectedUserInfo;

  newUserPositions = updates.hasOwnProperty('userPositions')
    ? [...updates.userPositions]
    : state.userPositions;

  return {
    usersList: newUsersList,
    selectedUserInfo: newSelectedUserInfo,
    userPositions: newUserPositions
  };
}

reducerActions[usersActions.GET_USERS_LIST_SUCCESS] = (
  state: UsersState,
  action: Action
): UsersState => {
  return updateState(state, { usersList: action.payload.usersList });
};

reducerActions[usersActions.GET_USER_POSITIONS_SUCCESS] = (
  state: UsersState,
  action: Action
): UsersState => {
  return updateState(state, { userPositions: action.payload.userPositions });
};

reducerActions[usersActions.GET_USER_INFO_SUCCESS] = (
  state: UsersState,
  action: Action
): UsersState => {
  return updateState(state, {
    selectedUserInfo: action.payload.selectedUserInfo
  });
};

reducerActions[usersActions.CLEAR_SELECTED_USER_INFO] = (
  state: UsersState,
  action: Action
): UsersState => {
  return updateState(state, {
    selectedUserInfo: null
  });
};

export function usersReducer(
  state: UsersState = usersInitialState,
  action: Action
) {
  if (!action) {
    return state;
  }

  return reducerActions[action.type] !== undefined
    ? reducerActions[action.type](state, action)
    : state;
}
