import './CardInfo.scss';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { TabControlContext } from '../../contexts/TabControlContext';
import initialReviews from '../../constans/reviews';

import {
  addToBasket,
  addToFavorites,
  removeFromFavorites
} from '../../store/user/actionCreators';
import { updateQuantityThunk } from '../../store/thunk';

import ButtonWrapper from '../../common/Button/Button';
import CardInfoTitle from './components/CardInfoTitle/CardInfoTitle';
import CardInfoDescription from './components/CardInfoDescription/CardInfoDescription';

const CardInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });
  const navigationBasket = () => navigate('/basket');

  const [reviews, setReviews] = useState(initialReviews);
  const [cardInfoQuantity, setcardInfoQuantity] = useState(1);
  const [value, setValue] = useState('description');

  const products = useSelector(state => state.products);
  const basketProducts = useSelector(store => store.user.basketProducts);
  const favorites = useSelector(store => store.user.favoriteProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { productSlug } = useParams();
  const cardInfo = products.find(product => product.slug === productSlug);
  if (!cardInfo) {
    return null;
  }

  const { id, images, title, price, quantity, param, description } = cardInfo;

  const isInBasket = basketProducts.find(product => product.id === id);
  const isFavorite = favorites.some(item => item.id === id);

  const handleAddToBasket = () => {
    if (!isInBasket) {
      dispatch(addToBasket(cardInfo));
      dispatch(updateQuantityThunk(id, cardInfoQuantity, 'increase'));
    }
    if (isInBasket) {
      navigationBasket();
    }
  };

  const handleAddToFavotites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites({ id }));
    } else {
      dispatch(addToFavorites({ id }));
    }
  };

  const handleUpdateQuantity = update => {
    if (update === 'increase') {
      setcardInfoQuantity(cardInfoQuantity + 1);
    }
    if (update === 'decrease') {
      setcardInfoQuantity(cardInfoQuantity - 1);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    dotsClass: 'slick-dots slick-thumb',
    nextArrow: <ButtonWrapper buttonClassName='arrow-next' icon='arrow-next' />,
    prevArrow: <ButtonWrapper buttonClassName='arrow-prev' icon='arrow-prev' />,

    customPaging: function (i) {
      return (
        <a>
          <img src={images[i]} alt={title} />
        </a>
      );
    }
  };

  return (
    <TabControlContext.Provider value={{ value, setValue }}>
      <div className='card-info-wrapper'>
        {isMobileDevice && (
          <CardInfoTitle
            id={id}
            title={title}
            quantity={quantity}
            reviews={reviews}
          />
        )}
        <div className='slider-container'>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div className='card' key={index}>
                <img src={image} alt={`${title} фото ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>

        <div className='card-info'>
          <div className='card-info-header'>
            {!isMobileDevice && (
              <CardInfoTitle
                id={id}
                title={title}
                quantity={quantity}
                reviews={reviews}
              />
            )}

            <div className='quantity-block'>
              {isMobileDevice && (
                <span
                  className={
                    quantity !== 0 ? 'available-product' : 'unavailable-product'
                  }
                >
                  {quantity !== 0 ? 'В наявності' : 'Немає в наявності'}
                </span>
              )}
              <p className='card-info-price'>{price} грн.</p>
              <div className='card-info-quantity'>
                <ButtonWrapper
                  buttonClassName={
                    cardInfoQuantity <= 1 || isInBasket
                      ? 'disabled-btn-increase-quantity'
                      : 'active-btn-increase-quantity'
                  }
                  disabled={cardInfoQuantity <= 1 || isInBasket}
                  onClick={() => handleUpdateQuantity('decrease')}
                  icon='minus'
                />
                <p className='quantity'>
                  {isInBasket ? isInBasket.quantity : cardInfoQuantity}
                </p>
                <ButtonWrapper
                  buttonClassName={
                    cardInfoQuantity >= quantity || isInBasket
                      ? 'disabled-btn-increase-quantity'
                      : 'active-btn-increase-quantity'
                  }
                  disabled={cardInfoQuantity >= quantity || isInBasket}
                  onClick={() => handleUpdateQuantity('increase')}
                  icon='plus'
                />

                <ButtonWrapper
                  buttonClassName={`${
                    quantity <= 0 && (!isInBasket || isInBasket.quantity <= 0)
                      ? 'disabled-buy-btn'
                      : 'active-buy-btn'
                  } ${isInBasket ? 'in-basket' : ''}`}
                  disabled={
                    quantity <= 0 && (!isInBasket || isInBasket.quantity <= 0)
                  }
                  icon={isInBasket ? 'check-mark' : 'basket'}
                  buttonText={isInBasket ? 'В кошику' : 'До кошика'}
                  onClick={() => handleAddToBasket()}
                />
              </div>
              <div className='favorites-balance-controls'>
                <ButtonWrapper
                  buttonClassName='balance-btn'
                  icon='balance'
                  onClick={() => console.log('balance-btn')}
                  buttonText={isMobileDevice && 'Порівняти'}
                />
                <ButtonWrapper
                  buttonClassName='favorites-btn'
                  icon={isFavorite ? 'favorites-filled' : 'favorites'}
                  svgColor='#f05a00'
                  buttonText={
                    isMobileDevice
                      ? isFavorite
                        ? 'В обраному'
                        : 'До обраного'
                      : ''
                  }
                  onClick={handleAddToFavotites}
                />
              </div>
            </div>
          </div>
          <CardInfoDescription
            productId={id}
            description={description}
            param={param}
            setReviews={setReviews}
          ></CardInfoDescription>
        </div>
      </div>
    </TabControlContext.Provider>
  );
};

export default CardInfo;
