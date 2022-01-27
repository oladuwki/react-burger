import { getCookie } from '../../utils/cookie';
import { TIngredientObjData, TOrderData, TDraggableIngr, TModalType } from '../../utils/types';
import { AppDispatch, AppThunk } from '../store';


export const TOGGLE_MODAL_VISIBILITY: 'TOGGLE_MODAL_VISIBILITY' = 'TOGGLE_MODAL_VISIBILITY';
export const SET_CURRENT_MODAL_TYPE: 'SET_CURRENT_MODAL_TYPE' = 'SET_CURRENT_MODAL_TYPE';
export const SET_INGRIDIENT_IN_MODAL: 'SET_INGRIDIENT_IN_MODAL' = 'SET_INGRIDIENT_IN_MODAL';
export const SET_ORDER_STATE: 'SET_ORDER_STATE' = 'SET_ORDER_STATE';
export const INGRIDIENT_FETCH_SUCCESS: 'INGRIDIENT_FETCH_SUCCESS' = 'INGRIDIENT_FETCH_SUCCESS';
export const INGRIDIENT_FETCH_ERROR: 'INGRIDIENT_FETCH_ERROR' = 'INGRIDIENT_FETCH_ERROR';
export const OPEN_MODAL: 'OPEN_MODAL' = 'OPEN_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';
export const SET_MODAL_TYPE: 'SET_CURRENT_MODAL_TYPE' = 'SET_CURRENT_MODAL_TYPE';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_SAUCE: 'ADD_SAUCE' = 'ADD_SAUCE';
export const ADD_MAIN: 'ADD_MAIN' = 'ADD_MAIN';
export const UPDATE_DRAGGABLE_INGRIDIENTS: 'UPDATE_DRAGGABLE_INGRIDIENTS' = 'UPDATE_DRAGGABLE_INGRIDIENTS';
export const REMOVE_ALL_INGRIDIENTS: 'REMOVE_ALL_INGRIDIENTS' = 'REMOVE_ALL_INGRIDIENTS';
export const RESORT_DRAGGABLE_INGRIDIENTS: 'RESORT_DRAGGABLE_INGRIDIENTS' = 'RESORT_DRAGGABLE_INGRIDIENTS';
export const SET_CONSTRUCTOR_LOADER: 'SET_CONSTRUCTOR_LOADER' = 'SET_CONSTRUCTOR_LOADER';

export interface ISetConstructorLoader {
    readonly type: typeof SET_CONSTRUCTOR_LOADER,
    readonly value: boolean,
}

export interface IToggleModalVisibility {
    readonly type: typeof TOGGLE_MODAL_VISIBILITY,
    readonly value: boolean,
}

export interface ISetCurrentModalType {
    readonly type: typeof SET_CURRENT_MODAL_TYPE,
    readonly value: TModalType,
}

export interface ISetIngrInModal {
    readonly type: typeof SET_INGRIDIENT_IN_MODAL,
    readonly value: TIngredientObjData,
}

export interface ISetOrderState {
    readonly type: typeof SET_ORDER_STATE,
    readonly value: TOrderData,
}

export interface IIngrFetchSuccess {
    readonly type: typeof INGRIDIENT_FETCH_SUCCESS,
    readonly value: Array<TIngredientObjData>,
}

export interface IIngrFetchError {
    readonly type: typeof INGRIDIENT_FETCH_ERROR,
}

export interface IOpenModal {
    readonly type: typeof OPEN_MODAL,
}

export interface ICloseModal {
    readonly type: typeof CLOSE_MODAL,
}

export interface ISetModalType {
    readonly type: typeof SET_MODAL_TYPE,
    readonly value: TModalType,
}

export interface IAddBun {
    readonly type: typeof ADD_BUN,
    readonly value: TDraggableIngr,
}

export interface IAddSauce {
    readonly type: typeof ADD_SAUCE,
    readonly value: TDraggableIngr,
}

export interface IAddMain {
    readonly type: typeof ADD_MAIN,
    readonly value: TDraggableIngr,
}

export interface IUpdateDraggableIngr {
    readonly type: typeof UPDATE_DRAGGABLE_INGRIDIENTS,
    readonly value: Array<TDraggableIngr>,
}

export interface IResortDraggableIngr {
    readonly type: typeof RESORT_DRAGGABLE_INGRIDIENTS,
    readonly indexOfDraggedIngr: number,
    readonly indexOfDroppedIngr: number,

}

export interface IRemoveAllIngr {
    readonly type: typeof REMOVE_ALL_INGRIDIENTS,
}

export type TBurgerVendorActionsUnion = IToggleModalVisibility | ISetCurrentModalType | ISetIngrInModal | ISetOrderState | IIngrFetchSuccess | IIngrFetchError | IOpenModal | ICloseModal | ISetModalType | IAddBun | IAddSauce | IAddMain | IUpdateDraggableIngr | IResortDraggableIngr | IRemoveAllIngr | ISetConstructorLoader;

export const getIngridientsDataThunk: AppThunk = (url = '') => {

    //@ts-ignore
    return function (dispatch: AppDispatch) {
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((res) => {

                if (!(Array.isArray(res.data))) {
                    return Promise.reject(res);
                }

                dispatch({
                    type: INGRIDIENT_FETCH_SUCCESS,
                    value: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: INGRIDIENT_FETCH_ERROR,
                })
            });
    };
};

export const postBurgerOrderThunk: AppThunk = (url = '', createPostBody: any) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SET_CONSTRUCTOR_LOADER,
            value: true,
        });
        fetch(url, {
            method: 'POST',
            //@ts-ignore
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
                dispatch({
                    type: SET_ORDER_STATE,
                    value: res,
                });
                dispatch({
                    type: SET_CONSTRUCTOR_LOADER,
                    value: false,
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
            });
    }
};