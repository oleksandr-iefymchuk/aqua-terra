import axios from 'axios';
import { getReviwes, addReview, updateReview } from './actionCreators';
import { setLoading } from '../appReduser/actionCreators';

const getReviewsThunk = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('http://localhost:3000/reviews');
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
        'http://localhost:3000/reviews',
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
        `http://localhost:3000/reviews/${review._id}`,
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
