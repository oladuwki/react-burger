import React, { useRef, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export const PasswordInput = ({ value, onChange, name, size = 'default' }) => {
  const [fieldDisabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const onIconClick = () => {
    setDisabled(false);
    setVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = value => {
    setError(value.length < 6);
  };

  const onFocus = () => {
    setError(false);
  };

  const onBlur = e => {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
    setDisabled(true);
    setVisible(false);
  };

  return (
    <Input
      type={visible ? 'text' : 'password'}
      placeholder='Пароль'
      onChange={onChange}
      icon={visible ? 'CloseIcon' : 'EditIcon'}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      error={error}
      onIconClick={onIconClick}
      errorText={'Некорректный пароль'}
      size={size}
      disabled={fieldDisabled}
    />
  );
};
