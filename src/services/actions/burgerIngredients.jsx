import { GET_BURGER_INGREDIENTS_REQUEST, GET_BURGER_INGREDIENTS_SUCCESS, GET_BURGER_INGREDIENTS_FAILED } from '../types';
import { MAIN_API } from '../../utils/constants';

export const getBurgerIngredients = () => {
  return dispatch => {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST
    });
    fetch(`${MAIN_API}/ingredients`)
      .then(res => {
        if (res.ok) return res.json();
        else return res.json().then(err => Promise.reject(err));
      })
      .then(res => dispatch({ type: GET_BURGER_INGREDIENTS_SUCCESS, payload: res.data }))
      .catch(() => dispatch({ type: GET_BURGER_INGREDIENTS_FAILED }));
  };
};
