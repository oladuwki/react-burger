import { useAppSelector } from '../../services/hooks';
import { FeedCard } from '../feed-card/feed-card';
import s from './scrollable-list.module.css';
import { TOrder } from '../../utils/types';


type TScrollableListProps = {
  isPersonal: boolean,
}

export function ScrollableList({ isPersonal }: TScrollableListProps) {

  const currentOrders: ReadonlyArray<TOrder> = useAppSelector((store) => store.ws.ordersData.orders);

  let reversedOrdersList: Array<TOrder> = [];
  if (currentOrders && isPersonal) {
    reversedOrdersList = currentOrders.slice();
    reversedOrdersList = reversedOrdersList.reverse();
  }

  return (
    <article className={s.main}>
      {!isPersonal && currentOrders && currentOrders.map((order: TOrder) => <FeedCard orderData={order} isPersonal={isPersonal} key={order.number} />)}

      {isPersonal && reversedOrdersList && reversedOrdersList.map((order: TOrder) => <FeedCard orderData={order} isPersonal={isPersonal} key={order.number} />)}
    </article>
  );
}