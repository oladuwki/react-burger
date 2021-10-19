import React, { useState, useEffect } from 'react';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import ingredientObject from '../../utils/types.js';

const BurgerConstructor = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const totalCost = props.ingredients.reduce((sum, current) => sum + current.price, 0);
    const constructorItems = props.ingredients.map((item, i) => {
        return (
            <div key={i} className={`${BurgerConstructorStyles.constructor__item} 
            ${i === 0 ? "ml-8" : ''}`} >
                {i === 0 ? '' : <DragIcon />}
                <ConstructorElement
                    type={i === 0 ? "top" : ''}
                    isLocked={i === 0 ? true : false}
                    text={`${item.name} ${i === 0 ? "(верх)" : ''}`}
                    price={item.price}
                    thumbnail={item.image}
                />
            </div>
        );
    });

    const toggleIngredient = (e) => {
        e.stopPropagation();
        setModalVisible((prevValue) => {
        return !prevValue;
        });
    };

    return (
        <section className="pt-25 pl-4 pr-4">
            <section className={BurgerConstructorStyles.constructor__list}>
                {constructorItems[0]}
                <div className={BurgerConstructorStyles.constructor_scroll}>
                    {constructorItems.slice(2, constructorItems.length)}
                </div>
                <div className="ml-8">
                    <ConstructorElement
                        type="bottom"
                        isLocked="true"
                        text={`${props.ingredients[0].name} (низ)`}
                        price={props.ingredients[0].price}
                        thumbnail={props.ingredients[0].image}
                    />
                </div>
            </section>
            <footer className={`${BurgerConstructorStyles.constructor__info} mt-10`}>
                <div className="mr-10">
                    <span className="text_type_digits-medium mr-2">{totalCost}</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" onClick={toggleIngredient}>
                    Оформить заказ
                </Button>
            </footer>

            {
                modalVisible ?
                    <Modal onClose={toggleIngredient}>
                        <OrderDetails />
                    </Modal> : ''
            }
        </section>
    );
}


BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientObject).isRequired
};

export default BurgerConstructor;
