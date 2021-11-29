import React, { useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerIngredients from './BurgerIngredients.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

const BurgerIngredients = () => {
  const data = useSelector(state => state.burgerIngredients.ingredients);
  const tabsRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainsRef = useRef();
  const [currentTab, setCurrentTab] = useState('bun');
  const buns = useMemo(() => {
    return data.filter(item => item.type === 'bun');
  }, [data]);
  const sauces = useMemo(() => {
    return data.filter(item => item.type === 'sauce');
  }, [data]);
  const main = useMemo(() => {
    return data.filter(item => item.type === 'main');
  }, [data]);

  const checkActualTab = () => {
    const tabsTop = tabsRef.current.getBoundingClientRect().top;
    const bunsDistance = Math.abs(tabsTop - bunsRef.current.getBoundingClientRect().top);
    const saucesDistance = Math.abs(tabsTop - saucesRef.current.getBoundingClientRect().top);
    const mainsDistance = Math.abs(tabsTop - mainsRef.current.getBoundingClientRect().top);
    const minValue = Math.min(bunsDistance, saucesDistance, mainsDistance);
    if (minValue === bunsDistance) {
      setCurrentTab('bun');
    } else if (minValue === saucesDistance) {
      setCurrentTab('sauce');
    } else {
      setCurrentTab('main');
    }
  };

  return (
    <div className={burgerIngredients.content}>
      <h1 className='mt-10 text text_type_main-large' style={{ marginBottom: 0 }}>
        Соберите бургер
      </h1>
      <div className={`${burgerIngredients.tabs} mt-5`} ref={tabsRef}>
        <Tab value='bun' active={currentTab === 'bun'}>
          Булки
        </Tab>
        <Tab value='sauce' active={currentTab === 'sauce'}>
          Соусы
        </Tab>
        <Tab value='main' active={currentTab === 'main'}>
          Начинка
        </Tab>
      </div>
      {data.length > 0 ? (
        <div className={burgerIngredients.categories} onScroll={checkActualTab}>
          <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>
            Булки
          </h2>
          <div className={`${burgerIngredients.category} pl-4 mt-6`} ref={bunsRef}>
            {buns.map(item => (
              <BurgerIngredient
                key={item._id}
                _id={item._id}
                type={item.type}
                image={item.image_large}
                price={item.price}
                name={item.name}
                proteins={item.proteins}
                fat={item.fat}
                carbohydrates={item.carbohydrates}
                calories={item.calories}
              />
            ))}
          </div>
          <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>
            Соусы
          </h2>
          <div className={`${burgerIngredients.category} pl-4 mt-6`} ref={saucesRef}>
            {sauces.map(item => (
              <BurgerIngredient
                key={item._id}
                _id={item._id}
                type={item.type}
                image={item.image_large}
                price={item.price}
                name={item.name}
                proteins={item.proteins}
                fat={item.fat}
                carbohydrates={item.carbohydrates}
                calories={item.calories}
              />
            ))}
          </div>
          <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>
            Начинка
          </h2>
          <div className={`${burgerIngredients.category} pl-4 mt-6`} ref={mainsRef}>
            {main.map(item => (
              <BurgerIngredient
                key={item._id}
                _id={item._id}
                type={item.type}
                image={item.image_large}
                price={item.price}
                name={item.name}
                proteins={item.proteins}
                fat={item.fat}
                carbohydrates={item.carbohydrates}
                calories={item.calories}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BurgerIngredients;
