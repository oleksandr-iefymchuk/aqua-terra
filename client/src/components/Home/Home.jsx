import './Home.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { BUTTON_LABELS, categories } from '../../constans/constants';

import Banner from './components/Banner/Banner';
import ButtonWrapper from '../../common/Button/Button';
import ProductList from '../../common/ProductList/ProductList';
import CatalogBatton from '../../common/CatalogBatton/CatalogBatton';

const Home = () => {
  const { BUTTON_CATALOG } = BUTTON_LABELS;
  const products = useSelector((state) => state.products);

  const [categoryIndexes, setCategoryIndexes] = useState({});
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });

  const setCurrentIndex = (category, index) => {
    setCategoryIndexes((prevIndexes) => ({
      ...prevIndexes,
      [category]: index,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homeWrapper">
      <Banner />
      {isMobileDevice && (
        <CatalogBatton
          categories={categories}
          iconBurger="menu"
          buttonText={BUTTON_CATALOG}
          buttonClassName="homeCatalogBtn"
        />
      )}

      <div className="productsList">
        {categories.map((categoryData) => {
          const { name: categoryName, subcategories } = categoryData;

          const categoryProducts = subcategories.reduce((acc, subcategory) => {
            const subcategoryProducts = products.filter(
              (product) => product.subcategory === subcategory.name,
            );
            return [...acc, ...subcategoryProducts];
          }, []);

          const currentIndex = categoryIndexes[categoryName] || 0;
          const displayedProducts = categoryProducts.slice(
            currentIndex,
            currentIndex + 2,
          );

          return (
            <div className="productCategory" key={categoryName}>
              <div className="categoryTitle">
                <h2>{categoryName}</h2>
                <ButtonWrapper
                  buttonClassName="categoryButtons"
                  disabled={currentIndex === 0}
                  onClick={() =>
                    setCurrentIndex(categoryName, currentIndex - 2)
                  }
                  icon="arrowPrev"
                />
                <ButtonWrapper
                  buttonClassName="categoryButtons"
                  disabled={currentIndex + 2 >= categoryProducts.length}
                  onClick={() =>
                    setCurrentIndex(categoryName, currentIndex + 2)
                  }
                  icon="arrowNext"
                />
              </div>
              <ProductList products={displayedProducts} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
