import './ReviewFormModal.scss';
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Fade, TextField, Rating } from '@mui/material';
import ButtonWrapper from '../../../../../Button/Button';
import CustomAlert from '../../../../../CustomAlert/CustomAlert';
import { v4 as uuid } from 'uuid';

const ReviewFormModal = ({
  id,
  reviews,
  openModalForm,
  closeModalForm,
  setReviews,
  replyToUser,
  parentCommentId,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [rating, setRating] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseAlert = () => setNotification(null);

  const handleAddReview = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!rating && !parentCommentId) {
      setNotification({
        severity: 'error',
        message: 'Будь ласка, оцініть товар перед відправкою відгуку',
      });
      return;
    }

    const newReview = {
      id: uuid(),
      userName: name,
      email,
      comment: message,
      date: new Date().toLocaleDateString(),
    };

    if (parentCommentId) {
      const parentComment = reviews.find(
        (review) => review.id === parentCommentId,
      );
      if (parentComment) {
        parentComment.replies.push(newReview);
      }
    } else {
      newReview.productId = id;
      newReview.rating = rating;
      newReview.replies = [];
      reviews.push(newReview);
    }

    setReviews([...reviews]);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setRating(0);
    closeModalForm();
    setNotification({
      severity: 'success',
      message: 'Дякуємо за ваш відгук!',
    });
  };

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
          <div className="formContainer">
            <div className="formHeader">
              {!parentCommentId && <h4>Додати новий відгук</h4>}
              {replyToUser && typeof replyToUser === 'string' && (
                <h4>Відповідь для {replyToUser}</h4>
              )}

              <ButtonWrapper
                buttonClassName="closeFormBtn"
                icon="close"
                onClick={closeModalForm}
              />
            </div>

            <form className="formAddReview" onSubmit={handleAddReview}>
              <TextField
                type="text"
                className="reviewInput"
                label="Ім'я та прізвище"
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="small"
                required
              />
              <TextField
                type="email"
                className="reviewInput"
                label="E-пошта"
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
                required
              />
              <TextField
                multiline
                className="reviewInput textarea"
                label="Повідомлення"
                name="message"
                value={formData.message}
                onChange={handleChange}
                size="small"
                rows={5}
                required
              />
              {!parentCommentId && (
                <div className="ratingStars">
                  <p>Оцінити товар:</p>
                  <Rating
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                  />
                </div>
              )}
              <ButtonWrapper
                buttonClassName="submitReviewBtn"
                type="submit"
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
  id: PropTypes.string,
  reviews: PropTypes.array,
  setReviews: PropTypes.func,
  openModalForm: PropTypes.bool,
  closeModalForm: PropTypes.func,
  onSubmit: PropTypes.func,
  replyToUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  parentCommentId: PropTypes.string,
};

export default ReviewFormModal;
