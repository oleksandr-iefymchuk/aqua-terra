import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './BasketItem.scss';

import { updateQuantityThunk } from '../../../store/thunk';
import { removeFromBasket } from '../../../store/user/actionCreators';

import ButtonWrapper from '../../../common/Button/Button';

import { calculateDiscountedPrice } from '../../../helpers';

const BasketItem = ({ id, images, title, price, quantity, discount }) => {
  const dispatch = useDispatch();
  const basketProducts = useSelector((state) => state.user.basketProducts);
  const products = useSelector((state) => state.products);
  const currentProduct = products.find((product) => product.id === id);

  const oldTotalPrice = price * quantity;
  const newTotalPrice = calculateDiscountedPrice(price, discount) * quantity;

  const handleRemoveFromBasket = (update) => {
    const currentBasketproduct = basketProducts.find((item) => item.id === id);
    const quantityToRemove = currentBasketproduct
      ? currentBasketproduct.quantity
      : 0;
    dispatch(updateQuantityThunk(id, quantityToRemove, update));
    dispatch(removeFromBasket(id));
  };

  const handleUpdateQuantity = (update) => {
    dispatch(updateQuantityThunk(id, 1, update));
  };

  return (
    <div className="basketItem">
      <div className="basketItemInfo">
        <img src={images[0]} alt={title} />
        <p>{title}</p>
      </div>
      <div className="basketCostBlock">
        <div className="quantityControlBtn">
          <ButtonWrapper
            buttonClassName={
              quantity <= 1
                ? 'disabledBtnIncreaseQuantity'
                : 'activeBtnIncreaseQuantity'
            }
            disabled={quantity <= 1}
            onClick={() => handleUpdateQuantity('decrease')}
            icon="minus"
          />
          <p className="quantity">{quantity}</p>
          <ButtonWrapper
            buttonClassName={
              currentProduct.quantity <= 0
                ? 'disabledBtnIncreaseQuantity'
                : 'activeBtnIncreaseQuantity'
            }
            disabled={currentProduct.quantity <= 0}
            onClick={() => handleUpdateQuantity('increase')}
            icon="plus"
          />
        </div>
        <div className="price">
          <p className={discount > 0 ? 'oldPrice' : 'newPrice'}>
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'UAH',
            }).format(oldTotalPrice)}
          </p>

          {discount > 0 && (
            <p className="newPrice">
              {new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: 'UAH',
              }).format(newTotalPrice)}
            </p>
          )}
        </div>
        <ButtonWrapper
          buttonClassName="deleteBtn"
          onClick={() => handleRemoveFromBasket('decrease')}
          icon="close"
        />
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  id: PropTypes.string,
  images: PropTypes.array,
  title: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  discount: PropTypes.number,
};

export default BasketItem;
