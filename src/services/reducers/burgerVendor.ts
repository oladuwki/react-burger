import update from "immutability-helper";
import { TBurgerVendorActionsUnion } from '../actions/burgerVendor';

import { TOrderData, TDraggableIngr, TIngredientObjData, TModalType } from '../../utils/types';

import {
    TOGGLE_MODAL_VISIBILITY,
    SET_CURRENT_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
    SET_ORDER_STATE,
    INGRIDIENT_FETCH_SUCCESS,
    INGRIDIENT_FETCH_ERROR,
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_MODAL_TYPE,
    ADD_BUN,
    ADD_SAUCE,
    ADD_MAIN,
    UPDATE_DRAGGABLE_INGRIDIENTS,
    REMOVE_ALL_INGRIDIENTS,
    RESORT_DRAGGABLE_INGRIDIENTS,
    SET_CONSTRUCTOR_LOADER,
} from '../actions/burgerVendor';

export type TBurgerVendorReducer = {
    ingridientsData: {
        arrOfIngridients: Array<TIngredientObjData>,
        ingrDataIsLoading: boolean,
        ingrDataHasError: boolean,
    }
    bun: TIngredientObjData,
    draggableIngridients: Array<TDraggableIngr>,

    modalIsVisible: boolean,
    currentModalType: TModalType,
    ingrInModalData: TIngredientObjData,
    orderData: TOrderData,
    constructorLoaderIsVisible: boolean,

}

export const blankIngr: TIngredientObjData  = {
    _id: '',
    name: '',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
}

const initialState: TBurgerVendorReducer = {
    ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
    },

    bun: blankIngr,
    draggableIngridients: [],

    modalIsVisible: false,
    currentModalType: 'none',
    ingrInModalData: blankIngr,

    orderData: {
        success: false,
        name: '',
        order: {
            number: '',
        },
    },
    constructorLoaderIsVisible: false,
};

export const burgerVendorReducer = (state = initialState, action: TBurgerVendorActionsUnion): TBurgerVendorReducer => {
    switch (action.type) {
        case TOGGLE_MODAL_VISIBILITY: {
            return {
                ...state,
                modalIsVisible: action.value,
            }
        }
        case SET_CURRENT_MODAL_TYPE: {
            return {
                ...state,
                currentModalType: action.value,
            }
        }
        case SET_INGRIDIENT_IN_MODAL: {
            return {
                ...state,
                ingrInModalData: action.value
            }
        }
        case SET_ORDER_STATE: {
            return {
                ...state,
                orderData: action.value,
            }
        }
        case INGRIDIENT_FETCH_SUCCESS: {
            return {
                ...state,
                ingridientsData: {
                    arrOfIngridients: action.value,
                    ingrDataIsLoading: false,
                    ingrDataHasError: false,
                },
            }
        }
        case INGRIDIENT_FETCH_ERROR: {
            return {
                ...state,
                ingridientsData: {
                    arrOfIngridients: [],
                    ingrDataIsLoading: false,
                    ingrDataHasError: true
                },
            }
        }
        case OPEN_MODAL: {
            return {
                ...state,
                modalIsVisible: true,
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modalIsVisible: false,
            }
        }
        case SET_MODAL_TYPE: {
            return {
                ...state,
                currentModalType: action.value,
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.value,
            }
        }
        case ADD_SAUCE: {
            const instanceID = (new Date()).getTime();
            const objIngridientWithId: TDraggableIngr = { ...action.value, instanceID };
            return {
                ...state,
                draggableIngridients: state.draggableIngridients.concat(objIngridientWithId)
            }
        }
        case ADD_MAIN: {
            const instanceID = (new Date()).getTime();
            const objInstance = { ...action.value, instanceID };
            return {
                ...state,
                draggableIngridients: state.draggableIngridients.concat(objInstance)
            };
        }
        case UPDATE_DRAGGABLE_INGRIDIENTS: {
            return {
                ...state,
                draggableIngridients: action.value
            };
        }
        case RESORT_DRAGGABLE_INGRIDIENTS: {
            const resortedArrOfIngridients = update(state.draggableIngridients, {
                $splice: [
                    [action.indexOfDraggedIngr, 1],
                    [action.indexOfDroppedIngr, 0, state.draggableIngridients[action.indexOfDraggedIngr]],
                ],
            });
            return {
                ...state,
                draggableIngridients: resortedArrOfIngridients,
            }
        }
        case REMOVE_ALL_INGRIDIENTS: {
            return {
                ...state,
                bun: blankIngr,
                draggableIngridients: []
            }
        }
        case SET_CONSTRUCTOR_LOADER: {
            return {
                ...state,
                constructorLoaderIsVisible: action.value,
            }
        }
        default: {
            return state;
        }
    }
}