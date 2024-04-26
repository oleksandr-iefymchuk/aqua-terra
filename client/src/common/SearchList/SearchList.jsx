import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import './SearchList.scss';
import questionMark from '../../assets/question-mark.png';

import ButtonWrapper from '../Button/Button';
import SortList from '../SortList/SortList';

const SearchList = () => {
  const searchValue = useSelector((state) => state.app.searchValue);
  const allProducts = useSelector((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = (products, searchValue) => {
    return products.filter(({ id, title }) => {
      const filteredById = id.toLowerCase().includes(searchValue.toLowerCase());
      const filteredByTitle = title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return filteredById || filteredByTitle;
    });
  };

  const isEmptySearchField = !searchValue || searchValue.trim() === '';

  useEffect(() => {
    if (!isEmptySearchField) {
      const filtered = filterProducts(allProducts, searchValue);
      setFilteredProducts(filtered);
    }
  }, [searchValue, allProducts, isEmptySearchField]);

  return (
    <div className="searchListWrap">
      {filteredProducts.length > 0 ? (
        <Fragment>
          <h2 className="searchListTitle">
            Результати пошуку &quot;
            <span className="searchValue">{searchValue}</span>&quot;
          </h2>
          <SortList products={filteredProducts}></SortList>
        </Fragment>
      ) : (
        <div className="emptySearchList">
          <img
            className="questionMark"
            src={questionMark}
            alt="question mark"
          />
          <div className="searchInfo">
            <h2 className="emptySearchListTitle">
              За запитом &quot;
              <span className="searchValue">{searchValue}</span>&quot; нічого не
              знайдено :(
            </h2>
            <p>
              Перевірте правильність написання запиту, спробуйте використати
              синоніми чи більш загальні запити.
            </p>
            <ButtonWrapper
              buttonClassName="catalogButton"
              onClick={() => console.log('catalogButton')}
              buttonText="Скористатись каталогом"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;
