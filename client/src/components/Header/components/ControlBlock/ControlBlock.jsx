import './ControlBlock.scss';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {
  searchProduct,
  toggleMobileMenu,
} from '../../../../store/appReduser/actionCreators';

import {
  PLACEHOLDER_LABELS,
  BUTTON_LABELS,
  categories,
} from '../../../../constans/constants';

import Logo from './components/Logo/Logo';
import UserBox from './components/UserBox/UserBox';
import ButtonWrapper from '../../../../common/Button/Button';
import InputWrapper from '../../../../common/Input/Input';
import CatalogBatton from '../../../../common/CatalogBatton/CatalogBatton';
import MobileMenu from '../../../../common/MobileMenu/MobileMenu';
// import CategoryMenu from '../../../Catalog/components/CategoryMenu/CategoryMenu';

const ControlBlock = () => {
  const { BUTTON_SEARCH, BUTTON_CATALOG } = BUTTON_LABELS;
  const { SEARCH_PLACEHOLDER } = PLACEHOLDER_LABELS;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const navigationHome = () => navigate('/');
  const navigationSearchList = () => navigate('/search');

  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });
  const isShowMobileMenu = useSelector((state) => state.app.isShowMobileMenu);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    dispatch(searchProduct(searchValue));
    navigationSearchList();
  };

  return (
    <div className="controlBlockWrapper">
      <div className="controlBlock">
        <Logo onClick={navigationHome} />

        {isMobileDevice ? (
          <Fragment>
            <ButtonWrapper
              buttonClassName="mobileMenuButton"
              icon={!isShowMobileMenu ? 'burger' : 'close'}
              onClick={() => dispatch(toggleMobileMenu())}
            />
            <MobileMenu />
          </Fragment>
        ) : (
          <Fragment>
            <CatalogBatton
              buttonBlockClassName="catalogButtonWrap"
              buttonClassName="catalogButton"
              buttonText={BUTTON_CATALOG}
              categories={categories}
              isShowButtonText={!isMobileDevice}
              iconBurger="menu"
            />
            {/* <CategoryMenu categories={categories} /> */}
          </Fragment>
        )}

        <div className="searchBar">
          <InputWrapper
            placeholder={SEARCH_PLACEHOLDER}
            type="text"
            value={searchValue}
            onChangeInput={handleSearchChange}
          />
          <ButtonWrapper
            disabled={searchValue.trim() === ''}
            buttonClassName="searchButton"
            buttonText={!isMobileDevice && BUTTON_SEARCH}
            icon={isMobileDevice && 'search'}
            onClick={handleSearchSubmit}
          />
        </div>
        <UserBox />
      </div>
    </div>
  );
};

export default ControlBlock;
