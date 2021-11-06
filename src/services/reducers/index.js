import { combineReducers } from 'redux';
import {burgerIngredientsReducer} from "./burger-ingredients";
import {constructorReducer} from "./burger-constructor";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: constructorReducer
});