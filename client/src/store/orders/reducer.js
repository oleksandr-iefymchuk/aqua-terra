import { GET_ORDERS } from './actionTypes';

const ordersInitialState = [];

const ordersReducer = (state = ordersInitialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return [...action.payload];

    default:
      return state;
  }
};

export default ordersReducer;
