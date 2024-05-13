import {
  SET_USER_DATA,
  LOGOUT,
  MESSAGE_USER,
  MESSAGE_CLEARING,
  ADD_TO_BASKET,
  REMOVE_FROM_FAVORITES,
  REMOVE_FROM_BASKET,
  INCREASE_QUANTITY_BASKET,
  DECREASE_QUANTITY_BASKET
} from './actionTypes';

const userInitialState = {
  isAuthenticated: false,
  error: null,
  _id: '',
  name: '',
  email: '',
  isAdmin: false,
  basket: [],
  favorites: []
};

const userReducer = (state = userInitialState, action) => {
  const existingItem = state.basket?.find(
    ({ id }) => id === (action.payload ? action.payload.id : null)
  );

  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        error: null
      };

    case LOGOUT:
      return userInitialState;

    case MESSAGE_USER:
      return {
        ...state,
        message: action.payload.message,
        messageType: action.payload.messageType
      };

    case MESSAGE_CLEARING:
      return {
        ...state,
        message: null,
        messageType: ''
      };

    // case ADD_TO_FAVORITES:
    //   return {
    //     ...state,
    //     favorites: isItemInFavorites
    //       ? state.favorites
    //       : [...state.favorites, action.payload]
    //   };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(({ id }) => id !== action.payload.id)
      };

    case ADD_TO_BASKET:
      return {
        ...state,
        basket: existingItem
          ? state.basket
          : [...state.basket, { ...action.payload, quantity: 0 }]
      };

    case REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter(product => product.id !== action.payload)
      };

    case INCREASE_QUANTITY_BASKET:
      return {
        ...state,
        basket: state.basket.map(product =>
          product.id === action.payload.id
            ? {
                ...product,
                quantity: product.quantity + action.payload.quantity
              }
            : product
        )
      };

    case DECREASE_QUANTITY_BASKET:
      return {
        ...state,
        basket: state.basket.map(product =>
          product.id === action.payload.id
            ? {
                ...product,
                quantity: product.quantity - action.payload.quantity
              }
            : product
        )
      };

    default:
      return state;
  }
};

export default userReducer;
