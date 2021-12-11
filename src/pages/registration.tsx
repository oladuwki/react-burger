import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './auth-form.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { confirmAuth, registerNewUser } from '../services/actions/userActions';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function RegistrationPage() {
  const [form, setFormValues] = useState({ email: '', name: '', password: '' });
  const { isLoggedIn } = useSelector((store: any) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Auth in /registration');
    dispatch(confirmAuth());
  }, [dispatch]);

   useEffect(() => {
    setFormValues(
      { email: 'oladuwki@yandex.ru', name: 'User1', password: '123123' }
    );
  }, [isLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Sending registration request');
      dispatch(registerNewUser(form));
    }, [dispatch, form]
  );

  if (isLoggedIn) {
    return (<Redirect to={{ pathname: '/' }} />);
  }

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>

        <Input
          type='text'
          placeholder='Имя'
          value={form.name}
          name={'name'}
          onChange={handleChange}

          error={false}
          errorText={'Имя должно состоять из символов галактического алфавита'}
        />

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
          Зарегистрироваться
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to={"/login"} className={"text_color_link"}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}