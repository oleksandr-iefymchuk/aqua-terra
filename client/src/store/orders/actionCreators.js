import { GET_ORDERS } from './actionTypes';

export const getOrders = orders => ({
  type: GET_ORDERS,
  payload: orders
});
