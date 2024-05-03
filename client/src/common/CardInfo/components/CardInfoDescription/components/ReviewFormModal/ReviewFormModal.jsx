import './ReviewFormModal.scss';
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Fade, TextField, Rating } from '@mui/material';
import ButtonWrapper from '../../../../../Button/Button';
import CustomAlert from '../../../../../CustomAlert/CustomAlert';
import {
  getReviewsThunk,
  addReviewThunk,
  updateReviewThunk
} from '../../../../../../store/reviews/thunk';

const ReviewFormModal = ({
  productId,
  openModalForm,
  closeModalForm,
  replyToUser,
  parentCommentId
}) => {
  const dispatch = useDispatch();
  const reviews = useSelector(store => store.reviews);

  const [rating, setRating] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCloseAlert = () => setNotification(null);

  const handleSuccess = () => {
    setNotification({
      severity: 'success',
      message: 'Дякуємо за ваш відгук!'
    });
  };

  const handleError = error => {
    console.error('Error:', error);
    setNotification({
      severity: 'error',
      message: 'Не вдалося додати відгук. Будь ласка, спробуйте ще раз.'
    });
  };

  const handleAddReview = e => {
    e.preventDefault();

    const { name, email, message } = formData;
    if (!rating && !parentCommentId) {
      setNotification({
        severity: 'error',
        message: 'Будь ласка, оцініть товар перед відправкою відгуку'
      });
      return;
    }

    const newReview = {
      userName: name,
      userEmail: email,
      comment: message,
      date: new Date().toISOString()
    };

    if (parentCommentId) {
      const parentComment = reviews.find(
        review => review._id === parentCommentId
      );
      if (parentComment) {
        const updatedParentComment = {
          ...parentComment,
          replies: [...parentComment.replies, newReview]
        };

        dispatch(updateReviewThunk(updatedParentComment))
          .then(handleSuccess)
          .catch(handleError);
      }
    } else {
      newReview.productId = productId;
      newReview.rating = rating;
      newReview.replies = [];
      dispatch(addReviewThunk(newReview))
        .then(handleSuccess)
        .catch(handleError);
    }

    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setRating(0);
    closeModalForm();
  };

  useEffect(() => {
    dispatch(getReviewsThunk());
  }, [dispatch, parentCommentId]);

  return (
    <Fragment>
      {notification && (
        <CustomAlert
          open={true}
          onClose={handleCloseAlert}
          severity={notification.severity}
          message={notification.message}
        />
      )}

      <Modal open={openModalForm} onClose={closeModalForm} closeAfterTransition>
        <Fade in={openModalForm}>
          <div className='form-container'>
            <div className='form-header'>
              {!parentCommentId && <h4>Додати новий відгук</h4>}
              {replyToUser && typeof replyToUser === 'string' && (
                <h4>Відповідь для {replyToUser}</h4>
              )}

              <ButtonWrapper
                buttonClassName='close-form-btn'
                icon='close'
                onClick={closeModalForm}
              />
            </div>

            <form className='form-add-review' onSubmit={handleAddReview}>
              <TextField
                type='text'
                className='review-input'
                label="Ім'я та прізвище"
                name='name'
                value={formData.name}
                onChange={handleChange}
                size='small'
                required
              />
              <TextField
                type='email'
                className='review-input'
                label='E-пошта'
                name='email'
                value={formData.email}
                onChange={handleChange}
                size='small'
                required
              />
              <TextField
                multiline
                className='review-input textarea'
                label='Повідомлення'
                name='message'
                value={formData.message}
                onChange={handleChange}
                size='small'
                rows={5}
                required
              />
              {!parentCommentId && (
                <div className='rating-stars'>
                  <p>Оцінити товар:</p>
                  <Rating
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                  />
                </div>
              )}
              <ButtonWrapper
                buttonClassName='submit-review-btn'
                type='submit'
                buttonText={
                  !parentCommentId ? 'Залишити відгук' : 'Залишити відповідь'
                }
              />
            </form>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
};

ReviewFormModal.propTypes = {
  productId: PropTypes.string,
  openModalForm: PropTypes.bool,
  closeModalForm: PropTypes.func,
  onSubmit: PropTypes.func,
  replyToUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  parentCommentId: PropTypes.string
};

export default ReviewFormModal;
