import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import entities from './entities';
import auth from './auth';

export default combineReducers({
  entities,
  auth,
  form: formReducer.plugin({
    newSubscription: (state, action) => {
      switch (action.type) {
        case 'NEW_SUBSCRIPTION_SUCCESS':
          return undefined;
        default:
          return state;
      }
    }
  })
});
