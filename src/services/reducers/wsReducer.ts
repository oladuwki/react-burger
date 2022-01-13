import {
  WS_CONNECTED_SUCCESSFULLY,
  WS_ERROR,
  WS_GOT_ORDERS,
  WS_DISCONNECTED,
  SET_DETAILED_ORDER_IN_MODAL,
  TwsActionsUnion
} from '../actions/wsActions';
import { TOrder } from '../../utils/types';

export type TOrdersStoreData = {
  success: null | boolean,
  orders: ReadonlyArray<TOrder>,
  total: number,
  totalToday: number,
}

export type TwsState = {
  wsConnected: boolean,
  wsError: boolean,
  ordersData: TOrdersStoreData,
  detailedOrder: TOrder,
}

const initialState: TwsState = {
  wsConnected: false,
  wsError: false,
  ordersData: {
    success: null,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  detailedOrder: {
    ingredients: [],
    _id: '',
    status: 'pending',
    number: 0,
    createdAt: '',
    updatedAt: '',
    name: '',
  },
};

export const wsReducer = (state = initialState, action: TwsActionsUnion): TwsState => {
  switch (action.type) {
    case WS_CONNECTED_SUCCESSFULLY:
      return {
        ...state,
        wsConnected: true,
        wsError: false,
      };
    case WS_GOT_ORDERS:
      return {
        ...state,
        ordersData: action.ordersData,
      };
    case WS_DISCONNECTED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
      }
    case SET_DETAILED_ORDER_IN_MODAL:
      return {
        ...state,
        detailedOrder: action.orderData,
      }

    default:
      return state;
  }
};