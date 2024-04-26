import './Pagination.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ButtonWrapper from '../Button/Button';
import ProductList from '../ProductList/ProductList';

const Pagination = ({ products }) => {
  const maxButtons = 3;
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const middleButtonIndex = Math.floor(maxButtons / 2);
  const startPage = Math.max(1, currentPage - middleButtonIndex);
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [products, currentPage, totalPages]);

  return (
    <div className="pagination">
      <ProductList className="products" products={currentProducts} />

      <div className="paginationBtnBlock">
        {totalPages > 0 && (
          <ButtonWrapper
            buttonClassName="paginationButtons"
            icon="arrowPrev"
            svgColor="#000"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        )}
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <ButtonWrapper
              key={pageNumber}
              buttonClassName={
                pageNumber === currentPage
                  ? 'paginationButtons active'
                  : 'paginationButtons'
              }
              buttonText={pageNumber.toString()}
              onClick={() => handlePageChange(pageNumber)}
            />
          );
        })}
        {totalPages > 0 && (
          <ButtonWrapper
            buttonClassName="paginationButtons"
            icon="arrowNext"
            svgColor="#000"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        )}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  products: PropTypes.array.isRequired,
};

export default Pagination;
