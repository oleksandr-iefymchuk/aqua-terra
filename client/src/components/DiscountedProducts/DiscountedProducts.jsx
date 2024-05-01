import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './DiscountedProducts.scss';
import FilterProducts from '../../common/FilterProducts/FilterProducts';

const DiscountedProducts = () => {
  const products = useSelector(state => state.products);
  const discountedProducts = products.filter(({ discount }) => discount > 0);

  const [isShowFilterMenu, setShowFilterMenu] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (discountedProducts) {
      setFilteredProducts(discountedProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='discounted-products'>
      <h2>Товари зі знижкою</h2>
      <FilterProducts
        products={filteredProducts}
        isShowFilterMenu={isShowFilterMenu}
        setShowFilterMenu={setShowFilterMenu}
        showFilterButton={true}
      />
    </div>
  );
};

export default DiscountedProducts;
