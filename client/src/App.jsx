import './App.scss';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { categories } from './constants/constants';
import { getProductsThunk } from './store/products/thunk';
import { getReviewsThunk } from './store/reviews/thunk';
import { getUserProfileThunk } from './store/user/thunk';
import { clearMessage, showMessage } from './store/user/actionCreators';
import { toggleLogineModal } from './store/appReduser/actionCreators';

import Header from './components/Header/Header';
// import Registration from './components/Registration/Registration';
// import Login from './components/Login/Login';
import Home from './components/Home/Home';
import About from './components/About/About';
import DiscountedProducts from './components/DiscountedProducts/DiscountedProducts';
import Novelty from './components/Novelty/Novelty';
import DeliveryInfo from './components/DeliveryInfo/DeliveryInfo';
import CardInfo from './common/CardInfo/CardInfo';
import Basket from './components/Basket/Basket';
import Favorites from './components/Favorites/Favorites';
import Footer from './components/Footer/Footer';
import Order from './components/Order/Order';
import SearchList from './common/SearchList/SearchList';
import Catalog from './components/Catalog/Catalog';
import CategoryMenu from './common/CategoryMenu/CategoryMenu';
import Contacts from './components/Contacts/Contacts';
import Breadcrumbs from './common/Breadcrumbs/Breadcrumbs';
import Progress from './common/Progress/Progress';
import CustomAlert from './common/CustomAlert/CustomAlert';
import Authentication from './components/Authentication/Authentication';

const App = () => {
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });
  const { message, messageType, isActivated } = useSelector(
    state => state.user
  );
  const isShowLoginModal = useSelector(state => state.app.isShowLoginModal);
  const tokenString = localStorage.getItem('userInfo');

  const toggleLoginVisibility = () => {
    dispatch(toggleLogineModal());
  };

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getReviewsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(getUserProfileThunk(token));
    }
  }, [dispatch, tokenString]);

  useEffect(() => {
    if (isActivated) {
      dispatch(
        showMessage('Ви успішно підтвердили обліковий запис!', 'success')
      );
    }
  }, [dispatch, isActivated]);

  return (
    <>
      <Router>
        <Header />
        <Breadcrumbs />
        <Progress />
        {isMobileDevice && <CategoryMenu categories={categories} />}
        <CustomAlert
          open={!!message}
          onClose={() => dispatch(clearMessage())}
          message={message}
          severity={messageType}
        />
        <Authentication
          openModalForm={isShowLoginModal}
          closeModalForm={toggleLoginVisibility}
        />
        <main>
          <Routes>
            {/* <Route path='/registration' element={<Registration />} /> */}
            {/* <Route path='/login' element={<Login />} /> */}
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:category' element={<Catalog />} />
            <Route path='/:productSlug' element={<CardInfo />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/order' element={<Order />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/about' element={<About />}></Route>
            <Route path='/contacts' element={<Contacts />}></Route>
            <Route path='/delivery-info' element={<DeliveryInfo />}></Route>
            <Route path='/sale' element={<DiscountedProducts />}></Route>
            <Route path='/novelty' element={<Novelty />}></Route>
            <Route path='/search' element={<SearchList />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
