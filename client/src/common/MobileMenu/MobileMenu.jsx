import './MobileMenu.scss';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { categories, foterNavLinks } from '../../constans/constants';
import ButtonWrapper from '../Button/Button';
import CatalogBatton from '../CatalogBatton/CatalogBatton';
import Logo from '../../components/Header/components/ControlBlock/components/Logo/Logo';
import {
  closeCategoryMenu,
  closeMobileMenu,
  toggleMobileMenu,
} from '../../store/appReduser/actionCreators';

const MobileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favoriteProducts = useSelector((store) => store.user.favoriteProducts);
  const isShowMobileMenu = useSelector((state) => state.app.isShowMobileMenu);

  const navigationHome = () => {
    navigate('/');
    dispatch(toggleMobileMenu());
  };

  const navigationFavorites = () => {
    navigate('/favorites');
    dispatch(toggleMobileMenu());
  };

  const navigationStock = () => {
    navigate('/sale');
    dispatch(toggleMobileMenu());
  };

  const handleCloseMenu = () => {
    dispatch(toggleMobileMenu());
    dispatch(closeCategoryMenu());
  };

  useEffect(() => {
    if (isShowMobileMenu) {
      document.body.classList.add('mobileMenuOpen');
    } else {
      document.body.classList.remove('mobileMenuOpen');
      document.body.classList.remove('categoryMenuOpen');
    }
  }, [isShowMobileMenu]);

  return (
    <Fragment>
      {isShowMobileMenu && (
        <div className="mobileMenuOverlay" onClick={handleCloseMenu}></div>
      )}
      <div className={`mobileMenu ${isShowMobileMenu ? 'show' : 'hide'}`}>
        <div className="mobileMenuNavigation">
          <div className="mobileMenuHeader">
            <div className="mobMenuLogo">
              <Logo onClick={navigationHome} />
              <h3>AquaZone</h3>
            </div>
            <ButtonWrapper
              buttonClassName="mobileMenuCloseBtn"
              icon="close"
              onClick={() => dispatch(closeMobileMenu())}
            />
          </div>
          <div className="mobileUserBox">
            <ButtonWrapper
              buttonClassName="mobileBtnUser"
              buttonText="Кабінет"
              icon="user"
              onClick={() => {
                console.log('Login');
                dispatch(toggleMobileMenu());
              }}
            />

            <ButtonWrapper
              buttonClassName="mobileBtnFavorite"
              imgClassName="favoritesImg"
              buttonText="Улюблене"
              icon="favorites"
              value={favoriteProducts.length}
              onClick={navigationFavorites}
            />
          </div>
          <CatalogBatton
            buttonClassName="mobileMenuCatalogBtn"
            svgWrapperClassName="svgWrapper"
            buttonText="Каталог товарів"
            categories={categories}
            iconBurger="menu"
          />
          <ButtonWrapper
            buttonClassName="mobileBtnStock"
            buttonText="Акції"
            icon="sale"
            onClick={navigationStock}
          />
          <nav className="mobileNavBar">
            <ul>
              {foterNavLinks.map(({ link, name }) => (
                <li key={link} onClick={() => dispatch(toggleMobileMenu())}>
                  <Link to={link}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="schedule">
          Пн-Пт з 09:00 до 18:00 <br />
          Сб-Нд - вихідний
        </p>
      </div>
    </Fragment>
  );
};

MobileMenu.propTypes = {
  props: PropTypes.array,
  onClick: PropTypes.func,
  isShowMobileMenu: PropTypes.bool,
  closeMenu: PropTypes.func,
};
export default MobileMenu;
