import './Login.scss';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { loginInputTemplates } from '../../../../constants/constants';
import { Modal, Fade, TextField } from '@mui/material';

import ButtonWrapper from '../../../../common/Button/Button';
import {
  googleUserRegistrationThunk,
  loginUserThunk
} from '../../../../store/user/thunk';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { showMessage } from '../../../../store/user/actionCreators';

const Login = ({
  openModalForm,
  closeModalForm,
  toggleAuthenticationModal
}) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleGoogleLoginSuccess = useGoogleLogin({
    onSuccess: async response => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`
            }
          }
        );

        dispatch(
          googleUserRegistrationThunk(
            { name: res.data.name, email: res.data.email },
            closeModalForm
          )
        );
      } catch (err) {
        console.log(err);
      }
    },
    onFailure: error => {
      console.log('Login Failed:', error);
      dispatch(showMessage('Не вдалося авторизуватися через Google', 'error'));
    }
  });

  const handleInputChange =
    id =>
    ({ target: { value } }) => {
      setUserData({ ...userData, [id]: value });
    };

  const handleLogin = e => {
    e.preventDefault();
    dispatch(loginUserThunk(userData, closeModalForm));
  };

  return (
    <Fragment>
      <Modal open={openModalForm} onClose={closeModalForm} closeAfterTransition>
        <Fade in={openModalForm}>
          <section className='login-block'>
            <form className='login-form' onSubmit={handleLogin}>
              <div className='login-form-header'>
                <h2>Вхід</h2>
                <ButtonWrapper
                  buttonClassName='close-form-btn'
                  icon='close'
                  onClick={closeModalForm}
                />
              </div>
              <div className='list-login-inputs'>
                {loginInputTemplates.map(({ id, ...otherInputProps }) => {
                  return (
                    <TextField
                      key={id}
                      {...otherInputProps}
                      value={userData[id]}
                      onChange={handleInputChange(id)}
                      size='small'
                      className='login-input'
                      required
                    />
                  );
                })}
              </div>
              <ButtonWrapper
                type='submit'
                buttonText='Увійти'
                buttonClassName='login-btn'
              />
            </form>
            <div className='registration'>
              <p>У вас немає облікового запису?</p>
              <ButtonWrapper
                buttonText='Зареєструватись'
                buttonClassName='registration-btn'
                onClick={toggleAuthenticationModal}
              />
            </div>
            <div className='or'>
              <span className='separator'></span>
              <p>або</p>
              <span className='separator'></span>
            </div>
            <ButtonWrapper
              buttonText='Продовжити з Google'
              buttonClassName='google-btn'
              icon='google'
              onClick={handleGoogleLoginSuccess}
            />
            {/* <GoogleLogin
              onSuccess={credentialResponse => {
                const credentialResponseDecoded = jwtDecode(
                  credentialResponse.credential
                );
                console.log(credentialResponseDecoded);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            /> */}
          </section>
        </Fade>
      </Modal>
    </Fragment>
  );
};

Login.propTypes = {
  openModalForm: PropTypes.bool,
  closeModalForm: PropTypes.func,
  toggleAuthenticationModal: PropTypes.func
};

export default Login;
