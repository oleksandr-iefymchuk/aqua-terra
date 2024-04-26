import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/reducer';
import productsReducer from './products/reducer';
import appReducer from './appReduser/reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  // whitelist: ['user'], // Список редьюсеров, которые вы хотите сохранить в персистентном хранилище
  blacklist: ['products', 'user', 'app'], // Список редьюсеров, которые вы хотите исключить из персистентного хранилища
};

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
