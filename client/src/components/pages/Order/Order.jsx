import './Order.scss';
import { orderTabStyles } from '../../../muiStyles';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import {
  Tab,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  ThemeProvider
} from '@mui/material';
import {
  adressInputTemplates,
  deliveryOptions,
  paymentOptions,
  userOrderInputTemplates
} from '../../../constants/inputTemplates';
import { calculateDiscountedPrice, calculatePrice } from '../../../helpers';

import ButtonWrapper from '../../common/Button/Button';
import TextMaskCustom from '../Profile/components/MaskedInput/MaskedInput';
import TotalPrice from '../../layout/TotalPrice/TotalPrice';
import { saveOrderThunk } from '../../../store/orders/thunk';
import { clearBasketThunk } from '../../../store/user/thunk';

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id, name, surname, email, phone, city, address, basket } =
    useSelector(store => store.user);
  const products = useSelector(state => state.products);
  const [value, setValue] = useState('customerData');

  const [deliveryOption, setDeliveryOption] = useState('Доставка Новою поштою');
  const [paymentMethod, setPaymentMethod] = useState('Оплата онлайн');
  const [isPaid, setIsPaid] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });

  const { totalPrice } = calculatePrice(products, basket);

  const handleNext = () => {
    if (value === 'customerData') {
      setValue('delivery');
    } else if (value === 'delivery') {
      setValue('payment');
    }
  };

  const handlePersonalInfoChange =
    id =>
    ({ target: { value } }) => {
      setPersonalInfo({ ...personalInfo, [id]: value });
    };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const orderItems = basket
    .map(({ productId, quantity }) => {
      const product = products.find(p => p._id === productId);
      if (product) {
        const discountedPrice = calculateDiscountedPrice(
          product.price,
          product.discount
        );
        return {
          _id: product._id,
          image: product.images[0],
          title: product.title,
          price: discountedPrice,
          quantity,
          total: discountedPrice * quantity
        };
      }
      return null;
    })
    .filter(item => item !== null);

  const handleSubmit = async e => {
    e.preventDefault();

    const orderData = {
      user: {
        _id,
        name: personalInfo.name,
        surname: personalInfo.surname,
        email: personalInfo.email,
        phone: personalInfo.phone,
        deliveryCity: personalInfo.city,
        deliveryAddress: personalInfo.address
      },
      orderItems,
      deliveryOption,
      totalPrice,
      isPaid,
      isDelivered: false,
      paymentMethod
    };

    const tokenString = localStorage.getItem('userInfo');
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(saveOrderThunk(orderData, token, onSaveOrderSucces));
    }
  };

  const onSaveOrderSucces = () => {
    dispatch(clearBasketThunk());
    navigate('/');
  };

  useEffect(() => {
    setPersonalInfo({
      name: name || '',
      surname: surname || '',
      email: email || '',
      phone: phone || '',
      city: city || '',
      address: address || ''
    });
  }, [name, surname, email, phone, city, address]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='order-wrap'>
      <h3>Оформлення замовлення</h3>
      <div className='order-info'>
        <ThemeProvider theme={orderTabStyles}>
          <TabContext value={value}>
            <TabList onChange={handleChangeTab}>
              <Tab label='Дані покупця' value='customerData' />
              <Tab label='Доставка' value='delivery' />
              <Tab label='Оплата' value='payment' />
            </TabList>
            <form onSubmit={handleSubmit}>
              <TabPanel value='customerData'>
                <div className='order-section'>
                  {userOrderInputTemplates.map(({ id, ...otherInputProps }) => {
                    if (id === 'phone') {
                      return (
                        <TextField
                          key={id}
                          {...otherInputProps}
                          value={personalInfo[id]}
                          onChange={handlePersonalInfoChange(id)}
                          size='small'
                          className='user-order-input'
                          variant='standard'
                          InputProps={{
                            inputComponent: TextMaskCustom
                          }}
                        />
                      );
                    }
                    return (
                      <TextField
                        key={id}
                        {...otherInputProps}
                        value={personalInfo[id]}
                        onChange={handlePersonalInfoChange(id)}
                        size='small'
                        className='user-order-input'
                        variant='standard'
                      />
                    );
                  })}
                  <ButtonWrapper
                    buttonClassName='btn-next'
                    buttonText='Далі'
                    onClick={handleNext}
                  />
                </div>
              </TabPanel>
              <TabPanel value='delivery'>
                <div className='order-section'>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Варіант доставки</FormLabel>
                    <RadioGroup
                      value={deliveryOption}
                      onChange={e => setDeliveryOption(e.target.value)}
                    >
                      {deliveryOptions.map(option => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <div className='adress-block'>
                    {adressInputTemplates.map(({ id, ...otherInputProps }) => {
                      return (
                        <TextField
                          key={id}
                          {...otherInputProps}
                          value={personalInfo[id]}
                          onChange={handlePersonalInfoChange(id)}
                          size='small'
                          className='user-order-input'
                          variant='standard'
                        />
                      );
                    })}
                  </div>
                  <ButtonWrapper
                    buttonClassName='btn-next'
                    buttonText='Далі'
                    onClick={handleNext}
                  />
                </div>
              </TabPanel>
              <TabPanel value='payment'>
                <div className='order-section'>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Метод оплати</FormLabel>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={e => setPaymentMethod(e.target.value)}
                    >
                      {paymentOptions.map(option => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <ButtonWrapper
                    buttonClassName='btn-next'
                    type='submit'
                    buttonText='Підтвердити замовлення'
                  />
                </div>
              </TabPanel>
            </form>
          </TabContext>
        </ThemeProvider>
      </div>
      <TotalPrice />
    </div>
  );
};

export default Order;
