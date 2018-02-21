import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';

export interface AppState {
  auth: AuthState;
}

export default combineReducers({
  auth
});
