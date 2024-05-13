import './Catalog.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { categories } from '../../constants/constants';
import FilterProducts from '../../common/FilterProducts/FilterProducts';

const Catalog = () => {
  const activeCategory = useSelector(store => store.app.selectedCategory);
  const activeSubcategory = useSelector(store => store.app.selectedSubcategory);

  const products = useSelector(state => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
    if (activeCategory) {
      const selectedCategory = categories.find(
        cat => cat.name === activeCategory
      );
      if (selectedCategory) {
        let filteredByCategory = products.filter(product =>
          selectedCategory.subcategories.some(
            subcat => subcat.name === product.subcategory
          )
        );
        setFilteredProducts(filteredByCategory);
      }
    }

    if (activeSubcategory) {
      let filteredProducts = products.filter(
        product => product.subcategory === activeSubcategory
      );
      setFilteredProducts(filteredProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeSubcategory]);

  return (
    <div className='catalog-wrap'>
      <h2>{activeCategory || activeSubcategory || 'Каталог'}</h2>
      <FilterProducts products={filteredProducts} showFilterButton={true} />
    </div>
  );
};

export default Catalog;
