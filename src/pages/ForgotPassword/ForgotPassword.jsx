import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import forgotPassword from './ForgotPassword.module.css';
import { MAIN_API, emailRegex } from '../../utils/constants';

export const ForgotPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuth, getUserRequest } = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const errorText = 'Некорректный email';

  const onChange = e => {
    const target = e.target;
    target.name === 'email' && setEmail(target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    fetch(`${MAIN_API}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
      .then(res => {
        if (res.ok) return res.json();
        else setEmailError(true);
      })
      .then(res => {
        if (res.success) history.replace('/reset-password', { forgotPageVisited: true });
        else setEmailError(true);
      })
      .catch(() => setEmailError(true));
  };

  useEffect(() => history.replace({ forgotPageVisited: false }), []);
  useEffect(() => (email.length > 0 && !email.match(emailRegex) ? setEmailError(true) : setEmailError(false)), [email]);

  if (getUserRequest) return null;
  else if (!getUserRequest && isAuth) return <Redirect to={location.state?.from || '/profile'} />;

  return (
    <main className={forgotPassword.section}>
      <div className={forgotPassword.content}>
        <form onSubmit={onSubmit} noValidate className={forgotPassword.form}>
          <h2 className='text text_type_main-large'>Восстановление пароля</h2>
          <Input
            type='email'
            placeholder='Укажите e-mail'
            name='email'
            value={email || ''}
            onChange={onChange}
            error={emailError}
            errorText={errorText}
          />
          <Button type='primary' size='medium' disabled={!email || emailError}>
            Восстановить
          </Button>
        </form>
        <div>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Вспомнили пароль?</span>
            <Link to='/login' className={`${forgotPassword.link} ml-2`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
