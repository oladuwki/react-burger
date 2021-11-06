import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_INGREDIENT_TO_MODAL, REMOVE_INGREDIENT_FROM_MODAL
} from "../actions/burger-ingredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientDetails: {}
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false};
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, ingredientsFailed: true, ingredientsRequest: false};
        }
        case SET_INGREDIENT_TO_MODAL: {
            return {
                ...state,
                ingredientDetails: action.item
            }
        }
        case REMOVE_INGREDIENT_FROM_MODAL: {
            return {
                ...state,
                ingredientDetails: {}
            }
        }
        default:
            return state;
    }
};