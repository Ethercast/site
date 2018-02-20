import { Auth0UserProfile } from 'auth0-js';
import { Reducer } from 'redux';

export interface AuthState {
  loggedIn: boolean;
  principal: Auth0UserProfile | null;
  loading: boolean;
}

const authReducer: Reducer<AuthState> = function authReducer(state = {
  loggedIn: false,
  principal: null,
  loading: false
}, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        loggedIn: true,
        principal: action.payload,
        loading: false
      };

    case 'LOGGED_OUT':
      return {
        loggedIn: false,
        principal: null,
        loading: false
      };

    case 'AUTH_LOADING':
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default authReducer;
