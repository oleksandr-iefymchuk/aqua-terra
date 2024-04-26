import './Reviews.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { Rating } from '@mui/material';

import ButtonWrapper from '../../../../../Button/Button';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';

const Reviews = ({ id, reviews, setReviews }) => {
  const isMobileDevice = useMediaQuery({ maxWidth: 768 });
  const productReviews = reviews.filter((review) => review.productId === id);
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

  const toggleReplies = (reviewId) => {
    if (openRepliesIds.includes(reviewId)) {
      setOpenRepliesIds(openRepliesIds.filter((id) => id !== reviewId));
    } else {
      setOpenRepliesIds([...openRepliesIds, reviewId]);
    }
  };

  return (
    <div className="reviewsWrapper">
      <div className="blockAddReview">
        {!isMobileDevice && <p>Залиште свій відгук на цей товар</p>}
        <ButtonWrapper
          buttonClassName="addReviewBtn"
          onClick={handleOpenModalForm}
          buttonText="Написати відгук"
        />
      </div>
      {productReviews.map(
        ({ id, userName, rating, comment, date, replies }, index) => (
          <div className="itemReview" key={index}>
            <div className="reviewHeader">
              <h4>{userName}</h4>
              <p className="reviewDate">{date}</p>
              <Rating className="reviewRating" value={rating} readOnly />
            </div>
            <p>{comment}</p>

            <div className="replySection">
              <ButtonWrapper
                buttonClassName="replyBtn"
                onClick={() => handleOpenModalForm(userName, id)}
                buttonText="Відповісти"
                icon="arrow-return"
              />
              {replies.length > 0 && (
                <ButtonWrapper
                  buttonClassName="openRepliesBtn"
                  onClick={() => toggleReplies(id)}
                  buttonText={
                    openRepliesIds.includes(id)
                      ? 'Приховати відповіді'
                      : 'Читати всі відповіді'
                  }
                />
              )}

              {openRepliesIds.includes(id) && (
                <div className="repliesList">
                  {replies
                    .slice()
                    .reverse()
                    .map((reply, replyIndex) => (
                      <div className="itemReview" key={replyIndex}>
                        <div className="reviewHeader">
                          <h4>{reply.userName}</h4>
                          <p className="reviewDate">{reply.date}</p>
                        </div>
                        <p>{reply.comment}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ),
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
