import { Auth0DecodedHash } from 'auth0-js';
import { Reducer } from 'redux';

export interface AuthState {
  loggedIn: boolean;
  principal: Auth0DecodedHash | null;
}


const authReducer: Reducer<AuthState> = function authReducer(state = {
  loggedIn: false,
  principal: null
}, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        loggedIn: true,
        principal: action.payload
      };

    case 'LOGGED_OUT':
      return {
        loggedIn: false,
        principal: null
      };

    default:
      return state;
  }
};

export default authReducer;
