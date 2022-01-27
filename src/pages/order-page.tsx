import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { getAccessTokenLiteral } from '../utils/cookie';


import { wsActions } from '../services/actions/wsActions';
import { TOrder } from '../utils/types';
import { FeedDetailedCard } from '../components/feed-detailed-card/feed-detailed-card';
import { wsAllOrders, wsOrders } from '../utils/api-url';
import {
  SET_DETAILED_ORDER_IN_MODAL,
} from '../services/actions/wsActions';


type TOrderPageProps = {
  orderSource: 'feed' | 'personalOrder'
}

export const OrderPage = ({ orderSource }: TOrderPageProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();

  const currentOrders: ReadonlyArray<TOrder> = useAppSelector((store) => store.ws.ordersData.orders);

  let selectedOrder: undefined | TOrder;
  if (currentOrders) {
    selectedOrder = currentOrders.find(obj => obj._id === id);

    dispatch({
      type: SET_DETAILED_ORDER_IN_MODAL,
      orderData: selectedOrder,
    });
  }

  useEffect(() => {

    if (orderSource === 'feed') {
      dispatch({
        type: wsActions.openConnection,
        url: wsAllOrders,
      });
    }

    if (orderSource === 'personalOrder') {
      dispatch({
        type: wsActions.openConnection,
        url: wsOrders + `?token=${getAccessTokenLiteral()}`,     
      });
    }

    return () => {
      dispatch({ type: wsActions.closeConnection });
    };
  }, [dispatch, orderSource]);

  return (
    <>
      {currentOrders && selectedOrder ? <FeedDetailedCard /> : null}<br />
    </>
  )
}