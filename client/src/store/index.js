import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/reducer';
import productsReducer from './products/reducer';
import appReducer from './appReduser/reducer';
import reviewsReducer from './reviews/reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  // whitelist: ['user'],
  blacklist: ['products', 'user', 'app']
};

const rootReducer = combineReducers({
  reviews: reviewsReducer,
  user: userReducer,
  products: productsReducer,
  app: appReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
