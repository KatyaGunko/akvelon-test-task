import { loadingReducer, LoadingState} from './loading/loading.reducer';
import { usersReducer , UsersState } from './users/users.reducer';

export interface AppState {
  loading: LoadingState;
  users: UsersState;
}

export const reducers = {
  users: usersReducer,
  loading: loadingReducer
};
