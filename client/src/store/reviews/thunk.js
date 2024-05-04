import axios from 'axios';
import { getReviwes, addReview, updateReview } from './actionCreators';
import { setLoading } from '../appReduser/actionCreators';

const getReviewsThunk = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        'https://aqua-terra-server.vercel.app/reviews'
      );
      dispatch(getReviwes(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error);
    }
  };
};

const addReviewThunk = review => {
  console.log('review:', review);
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        'https://aqua-terra-server.vercel.app/reviews',
        review
      );
      const result = response.data;
      dispatch(addReview(result));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error);
    }
  };
};

const updateReviewThunk = review => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        `https://aqua-terra-server.vercel.app/reviews/${review._id}`,
        review
      );

      const result = response.data;
      console.log('result:', result);
      dispatch(updateReview(result));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error);
    }
  };
};

export { getReviewsThunk, addReviewThunk, updateReviewThunk };
