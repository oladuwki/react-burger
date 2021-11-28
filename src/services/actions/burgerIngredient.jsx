import { ADD_BURGER_INGREDIENT_INFO, CLEAR_BURGER_INGREDIENT_INFO } from '../types';

export const addBurgerIngredientInfo = info => {
  return {
    type: ADD_BURGER_INGREDIENT_INFO,
    payload: info
  };
};

export const clearBurgerIngredientInfo = () => {
  return {
    type: CLEAR_BURGER_INGREDIENT_INFO
  };
};
