import './Reviews.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { Rating } from '@mui/material';

import ButtonWrapper from '../../../../../Button/Button';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';

const Reviews = ({ id, reviews, setReviews }) => {
  const isMobileDevice = useMediaQuery({ maxWidth: 768 });
  const productReviews = reviews.filter(review => review.productId === id);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(null);
  const [replyToUser, setReplyToUser] = useState(null);
  const [openRepliesIds, setOpenRepliesIds] = useState([]);

  const handleOpenModalForm = (userName, parentCommentId) => {
    setOpenModalForm(true);
    setReplyToUser(userName);
    setParentCommentId(parentCommentId);
  };

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setReplyToUser(null);
    setParentCommentId(null);
  };

  const toggleReplies = reviewId => {
    if (openRepliesIds.includes(reviewId)) {
      setOpenRepliesIds(openRepliesIds.filter(id => id !== reviewId));
    } else {
      setOpenRepliesIds([...openRepliesIds, reviewId]);
    }
  };

  return (
    <div className='reviews-wrapper'>
      <div className='block-add-review'>
        {!isMobileDevice && <p>Залиште свій відгук на цей товар</p>}
        <ButtonWrapper
          buttonClassName='add-review-btn'
          onClick={handleOpenModalForm}
          buttonText='Написати відгук'
        />
      </div>
      {productReviews.map(
        ({ id, userName, rating, comment, date, replies }, index) => (
          <div className='item-review' key={index}>
            <div className='review-header'>
              <h4>{userName}</h4>
              <p className='review-date'>{date}</p>
              <Rating className='review-rating' value={rating} readOnly />
            </div>
            <p>{comment}</p>

            <div className='reply-section'>
              <ButtonWrapper
                buttonClassName='reply-btn'
                onClick={() => handleOpenModalForm(userName, id)}
                buttonText='Відповісти'
                icon='arrow-return'
              />
              {replies.length > 0 && (
                <ButtonWrapper
                  buttonClassName='open-replies-btn'
                  onClick={() => toggleReplies(id)}
                  buttonText={
                    openRepliesIds.includes(id)
                      ? 'Приховати відповіді'
                      : 'Читати всі відповіді'
                  }
                />
              )}

              {openRepliesIds.includes(id) && (
                <div className='replies-list'>
                  {replies
                    .slice()
                    .reverse()
                    .map((reply, replyIndex) => (
                      <div className='item-review' key={replyIndex}>
                        <div className='review-header'>
                          <h4>{reply.userName}</h4>
                          <p className='review-date'>{reply.date}</p>
                        </div>
                        <p>{reply.comment}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )
      )}
      <ReviewFormModal
        id={id}
        reviews={reviews}
        openModalForm={openModalForm}
        closeModalForm={handleCloseModalForm}
        setReviews={setReviews}
        replyToUser={replyToUser}
        parentCommentId={parentCommentId}
      />
    </div>
  );
};

Reviews.propTypes = {
  id: PropTypes.string,
  reviews: PropTypes.array,
  setReviews: PropTypes.func,
};

export default Reviews;
