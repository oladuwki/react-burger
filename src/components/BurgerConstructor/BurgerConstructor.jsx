import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import burgerConstructor from './BurgerConstructor.module.css';
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrder } from '../../services/actions/order';
import {
  addConstructorIngredient,
  increaseConstructorCount,
  decreaseConstructorCount,
  addConstructorBun
} from '../../services/actions/burgerConstructor';

const BurgerConstructor = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { constructorBuns, constructorIngredients } = useSelector(state => state.burgerConstructor);
  const { isAuth } = useSelector(state => state.user);
  const summaryPrice = useMemo(() => {
    let sum = 0;
    constructorIngredients.forEach(item => {
      if (item.type !== 'bun') sum += item.price;
    });
    return constructorBuns ? sum + 2 * constructorBuns.price : sum;
  }, [constructorBuns, constructorIngredients]);

  const handleClick = () => {
    if (!isAuth) return history.replace('/login');
    const itemsId = constructorIngredients.map(item => item._id);
    dispatch(getOrder([...itemsId, constructorBuns._id]));
    props.onModalType();
    props.onModalOpen();
  };

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop: item => {
      if (item.type === 'bun') dispatch(addConstructorBun(item));
      else dispatch(addConstructorIngredient(item));
      if (constructorBuns && item.type === 'bun') {
        dispatch(decreaseConstructorCount());
        dispatch(increaseConstructorCount());
      } else dispatch(increaseConstructorCount());
    }
  });

  return (
    <div className={`mt-25 ${burgerConstructor.content}`}>
      <div style={{ border: `${isHover ? '2px solid #4c4cff' : ''}`, borderRadius: 40 }} ref={dropRef}>
        {constructorBuns || constructorIngredients.length > 0 ? (
          <div>
            <div>
              {constructorBuns ? (
                <BurgerConstructorItem
                  key={constructorBuns.key}
                  uniqueKey={constructorBuns.key}
                  image={constructorBuns.image}
                  name={constructorBuns.name}
                  price={constructorBuns.price}
                  type='bun-top'
                />
              ) : (
                <h2 className='text text_type_main-medium'>Добавьте булку</h2>
              )}
            </div>
            <div className={`mt-4 pr-2 ${burgerConstructor.list}`}>
              {constructorIngredients.map((item, index) => (
                <BurgerConstructorItem key={item.key} index={index} uniqueKey={item.key} image={item.image} name={item.name} price={item.price} />
              ))}
            </div>
            <div className='mt-4'>
              {constructorBuns ? (
                <BurgerConstructorItem
                  key={constructorBuns.key}
                  uniqueKey={constructorBuns.key}
                  image={constructorBuns.image}
                  name={constructorBuns.name}
                  price={constructorBuns.price}
                  type='bun-bottom'
                />
              ) : (
                <h2 className='text text_type_main-medium'>Добавьте булку</h2>
              )}
            </div>
          </div>
        ) : (
          <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 className={`text text_type_main-large`}>Конструктор пуст</h2>
          </div>
        )}
      </div>
      <div className={`${burgerConstructor.summary} mt-10`}>
        <div className={`${burgerConstructor.summaryPrice} mr-10`}>
          <p className={`text text_type_main-medium mr-2 ${burgerConstructor.summaryPriceValue}`}>
            {constructorBuns || constructorIngredients.length > 0 ? summaryPrice : 0}
          </p>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='medium' onClick={handleClick} disabled={!constructorBuns}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  onModalType: PropTypes.func.isRequired
};

export default BurgerConstructor;
