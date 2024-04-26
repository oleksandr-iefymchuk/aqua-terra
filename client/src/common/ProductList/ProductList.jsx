import PropTypes from 'prop-types';
import './ProductList.scss';

import CardProduct from '../CardProduct/CardProduct';

const ProductList = ({ products }) => {
  return (
    <div className="products">
      {products &&
        products.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
