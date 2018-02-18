export default function authReducer(state = { loggedIn: false, principal: null }, action) {
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
}
