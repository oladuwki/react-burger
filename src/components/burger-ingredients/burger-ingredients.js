import React, { useState, useEffect } from "react";
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from 'prop-types';


const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('one');
    const [modalVisible, setModalVisible] = useState(false);
    const [ingredientDetails, setIngredientDetails] = useState(null);

    let rolls = [];
    let sauces = [];
    let fillings = [];

    const showModal = (e) => {
        let clickedIngredientId = e.currentTarget.getAttribute('id');
        let clickedIngredientData = props.ingredients.find(item => item._id === clickedIngredientId);

        setModalVisible(true);
        setIngredientDetails(clickedIngredientData);
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

    // Распределение ингредиентов по типу
    props.ingredients.forEach((item) => {
        if (item.type === 'bun') {
            rolls.push(item);
        }
        if (item.type === 'main') {
            fillings.push(item);
        }
        if (item.type === 'sauce') {
            sauces.push(item);
        }
    });

    // Массив булок
    const rollsItems = rolls.map((item) => {
        return (
            <div key={item._id} id={item._id} className={BurgerIngredientsStyles.card} onClick={showModal}>
                <Counter count={1} size="default" />
                <img src={item.image} alt={item.name} className={BurgerIngredientsStyles.card__img} />
                <div className={BurgerIngredientsStyles.card__price}>
                    <p className="text_type_digits-default mr-1">{item.price}</p>
                    <CurrencyIcon />
                </div>
                <p className="text_type_main-default">{item.name}</p>
            </div>
        )
    });

    // Массив начинок
    const fillingsItems = fillings.map((item) => {
        return (
            <div key={item._id} id={item._id} className={BurgerIngredientsStyles.card} onClick={showModal}>
                <img src={item.image} alt={item.name} className={BurgerIngredientsStyles.card__img} />
                <div className={BurgerIngredientsStyles.card__price}>
                    <p className="text_type_digits-default mr-1">{item.price}</p>
                    <CurrencyIcon />
                </div>
                <p className="text_type_main-default">{item.name}</p>
            </div>
        )
    });

    // Массив соусов
    const saucesItems = sauces.map((item) => {
        return (
            <div key={item._id} id={item._id} className={BurgerIngredientsStyles.card} onClick={showModal}>
                <img src={item.image} alt={item.name} className={BurgerIngredientsStyles.card__img} />
                <div className={BurgerIngredientsStyles.card__price}>
                    <p className="text_type_digits-default mr-1">{item.price}</p>
                    <CurrencyIcon />
                </div>
                <p className="text_type_main-default">{item.name}</p>
            </div>
        )
    });

    return (
        <section className="pt-10">
            <h1 className="text_type_main-large mb-5">Соберите бургер</h1>
            <div className={`${BurgerIngredientsStyles.tabs} mb-10`}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <section className={BurgerIngredientsStyles.ingredients_scroll}>
                <section id="rolls" className="mb-10">
                    <h2 className="text_type_main-medium mb-6">Булки</h2>
                    <section className={BurgerIngredientsStyles.ingredients}>
                        {rollsItems}
                    </section>
                </section>
                <section id="sauces" className="mb-10">
                    <h2 className="text_type_main-medium mb-6">Соусы</h2>
                    <section className={BurgerIngredientsStyles.ingredients}>
                        {saucesItems}
                    </section>
                </section>
                <section id="fillings" className="mb-10">
                    <h2 className="text_type_main-medium mb-6">Начинки</h2>
                    <section className={BurgerIngredientsStyles.ingredients}>
                        {fillingsItems}
                    </section>
                </section>
                {
                    modalVisible ?
                        <Modal title="Детали ингредиента" onClose={closeModal}>
                            <IngredientDetails {...ingredientDetails} />
                        </Modal> : ''
                }
            </section>
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

BurgerIngredients.propTypes = {
    ingredients:  PropTypes.arrayOf(ingredientObject).isRequired
};

export default BurgerIngredients;