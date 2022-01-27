import React, { useCallback, useEffect, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { logInAppThunk, confirmAuthThunk } from '../services/actions/userActions';

import { useAppDispatch, useAppSelector } from '../services/hooks';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const [form, setFormValues] = useState({ email: '', password: '' });
  const { isLoggedIn } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const location = useLocation<{ from: Location }>();

  useEffect(() => {
    dispatch(confirmAuthThunk());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => { 
      e.preventDefault();
      dispatch(logInAppThunk(form));
    },
    [form, dispatch]
  );

  if (isLoggedIn) {
    return (<Redirect to={ location.state?.from || '/'} />);
  }

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Вход</h1>

        <Input
          type='email'
          placeholder='E-mail'
          value={form.email}
          name={'email'}
          onChange={handleChange}

          error={false}
          errorText={'Введите корректный e-mail'}
        />

        <PasswordInput
          value={form.password}
          name={'password'}
          size={'default'}
          onChange={handleChange}
        />

        <Button type="primary" size="medium">
          Войти
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link to={"/registration"} className={"text_color_link"}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link to={"/forgot-password"} className={"text_color_link"}>
            Восстановить пароль
          </Link>
        </p>

      </form>
    </div>
  );
}
