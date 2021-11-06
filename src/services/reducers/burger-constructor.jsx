import {
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ORDER_REQUEST,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR, MOVE_INGREDIENT_IN_CONSTRUCTOR, CLEAR_ORDER, CLEAR_CONSTRUCTOR,
} from "../actions/burger-constructor.jsx";

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,

    ingredients: [],
    bun: null,

    totalPrice: 0
}

export const constructorReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDER_FAILED:
            return {
                ...state,
                orderFailed: true
            }
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload
            }
        case CLEAR_ORDER:
            return {
                ...state,
                order: null
            }
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [...state.ingredients, action.item],
            }
        case ADD_BUN_TO_CONSTRUCTOR:
            return {
                ...state,
                bun: action.item,
            }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter((item) => item.uuid !== action.id)
                ],
            }
        case MOVE_INGREDIENT_IN_CONSTRUCTOR:
            let ingredients = [...state.ingredients];
            const dragCard = ingredients[action.dragIndex];
            ingredients.splice(action.dragIndex, 1);
            ingredients.splice(action.hoverIndex, 0, dragCard)
            return {
                ...state,
                ingredients: ingredients
            }
        case CLEAR_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [],
                bun: null
            }
        default:
            return state;
    }
}