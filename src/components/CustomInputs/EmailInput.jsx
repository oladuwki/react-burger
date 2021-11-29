import React, { useRef, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const validateEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const EmailInput = ({ value, onChange, name, size = 'default' }) => {
  const [fieldDisabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = value => {
    setError(!validateEmail(value));
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
  };
  
  return (
    <Input
      type='email'
      placeholder='Email'
      onChange={onChange}
      icon={!fieldDisabled ? 'CloseIcon' : 'EditIcon'}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      error={error}
      disabled={fieldDisabled}
      onIconClick={onIconClick}
      errorText={'Ой, произошла ошибка!'}
      size={size}
    />
  );
};
