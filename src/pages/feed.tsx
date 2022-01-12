import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { ScrollableList } from '../components/scrollable-list/scrollable-list';
import { wsActions } from '../services/actions/wsActions';
import { TOrder } from '../utils/types';
import { wsAllOrders } from '../utils/api-url';
// @ts-ignore
import s from './feed.module.css';

export function FeedPage() {

  const dispatch = useAppDispatch();

  const currentOrders: ReadonlyArray<TOrder> = useAppSelector((store) => store.ws.ordersData.orders);
  const ordersTotalToday = useAppSelector((store) => store.ws.ordersData.totalToday);
  const ordersTotalEver = useAppSelector((store) => store.ws.ordersData.total);

  const оrdersDone: number[] = [];
  const оrdersInWork: number[] = [];

  if (currentOrders) {
    currentOrders.forEach((item: TOrder) => {
      if (item.status === 'done') {
        оrdersDone.push(item.number);
      } else {
        оrdersInWork.push(item.number);
      }
    });
  }

  const getLiElement = (orderNumber: number, key: number) => {
    return (<li className={s.liElem + ' text text_type_digits-default mb-2'} key={key}>{orderNumber}</li>)
  }

  useEffect(() => {
    dispatch({
      type: wsActions.openConnection,
      url: wsAllOrders, 
    });
    return () => {
      dispatch({ type: wsActions.closeConnection });
    };
  }, [dispatch]);

  return (
    <>
      <section className={s.headerSection}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </section>

      <section className={s.feedData}>

        <section className={s.feedContent}>
          <ScrollableList isPersonal={false} />
        </section>

        <section className={s.feedChart}>

          <div className={s.currentOrders}>

            <div className={s.currentChart}>
              <span className={'text text_type_main-medium mb-6'}>Готовы</span>
              <ul className={s.ul} style={{ color: '#00CCCC' }}>
                {оrdersDone.slice(0, 18).map((item) => getLiElement(item, item))}
              </ul>
            </div>

            <div className={s.currentChart}>
              <span className={'text text_type_main-medium mb-6'}>В работе</span>
              <ul className={s.ul}>
                {оrdersInWork.slice(0, 18).map((item) => getLiElement(item, item))}
              </ul>
            </div>

          </div>

          <div className={s.totalChart}>

            <div className={s.totalBlock}>
              <span className={s.bigHeader + ' text text_type_main-medium mt-15'}>Выполнено за всё время</span>
              <span className={' text text_type_digits-large mb-15'}>{ordersTotalEver}</span>

            </div>

            <div className={s.totalBlock}>
              <span className={s.bigHeader + ' text text_type_main-medium mt-15'}>Выполнено за сегодня</span>
              <span className={' text text_type_digits-large mb-15'}>{ordersTotalToday}</span>
            </div>

          </div>

        </section>
      </section>
    </>
  );
}