import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import './UserBox.scss';

import Button from '../../../../../../common/Button/Button';
import { Fragment } from 'react';

const UserBox = () => {
  const basketProducts = useSelector((store) => store.user.basketProducts);
  const favoriteProducts = useSelector((store) => store.user.favoriteProducts);

  const navigate = useNavigate();
  const navigationBasket = () => navigate('/basket');
  const navigationFavorites = () => navigate('/favorites');

  const isMobileDevice = useMediaQuery({ maxWidth: 768 });

  const totalQuantity = basketProducts.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  return (
    <div className="userBox">
      {!isMobileDevice && (
        <Fragment>
          <Button
            buttonClassName="buttonBlock"
            imgClassName="favoritesImg"
            icon="favorites"
            value={favoriteProducts.length}
            onClick={navigationFavorites}
          />
          <Button
            buttonClassName="buttonBlock"
            icon="user"
            onClick={() => console.log('Login')}
          />
        </Fragment>
      )}

      <Button
        buttonClassName="buttonBlock"
        icon="basket"
        value={totalQuantity}
        onClick={navigationBasket}
      />
    </div>
  );
};

export default UserBox;
