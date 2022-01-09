import React, { useCallback, useState, useEffect } from 'react';
import styles from './auth-form.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { confirmAuthThunk, requestResetCodeThunk, } from '../services/actions/userActions';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';


export function ForgotPage() {
  const [form, setFormValues] = useState({ email: '' });
  const { isLoggedIn, canResetPassword } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setFormValues(
      { email: 'shamko.e.v@yandex.ru' }
    );
  }, []);

  useEffect(() => {
    dispatch(confirmAuthThunk());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(requestResetCodeThunk(form.email));
    }, [dispatch, form]
  );

  if (isLoggedIn) {
    return (<Redirect to={{ pathname: '/' }} />);
  }

  if (!isLoggedIn && canResetPassword) {
    return (<Redirect to={{ pathname: '/reset-password' }} />);
  }

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>

        <Input
          type='text'
          placeholder='Укажите e-mail'
          value={form.email}
          name={'email'}
          onChange={handleChange}

          error={false}
          errorText={'Введите корректный e-mail'}
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