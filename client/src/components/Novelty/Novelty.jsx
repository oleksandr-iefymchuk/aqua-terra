import { useSelector } from 'react-redux';
import './Novelty.scss';
import { isNewProduct } from '../../helpers';
import SortList from '../../common/SortList/SortList';

const Novelty = () => {
  const products = useSelector((state) => state.products);
  const newProducts = products.filter((product) =>
    isNewProduct(product.dateAdded),
  );

  return (
    <div className="noveltyWrap">
      <h2>Новинки</h2>
      <SortList products={newProducts}></SortList>
    </div>
  );
};

export default Novelty;
