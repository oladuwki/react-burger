import { getCookie } from '../../utils/cookie';

export const TOGGLE_MODAL_VISIBILITY = 'TOGGLE_MODAL_VISIBILITY';
export const SET_CURRENT_MODAL_TYPE = 'SET_CURRENT_MODAL_TYPE';
export const SET_INGRIDIENT_IN_MODAL = 'SET_INGRIDIENT_IN_MODAL';
export const SET_ORDER_STATE = 'SET_ORDER_STATE';
export const INGRIDIENT_FETCH_SUCCESS = 'INGRIDIENT_FETCH_SUCCESS';
export const INGRIDIENT_FETCH_ERROR = 'INGRIDIENT_FETCH_ERROR';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_MODAL_TYPE = 'SET_CURRENT_MODAL_TYPE';
export const ADD_BUN = 'ADD_BUN';
export const ADD_SAUCE = 'ADD_SAUCE';
export const ADD_MAIN = 'ADD_MAIN';
export const UPDATE_DRAGGABLE_INGRIDIENTS = 'UPDATE_DRAGGABLE_INGRIDIENTS';
export const REMOVE_ALL_INGRIDIENTS = 'REMOVE_ALL_INGRIDIENTS';
export const RESORT_DRAGGABLE_INGRIDIENTS = 'RESORT_DRAGGABLE_INGRIDIENTS';

export function getIngridientsData(url = '') {
    return function (dispatch) {
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                if (!(Array.isArray(res.data))) {
                    console.log('Promise.reject(This response is not valid)');
                    console.log(`Didn't find array in res.data  :-(   Probably got wrong response from ${url}`);
                    return Promise.reject(res);
                }
                dispatch({
                    type: INGRIDIENT_FETCH_SUCCESS,
                    value: res.data,
                })
            })
            .catch((err) => {
                console.log(`Error: can't fetch ingredients data from ${url}`);
                console.log(`response from server is: `, err);
                console.log(`err.message is: `, err.message);

                dispatch({
                    type: INGRIDIENT_FETCH_ERROR,
                })
            });
    };
}

export function postBurgerOrder(url = '', createPostBody) {
    return function (dispatch) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: getCookie('accessToken'),
            },
            body: JSON.stringify(createPostBody())
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                console.log('after fetch: Получен номер заказа', res.order.number);
                dispatch({
                    type: SET_ORDER_STATE,
                    value: res,
                });
            })
            .then(() => {
                dispatch({
                    type: OPEN_MODAL,
                });
                dispatch({
                    type: SET_MODAL_TYPE,
                    value: 'OrderDetails',
                });
                dispatch({
                    type: REMOVE_ALL_INGRIDIENTS,
                });
            })
            .catch((err) => {
                console.log(`Error: some error occurred during posting order`);
                console.log(`response from server is: `, err);
            });
    }
}