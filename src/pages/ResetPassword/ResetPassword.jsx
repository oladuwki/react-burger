import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import resetPassword from './ResetPassword.module.css';
import { MAIN_API } from '../../utils/constants';

export const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuth, getUserRequest } = useSelector(state => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const onChange = e => {
    const target = e.target;
    target.name === 'code' ? setCode(target.value) : setPassword(target.value);
  };

  const onIconClick = () => {
    setShowPassword(!showPassword);
    if (!showPassword) setTimeout(() => passwordRef.current.focus(), 0);
  };

  const handlePasswordOverlayClick = e => {
    if (showPassword && e.currentTarget.classList.value !== 'input__icon input__icon-action') setShowPassword(!showPassword);
  };

  const onSubmit = e => {
    e.preventDefault();
    fetch(`${MAIN_API}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ password: password, token: code })
    })
      .then(res => {
        if (res.ok) return res.json();
        else alert('ERROR');
      })
      .then(res => {
        if (res.success) history.replace('/login', { forgotPageVisited: false });
        else alert('ERROR');
      })
      .catch(err => alert(err));
  };

  if (getUserRequest) return null;
  else if (!getUserRequest && isAuth) {
    return <Redirect to={location.state?.from || '/profile'} />;
  } else if (!location.state?.forgotPageVisited) return <Redirect to={'/forgot-password'} />;

  return (
    <main className={resetPassword.section} onClick={handlePasswordOverlayClick}>
      <div className={resetPassword.content}>
        <form onSubmit={onSubmit} noValidate className={resetPassword.form}>
          <h2 className='text text_type_main-large'>Восстановление пароля</h2>
          <div className={showPassword ? resetPassword.hideInput : ''}>
            <Input
              type='password'
              placeholder='Введите новый пароль'
              name='password'
              value={password || ''}
              icon='ShowIcon'
              onChange={onChange}
              onIconClick={onIconClick}
              //   ref={passwordRef}
            />
          </div>
          <div className={!showPassword ? resetPassword.hideInput : ''}>
            <Input
              type='text'
              placeholder='Введите новый пароль'
              name='password'
              value={password || ''}
              icon='HideIcon'
              onChange={onChange}
              onIconClick={onIconClick}
              ref={passwordRef}
            />
          </div>
          <Input type='text' placeholder='Введите код из письма' name='code' value={code || ''} onChange={onChange} />
          <Button type='primary' size='medium' disabled={!password || !code}>
            Восстановить
          </Button>
        </form>
        <div>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Вспомнили пароль?</span>
            <Link to='/login' className={`${resetPassword.link} ml-2`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
