import { ADD_BURGER_INGREDIENT_INFO, CLEAR_BURGER_INGREDIENT_INFO } from '../types';

const initialState = {
  ingredient: null
};

export const burgerIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENT_INFO: {
      return {
        ...state,
        ingredient: action.payload
      };
    }
    case CLEAR_BURGER_INGREDIENT_INFO: {
      return {
        ...state,
        ingredient: null
      };
    }
    default: {
      return state;
    }
  }
};
