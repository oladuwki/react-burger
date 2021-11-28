import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER } from '../types';
import { MAIN_API, getCookie, setCookies, retriableFetch } from '../../utils/constants';

export const getOrder = itemsId => {
  const accessToken = getCookie('accessToken');
  return dispatch => {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    retriableFetch(`${MAIN_API}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ ingredients: itemsId })
    })
      .then(res => dispatch({ type: GET_ORDER_SUCCESS, payload: res.order.number }))
      .catch(() => dispatch({ type: GET_ORDER_FAILED }));
  };
};

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER
  };
};
