import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantityThunk } from '../../store/thunk';
import { calculateDiscountedPrice, isNewProduct } from '../../helpers';

import {
  addToBasket,
  addToFavorites,
  removeFromFavorites,
} from '../../store/user/actionCreators';

import './CardProduct.scss';
import ButtonWrapper from '../Button/Button';

const CardProduct = ({
  id,
  images,
  title,
  slug,
  price,
  quantity,
  discount,
  subcategory,
  dateAdded,
}) => {
  const navigate = useNavigate();
  const navigationBasket = () => navigate('/basket');

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const favorites = useSelector((store) => store.user.favoriteProducts);
  const basketProducts = useSelector((store) => store.user.basketProducts);

  const currentProduct = products.find((product) => product.id === id);
  const currentBasketProduct = basketProducts.find(
    (product) => product.id === id,
  );

  const isFavorite = favorites.some((item) => item.id === id);
  const isInBasket = basketProducts.some((item) => item.id === id);

  const handleAddToBasket = () => {
    const newItem = {
      id,
      images,
      title,
      price,
      quantity,
      discount,
      subcategory,
      dateAdded,
    };
    if (!isInBasket) {
      dispatch(addToBasket(newItem));
      dispatch(updateQuantityThunk(id, 1, 'increase'));
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

  return (
    <div className="cardProduct">
      <div className="badges">
        {isNewProduct(dateAdded) && <span className="badgeNew">Новинка</span>}
        {discount > 0 && <span className="badgeDiscount">-{discount}%</span>}
      </div>

      <ButtonWrapper
        buttonBlockClassName="favoritesBtnWrap"
        buttonClassName="favoritesButton"
        icon={isFavorite ? 'favoritesFilled' : 'favorites'}
        svgColor="#f05a00"
        onClick={handleAddToFavotites}
      />
      <Link to={`/${slug}`}>
        <img src={images[0]} alt={title} />
      </Link>
      <div className="cardProductInfo">
        <p>Код: {id}</p>
        <Link to={`/${slug}`}>
          <h3>{title}</h3>
        </Link>
        <p
          className={quantity !== 0 ? 'availableProduct' : 'unavailableProduct'}
        >
          {quantity !== 0 ? 'В наявності' : 'Немає в наявності'}
        </p>

        <div className="cardProductPrice">
          <div className="price">
            <p className={`oldPrice ${discount > 0 ? 'discountedPrice' : ''}`}>
              {new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: 'UAH',
              }).format(price)}
            </p>
            {discount > 0 && (
              <p className="newPrice">
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'UAH',
                }).format(calculateDiscountedPrice(price, discount))}
              </p>
            )}
          </div>

          <ButtonWrapper
            buttonClassName={`${
              currentProduct.quantity <= 0 &&
              (!currentBasketProduct || currentBasketProduct.quantity <= 0)
                ? 'disabledBuyButton'
                : 'activeBuyButton'
            } ${isInBasket ? 'inBasket' : ''}`}
            disabled={
              currentProduct.quantity <= 0 &&
              (!currentBasketProduct || currentBasketProduct.quantity <= 0)
            }
            icon={isInBasket ? 'full-basket' : 'basket'}
            onClick={() => handleAddToBasket()}
          />
        </div>
      </div>
    </div>
  );
};

CardProduct.propTypes = {
  id: PropTypes.string,
  images: PropTypes.array,
  title: PropTypes.string,
  slug: PropTypes.string,
  subcategory: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  dateAdded: PropTypes.string,
  discount: PropTypes.number,
};

export default CardProduct;
