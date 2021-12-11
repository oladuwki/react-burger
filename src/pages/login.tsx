import React, { useCallback, useEffect, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { logInApp, confirmAuth } from '../services/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const [form, setFormValues] = useState({ email: '', password: '' });
  const { isLoggedIn } = useSelector((store: any): any => store.user); // TODO: типизируем в следующем спринте
  const dispatch = useDispatch();

  const location = useLocation<{ from: Location }>();

  useEffect(() => {
    console.log('Auth in /login');
    dispatch(confirmAuth());
  }, [dispatch]);

  useEffect(() => {
    setFormValues(
      { email: 'oladuwki@yandex.ru', password: '123123' }
    );
  }, [isLoggedIn, location]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => { 
      e.preventDefault();
      console.log('Sending login request');
      console.log(form);

      dispatch(logInApp(form));
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
