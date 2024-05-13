import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import userReducer from './user/reducer';
import productsReducer from './products/reducer';
import appReducer from './appReduser/reducer';
import reviewsReducer from './reviews/reducer';

const rootReducer = combineReducers({
  reviews: reviewsReducer,
  user: userReducer,
  products: productsReducer,
  app: appReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
