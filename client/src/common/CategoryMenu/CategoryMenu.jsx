import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './CategoryMenu.scss';
import { useMediaQuery } from 'react-responsive';
import {
  selectCategory,
  selectSubcategory,
  closeCategoryMenu,
  closeMobileMenu,
} from '../../store/appReduser/actionCreators';

import SvgIcon from '../SvgIcon';
import ButtonWrapper from '../Button/Button';

const CategoryMenu = ({ categories }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });

  const isShowCategoryMenu = useSelector(
    (state) => state.app.isShowCategoryMenu,
  );

  const handleCategoryClick = async (category) => {
    dispatch(selectCategory(category.name));
    dispatch(selectSubcategory(null));
    dispatch(closeCategoryMenu());
    dispatch(closeMobileMenu());
    navigate(`/catalog/${category.linkName}`);
  };

  const handleSubcategoryClick = async (subcategory) => {
    dispatch(selectSubcategory(subcategory.name));
    dispatch(selectCategory(null));
    dispatch(closeCategoryMenu());
    dispatch(closeMobileMenu());
    navigate(`/catalog/${subcategory.linkName}`);
  };

  const handleCategoryHover = (category) => {
    setHoveredCategory(category.name);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setIsHovered(false);
  };

  return (
    <div
      className={`categoryMenu ${isShowCategoryMenu ? 'show' : 'hide'}`}
      onMouseLeave={handleMouseLeave}
    >
      {isMobileDevice && (
        <div className="categoryHeader">
          <ButtonWrapper
            buttonClassName="categoryBtn"
            icon="arrowPrev"
            color="#008ec8"
            onClick={() => dispatch(closeCategoryMenu())}
          />
          <h3>Категорія товарів</h3>
          <ButtonWrapper
            buttonClassName="categoryBtn"
            icon="close"
            color="#008ec8"
            onClick={() => {
              dispatch(closeCategoryMenu());
              dispatch(closeMobileMenu());
            }}
          />
        </div>
      )}
      <div className="categoryList">
        {categories.map((categoryData, index) => (
          <div className="category" key={index}>
            <div
              className={`categoryItem ${
                hoveredCategory === categoryData.name ? 'active' : ''
              }`}
              onClick={() => handleCategoryClick(categoryData)}
              onMouseEnter={() => handleCategoryHover(categoryData)}
            >
              {categoryData.name}
              {!isMobileDevice && (
                <SvgIcon name="arrowNext" color="#008ec8"></SvgIcon>
              )}
            </div>
            {isMobileDevice && (
              <ButtonWrapper
                buttonClassName="categoryBtn"
                icon="arrowNext"
                color="#008ec8"
                onClick={() => handleCategoryHover(categoryData)}
              />
            )}
          </div>
        ))}
      </div>
      <div className={`subcategoryMenu ${isHovered ? 'show' : 'hide'}`}>
        {isMobileDevice && (
          <div className="subcategoryHeader">
            <ButtonWrapper
              buttonClassName="categoryBtn"
              icon="arrowPrev"
              color="#008ec8"
              onClick={() => setIsHovered(false)}
            />
            <h3>{hoveredCategory}</h3>
            <ButtonWrapper
              buttonClassName="categoryBtn"
              icon="close"
              color="#008ec8"
              onClick={() => {
                dispatch(closeCategoryMenu());
                dispatch(closeMobileMenu());
              }}
            />
          </div>
        )}
        <div className="subcategoryList">
          {categories
            .filter((category) => category.name === hoveredCategory)
            .map((category) =>
              category.subcategories.map((subcategory, subIndex) => (
                <div
                  key={subIndex}
                  className="subcategoryItem"
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  {subcategory.name}
                </div>
              )),
            )}
        </div>
      </div>
    </div>
  );
};

CategoryMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  isShowCategoryMenu: PropTypes.bool,
  closeCategoryMenu: PropTypes.func,
  closeMenu: PropTypes.func,
};

export default CategoryMenu;
