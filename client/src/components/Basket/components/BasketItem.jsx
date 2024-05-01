import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './BasketItem.scss';

import { updateQuantityThunk } from '../../../store/thunk';
import { removeFromBasket } from '../../../store/user/actionCreators';

import ButtonWrapper from '../../../common/Button/Button';

import { calculateDiscountedPrice } from '../../../helpers';

const BasketItem = ({ id, images, title, price, quantity, discount }) => {
  const dispatch = useDispatch();
  const basketProducts = useSelector(state => state.user.basketProducts);
  const products = useSelector(state => state.products);
  const currentProduct = products.find(product => product.id === id);

  const oldTotalPrice = price * quantity;
  const newTotalPrice = calculateDiscountedPrice(price, discount) * quantity;

  const handleRemoveFromBasket = update => {
    const currentBasketproduct = basketProducts.find(item => item.id === id);
    const quantityToRemove = currentBasketproduct
      ? currentBasketproduct.quantity
      : 0;
    dispatch(updateQuantityThunk(id, quantityToRemove, update));
    dispatch(removeFromBasket(id));
  };

  const handleUpdateQuantity = update => {
    dispatch(updateQuantityThunk(id, 1, update));
  };

  return (
    <div className='basket-item'>
      <div className='basket-item-info'>
        <img src={images[0]} alt={title} />
        <p>{title}</p>
      </div>
      <div className='basket-cost-block'>
        <div className='quantity-control-btn'>
          <ButtonWrapper
            buttonClassName={
              quantity <= 1
                ? 'disabled-btn-increase-quantity'
                : 'active-btn-increase-quantity'
            }
            disabled={quantity <= 1}
            onClick={() => handleUpdateQuantity('decrease')}
            icon='minus'
          />
          <p className='quantity'>{quantity}</p>
          <ButtonWrapper
            buttonClassName={
              currentProduct.quantity <= 0
                ? 'disabled-btn-increase-quantity'
                : 'active-btn-increase-quantity'
            }
            disabled={currentProduct.quantity <= 0}
            onClick={() => handleUpdateQuantity('increase')}
            icon='plus'
          />
        </div>
        <div className='price'>
          <p className={discount > 0 ? 'old-price' : 'new-price'}>
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'UAH',
            }).format(oldTotalPrice)}
          </p>

          {discount > 0 && (
            <p className='new-price'>
              {new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: 'UAH',
              }).format(newTotalPrice)}
            </p>
          )}
        </div>
        <ButtonWrapper
          buttonClassName='delete-btn'
          onClick={() => handleRemoveFromBasket('decrease')}
          icon='close'
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
