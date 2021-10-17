import React, { useState, useEffect } from 'react';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';

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

    const showModal = () => {
        setModalVisible(true)
    }

    const closeModal = (e) => {
        if (e.type === 'keydown') {
            setModalVisible(false);
        } else {
            let target = e.nativeEvent.target;
    
            if (target.getAttribute('backdrop')) {
                setModalVisible(false);
            } else if (target.closest('span') && target.closest('span').getAttribute('backdrop')) {
                setModalVisible(false);
            }
        }
    }

    return (
        <section className="pt-25 pl-4 pr-4">
            <section className={BurgerConstructorStyles.constructor__list}>
                {constructorItems[0]}
                <div className={BurgerConstructorStyles.constructor_scroll}>
                    {constructorItems.slice(1, constructorItems.length)}
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
                <Button type="primary" size="large" onClick={showModal}>
                    Оформить заказ
                </Button>
            </footer>

            {
                modalVisible ?
                    <Modal onClose={closeModal}>
                        <OrderDetails />
                    </Modal> : ''
            }
        </section>
    );
}

const ingredientObject = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
})

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientObject).isRequired
};

export default BurgerConstructor;
