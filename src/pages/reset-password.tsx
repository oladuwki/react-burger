import React, { useCallback, useState } from 'react';

import styles from './auth-form.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { getCookie } from '../utils/cookie';
import { setNewPasswordThunk } from '../services/actions/userActions';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPassword() {
  const [form, setFormValues] = useState({ password: '', resetCode: '' });
  const { isLoggedIn, canResetPassword, hasResetPassword } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const newPassword = form.password;
      const resetCode = form['resetCode'];

      console.log('newPassword', newPassword);
      console.log('resetCode', resetCode);

      dispatch(setNewPasswordThunk(newPassword, resetCode));

      setFormValues({ ...form, password: '' });
    }, [dispatch, form]
  );

  if (isLoggedIn) {
    return (<Redirect to={{ pathname: '/' }} />);
  }

  if (hasResetPassword) {
    console.log('has reset password');
    return (<Redirect to={{ pathname: '/login' }} />);
  }

  if (!canResetPassword && (getCookie('canResetPassword') !== 'yes')) {
    return (<Redirect to={{ pathname: '/forgot-password' }} />);
  }

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>

        <PasswordInput
          value={form.password}
          name={'password'}
          size={'default'}
          onChange={handleChange}
        />

        <Input
          type='text'
          placeholder='Введите код из письма'
          value={form.resetCode}
          name={'resetCode'}
          onChange={handleChange}

          error={false}
          errorText={''}
        />

        <Button type="primary" size="medium">
          Восстановить
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to={"/login"} className={"text_color_link"}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}