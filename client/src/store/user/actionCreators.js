import {
  ADD_TO_BASKET,
  INCREASE_QUANTITY_BASKET,
  DECREASE_QUANTITY_BASKET,
  REMOVE_FROM_BASKET,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from './actionTypes';

const addToBasket = (product) => ({
  type: ADD_TO_BASKET,
  payload: product,
});

const increaseQuantityBasket = (id, quantity) => ({
  type: INCREASE_QUANTITY_BASKET,
  payload: { id, quantity },
});

const decreaseQuantityBasket = (id, quantity) => ({
  type: DECREASE_QUANTITY_BASKET,
  payload: { id, quantity },
});

const removeFromBasket = (id) => ({
  type: REMOVE_FROM_BASKET,
  payload: id,
});

const addToFavorites = (product) => ({
  type: ADD_TO_FAVORITES,
  payload: product,
});

const removeFromFavorites = (id) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: id,
});

export {
  addToBasket,
  increaseQuantityBasket,
  decreaseQuantityBasket,
  addToFavorites,
  removeFromFavorites,
  removeFromBasket,
};
