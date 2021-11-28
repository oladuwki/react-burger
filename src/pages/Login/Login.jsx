import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import loginStyles from './Login.module.css';
import { login } from '../../services/actions/user';

export const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuth, getUserRequest } = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = e => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : setPassword(target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login({ email: email, password: password, history: history }));
  };

  if (getUserRequest) return null;
  else if (!getUserRequest && isAuth) return <Redirect to={location.state?.from || '/profile'} />;

  return (
    <main className={loginStyles.section}>
      <div className={loginStyles.content}>
        <form onSubmit={onSubmit} noValidate className={loginStyles.form}>
          <h2 className='text text_type_main-large'>Вход</h2>
          <EmailInput name='email' value={email || ''} onChange={onChange} />
          <PasswordInput name='password' value={password || ''} onChange={onChange} />
          <Button type='primary' size='medium' disabled={!email || !password}>
            Вход
          </Button>
        </form>
        <div>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Вы — новый пользователь?</span>
            <Link to='/register' className={`${loginStyles.link} ml-2`}>
              Зарегистрироваться
            </Link>
          </div>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Забыли пароль?</span>
            <Link to='/forgot-password' className={`${loginStyles.link} ml-2`}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
