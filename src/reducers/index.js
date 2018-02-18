import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import entities from './entities';

export default combineReducers({
  entities,
  form: formReducer.plugin({
    newSubscription: (state, action) => {
      switch(action.type) {
        case 'NEW_SUBSCRIPTION_SUCCESS':
          return undefined;
        default:
          return state;
      }
    }
  }),
})
