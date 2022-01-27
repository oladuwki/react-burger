import { TOrder } from '../../utils/types';
import { TOrdersStoreData } from '../reducers/wsReducer';

export const WS_OPEN_CONNECTION: 'WS_OPEN_CONNECTION' = 'WS_OPEN_CONNECTION';
export const WS_CONNECTED_SUCCESSFULLY: 'WS_CONNECTED_SUCCESSFULLY' = 'WS_CONNECTED_SUCCESSFULLY';
export const WS_ERROR: 'WS_ERROR' = 'WS_ERROR';
export const WS_GOT_ORDERS: 'WS_GOT_ORDERS' = 'WS_GOT_ORDERS';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CLOSE_CONNECTION: 'WS_CLOSE_CONNECTION' = 'WS_CLOSE_CONNECTION';
export const WS_DISCONNECTED: 'WS_DISCONNECTED' = 'WS_DISCONNECTED';
export const SET_DETAILED_ORDER_IN_MODAL: 'SET_DETAILED_ORDER_IN_MODAL' = 'SET_DETAILED_ORDER_IN_MODAL';

export const wsActions = {
  openConnection: WS_OPEN_CONNECTION,
  onOpen: WS_CONNECTED_SUCCESSFULLY,
  onError: WS_ERROR,
  onGotOrders: WS_GOT_ORDERS,
  sendMessage: WS_SEND_MESSAGE,
  closeConnection: WS_CLOSE_CONNECTION,
  onClose: WS_DISCONNECTED,
  setOrderInModal: SET_DETAILED_ORDER_IN_MODAL,
};

export type TwsActions = {
  openConnection: typeof WS_OPEN_CONNECTION,
  onOpen: typeof WS_CONNECTED_SUCCESSFULLY,
  onError: typeof WS_ERROR,
  onGotOrders: typeof WS_GOT_ORDERS,
  sendMessage: typeof WS_SEND_MESSAGE,
  closeConnection: typeof WS_CLOSE_CONNECTION,
  onClose: typeof WS_DISCONNECTED,
  setOrderInModal: typeof SET_DETAILED_ORDER_IN_MODAL,
};


export interface IsetOrderInModalAction {
  readonly type: typeof SET_DETAILED_ORDER_IN_MODAL;
  readonly orderData: TOrder,
}

export interface IopenConnectionAction {
  readonly type: typeof WS_OPEN_CONNECTION;
}

export const openConnectionAction = (): IopenConnectionAction => {
  return {
    type: WS_OPEN_CONNECTION
  };
};

export interface IonOpenAction {
  readonly type: typeof WS_CONNECTED_SUCCESSFULLY;
}

export const onOpenAction = (): IonOpenAction => {
  return {
    type: WS_CONNECTED_SUCCESSFULLY
  };
}

export interface IonErrorAction {
  readonly type: typeof WS_ERROR;
}

export const onErrorAction = (): IonErrorAction => {
  return {
    type: WS_ERROR
  };
}

export interface IonGotOrdersAction {
  readonly type: typeof WS_GOT_ORDERS;
  readonly ordersData: TOrdersStoreData;
}

export const onGotOrdersAction = (ordersData: TOrdersStoreData): IonGotOrdersAction => {
  return {
    type: WS_GOT_ORDERS,
    ordersData,
  };
}

export interface IsendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string,
  
}

export const sendMessageAction = (message: string): IsendMessageAction => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
}

export interface IcloseConnectionAction {
  readonly type: typeof WS_CLOSE_CONNECTION;
}

export const closeConnectionAction = (): IcloseConnectionAction => {
  return {
    type: WS_CLOSE_CONNECTION
  };
}

export interface IonCloseAction {
  readonly type: typeof WS_DISCONNECTED;
}

export const onCloseAction = (): IonCloseAction => {
  return {
    type: WS_DISCONNECTED
  };
}

export type TwsActionsUnion = IopenConnectionAction | IonOpenAction | IonErrorAction | IonGotOrdersAction | IsendMessageAction | IcloseConnectionAction | IcloseConnectionAction | IonCloseAction | IsetOrderInModalAction;