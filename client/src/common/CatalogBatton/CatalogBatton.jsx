import { useEffect } from 'react';
import ButtonWrapper from '../Button/Button';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import './CatalogBatton.scss';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCategoryMenu } from '../../store/appReduser/actionCreators';

const CatalogBatton = ({
  categories,
  buttonText,
  buttonClassName,
  svgWrapperClassName,
  iconBurger,
}) => {
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });

  const isShowCategoryMenu = useSelector(
    (state) => state.app.isShowCategoryMenu,
  );

  const toggleCategory = () => {
    dispatch(toggleCategoryMenu());
  };

  useEffect(() => {
    if (isShowCategoryMenu && isMobileDevice) {
      document.body.classList.add('categoryMenuOpen');
    } else {
      document.body.classList.remove('categoryMenuOpen');
    }
  }, [isShowCategoryMenu, isMobileDevice]);

  return (
    <div className="catalogButtonWrap">
      {isShowCategoryMenu && isMobileDevice && (
        <div className="categoryMenuOverlay" onClick={toggleCategory}></div>
      )}
      <ButtonWrapper
        buttonClassName={buttonClassName}
        svgWrapperClassName={svgWrapperClassName}
        icon={!isShowCategoryMenu ? iconBurger : 'close'}
        onClick={toggleCategory}
        buttonText={buttonText}
      />
      {!isMobileDevice && <CategoryMenu categories={categories} />}
    </div>
  );
};

CatalogBatton.propTypes = {
  categories: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired,
  iconBurger: PropTypes.string,
  buttonClassName: PropTypes.string,
  svgWrapperClassName: PropTypes.string,
  closeMenu: PropTypes.func,
};

export default CatalogBatton;
