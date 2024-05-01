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

  const favoriteProducts = useSelector(store => store.user.favoriteProducts);
  const isShowMobileMenu = useSelector(state => state.app.isShowMobileMenu);

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
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.body.classList.remove('category-menu-open');
    }
  }, [isShowMobileMenu]);

  return (
    <Fragment>
      {isShowMobileMenu && (
        <div className='mobile-menu-overlay' onClick={handleCloseMenu}></div>
      )}
      <div className={`mobile-menu ${isShowMobileMenu ? 'show' : 'hide'}`}>
        <div className='mobile-menu-navigation'>
          <div className='mobile-menu-header'>
            <div className='mobile-menu-logo'>
              <Logo onClick={navigationHome} />
              <h3>AquaZone</h3>
            </div>
            <ButtonWrapper
              buttonClassName='mobile-menu-close-btn'
              icon='close'
              onClick={() => dispatch(closeMobileMenu())}
            />
          </div>
          <div className='mobile-user-box'>
            <ButtonWrapper
              buttonClassName='mobile-btn-user'
              buttonText='Кабінет'
              icon='user'
              onClick={() => {
                console.log('Login');
                dispatch(toggleMobileMenu());
              }}
            />

            <ButtonWrapper
              buttonClassName='mobile-btn-favorite'
              imgClassName='favorites-img'
              buttonText='Улюблене'
              icon='favorites'
              value={favoriteProducts.length}
              onClick={navigationFavorites}
            />
          </div>
          <CatalogBatton
            buttonClassName='mobile-menu-catalog-btn'
            svgWrapperClassName='svg-wrapper'
            buttonText='Каталог товарів'
            categories={categories}
            iconBurger='menu'
          />
          <ButtonWrapper
            buttonClassName='mobile-btn-stock'
            buttonText='Акції'
            icon='sale'
            onClick={navigationStock}
          />
          <nav className='mobile-nav-bar'>
            <ul>
              {foterNavLinks.map(({ link, name }) => (
                <li key={link} onClick={() => dispatch(toggleMobileMenu())}>
                  <Link to={link}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className='schedule'>
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
