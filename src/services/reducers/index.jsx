import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { burgerIngredientReducer } from './burgerIngredient';
import { burgerConstructorReducer } from './burgerConstructor';
import { burgerIngredientsReducer } from './burgerIngredients';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerIngredient: burgerIngredientReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer
});
