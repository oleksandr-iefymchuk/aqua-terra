import './CardInfoTitle.scss';
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import Rating from '@mui/material/Rating';

import { messengers } from '../../../../constans/constants';
import ButtonWrapper from '../../../Button/Button';
import { useTabContext } from '../../../../contexts/TabControlContext';

const CardInfoTitle = ({ id, title, quantity, reviews }) => {
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });
  const [isOpen, setIsOpen] = useState(false);
  const { setValue } = useTabContext();

  const productReviews = reviews.filter((review) => review.productId === id);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const togglePopup = () => {
    if (!isOpen) {
      document.body.classList.add('mobileMenuOpen');
    } else {
      document.body.classList.remove('mobileMenuOpen');
    }
    setIsOpen(!isOpen);
  };

  const openNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToReviews = () => {
    const reviewsElement = document.getElementById('reviews');
    if (reviewsElement) {
      reviewsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const timeoutId = setTimeout(() => {
        setValue('reviews');
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  };

  const getReviewsWordForm = (count) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return ['відгук', 'відгуки', 'відгуків'][
      count % 100 > 4 && count % 100 < 20
        ? 2
        : cases[count % 10 < 5 ? count % 10 : 5]
    ];
  };

  return (
    <div className="cardInfoTitle">
      <div className="title">
        <h2>{title}</h2>
        {isOpen && (
          <Fragment>
            <div className="shareOverlay" onClick={togglePopup}></div>
            <div className="sharePopup">
              <div className="sharePopupHeader">
                <h3>Поділитися</h3>
                <ButtonWrapper
                  buttonClassName="closePopupBtn"
                  icon="close"
                  onClick={togglePopup}
                />
              </div>
              {messengers(window.location.href).map((messenger, index) => (
                <ButtonWrapper
                  buttonClassName="messengerBtn"
                  icon={messenger.icon}
                  key={index}
                  onClick={() => openNewTab(messenger.link)}
                />
              ))}
            </div>
          </Fragment>
        )}
      </div>
      <div className="productCode">
        {!isMobileDevice && (
          <p
            className={
              quantity !== 0 ? 'availableProduct' : 'unavailableProduct'
            }
          >
            {quantity !== 0 ? 'В наявності' : 'Немає в наявності'}
          </p>
        )}
        <p>
          Код: <span>{id}</span>{' '}
        </p>
        <div className="reviews">
          {productReviews.length > 0 ? (
            <Fragment>
              <Rating
                className="rating"
                value={calculateAverageRating(productReviews)}
                precision={0.5}
                readOnly
              />
              <p className="linkComment" onClick={scrollToReviews}>
                {`${productReviews.length} ${getReviewsWordForm(
                  productReviews.length,
                )}`}
              </p>
            </Fragment>
          ) : (
            <p
              className="linkComment"
              onClick={scrollToReviews}
            >{`Написати відгук`}</p>
          )}
        </div>
        <ButtonWrapper
          buttonClassName="shareButton"
          icon="share"
          onClick={togglePopup}
        />
      </div>
    </div>
  );
};

CardInfoTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  reviews: PropTypes.array,
};

export default CardInfoTitle;
