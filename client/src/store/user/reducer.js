import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  INCREASE_QUANTITY_BASKET,
  DECREASE_QUANTITY_BASKET,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from './actionTypes';

const userInitialState = {
  basketProducts: [],
  favoriteProducts: [],
};

const userReducer = (state = userInitialState, action) => {
  const existingItem = state.basketProducts.find(
    ({ id }) => id === (action.payload ? action.payload.id : null),
  );

  // const isItemInFavorites = state.favoriteProducts.some(
  //   ({ id }) => id === action.payload.id,
  // );
  const isItemInFavorites = state.favoriteProducts.some(
    ({ id }) => id === (action.payload ? action.payload.id : null),
  );

  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        basketProducts: existingItem
          ? state.basketProducts
          : [...state.basketProducts, { ...action.payload, quantity: 0 }],
      };

    case REMOVE_FROM_BASKET:
      return {
        ...state,
        basketProducts: state.basketProducts.filter(
          (product) => product.id !== action.payload,
        ),
      };

    case INCREASE_QUANTITY_BASKET:
      return {
        ...state,
        basketProducts: state.basketProducts.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantity: product.quantity + action.payload.quantity,
              }
            : product,
        ),
      };

    case DECREASE_QUANTITY_BASKET:
      return {
        ...state,
        basketProducts: state.basketProducts.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantity: product.quantity - action.payload.quantity,
              }
            : product,
        ),
      };

    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteProducts: isItemInFavorites
          ? state.favoriteProducts
          : [...state.favoriteProducts, action.payload],
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteProducts: state.favoriteProducts.filter(
          ({ id }) => id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
