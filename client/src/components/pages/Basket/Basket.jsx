import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Basket.scss';
import BasketItem from './components/BasketItem';
import Button from '../../common/Button/Button';

import { calculateDiscountedPrice } from '../../../helpers';
import SvgIcon from '../../common/SvgIcon';

const Basket = () => {
  const navigate = useNavigate();
  const handleOrder = () => navigate('/order');
  const handlecontinueShopping = () => navigate('/');

  const products = useSelector(state => state.products);
  const basket = useSelector(store => store.user.basket);

  const sum = basket.reduce((total, { productId, quantity }) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      return total + product.price * quantity;
    }
    return total;
  }, 0);

  const totalDiscount = basket.reduce((total, { productId, quantity }) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      const totalPrice = product.price * quantity;
      const discountedPrice = calculateDiscountedPrice(
        totalPrice,
        product.discount
      );
      return total + (totalPrice - discountedPrice);
    }
    return total;
  }, 0);

  const totalAmount = sum - totalDiscount;

  return (
    <div className='basket-wrap'>
      <h2 className='basket-title'>Кошик</h2>
      <div className='basket'>
        {basket.length > 0 && (
          <Button
            buttonClassName='continue-shopping-btn'
            buttonText='Продовжити покупки'
            onClick={handlecontinueShopping}
          />
        )}

        <div className='basket-list'>
          {basket.map(({ productId, quantity }) => {
            const product = products.find(p => p._id === productId);
            return product ? (
              <BasketItem key={productId} {...product} quantity={quantity} />
            ) : null;
          })}
        </div>
        {basket.length > 0 ? (
          <div className='total-amount-block'>
            <p>
              Сума:{' '}
              <span className='sum'>
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'UAH'
                }).format(sum)}
              </span>
            </p>
            <p>
              Знижка:{' '}
              <span className='total-discount'>
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'UAH'
                }).format(totalDiscount)}
              </span>
            </p>
            <p>
              Всього до сплати:{' '}
              <span className='total-amount'>
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'UAH'
                }).format(totalAmount)}
              </span>
            </p>

            <Button
              buttonClassName='order-btn'
              buttonText='Перейти до оформлення'
              onClick={handleOrder}
            />
          </div>
        ) : (
          <div className='empty-basket'>
            <SvgIcon
              name='empty-basket'
              color='#a2a2a2'
              width='300px'
              height='200px'
            />
            <p>В кошику немає товарів. Але це ніколи не пізно виправити :) </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
