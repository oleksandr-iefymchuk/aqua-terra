import axios from 'axios';
import { getProducts } from './actionCreators';

const getProductsThunk = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        'https://aqua-terra-server.vercel.app/products'
      );
      dispatch(getProducts(response.data));
    } catch (error) {
      throw new Error(error);
    }
  };
};

export { getProductsThunk };
