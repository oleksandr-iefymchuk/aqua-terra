import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Basket.scss';
import BasketItem from './components/BasketItem';
import Button from '../../common/Button/Button';

import { calculateDiscountedPrice } from '../../helpers';
import SvgIcon from '../../common/SvgIcon';

const Basket = () => {
  const navigate = useNavigate();
  const handleOrder = () => navigate('/order');
  const handlecontinueShopping = () => navigate('/');

  const basketProducts = useSelector((store) => store.user.basketProducts);

  const sum = basketProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const totalDiscount = basketProducts.reduce((total, product) => {
    const currentProduct = basketProducts.find((p) => p.id === product.id);
    const totalPrice = currentProduct
      ? currentProduct.price * product.quantity
      : 0;

    const discountedPrice = calculateDiscountedPrice(
      totalPrice,
      product.discount,
    );

    const discount = totalPrice - discountedPrice;
    return total + discount;
  }, 0);

  const totalAmount = sum - totalDiscount;

  return (
    <div className="basketWrap">
      <h2 className="basketTitle">Кошик</h2>
      <div className="basket">
        {basketProducts.length > 0 && (
          <Button
            buttonClassName="continueShoppingBtn"
            buttonText="Продовжити покупки"
            onClick={handlecontinueShopping}
          />
        )}

        <div className="basketList">
          {basketProducts.map((product) => (
            <BasketItem key={product.id} {...product} />
          ))}
        </div>
        {basketProducts.length > 0 ? (
          <div className="totalAmountBlock">
            <p>
              Сума:{' '}
              <span className="sum">
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'UAH',
                }).format(sum)}
              </span>
            </p>
            <p>
              Знижка:{' '}
              <span className="totalDiscount">
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'UAH',
                }).format(totalDiscount)}
              </span>
            </p>
            <p>
              Всього до сплати:{' '}
              <span className="totalAmount">
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'UAH',
                }).format(totalAmount)}
              </span>
            </p>

            <Button
              buttonClassName="orderBtn"
              buttonText="Перейти до оформлення"
              onClick={handleOrder}
            />
          </div>
        ) : (
          <div className="emptyBasket">
            <SvgIcon
              name="emptyBasket"
              color="#a2a2a2"
              width="300px"
              height="200px"
            />
            <p>В кошику немає товарів. Але це ніколи не пізно виправити :) </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
