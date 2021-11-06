import { postOrderURL} from "../../utils/constants";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const MOVE_INGREDIENT_IN_CONSTRUCTOR = 'MOVE_INGREDIENT_IN_CONSTRUCTOR';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';


export const postOrder = (idsArr) => {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        fetch(postOrderURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: idsArr})
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Something wrong: ${res.status}`)
            })
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: GET_ORDER_SUCCESS,
                            payload: res.order.number
                        })
                    } else {
                        dispatch({
                            type: GET_ORDER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_ORDER_FAILED
                })
                dispatch({
                    type: CLEAR_ORDER
                })
            })
    }
}