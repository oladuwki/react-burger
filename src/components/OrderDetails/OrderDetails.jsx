import React from 'react';
import { useSelector } from 'react-redux';
import orderDetails from './OrderDetails.module.css';
import doneIcon from '../../images/done.png';

const OrderDetails = () => {
  const { orderNumber, orderRequest } = useSelector(state => state.order);
  return (
    <>
      {!orderRequest ? (
        <div className={orderDetails.container}>
          <h3 className={`text text_type_digits-large mt-30 ${orderDetails.order}`}>{orderNumber}</h3>
          <p className={`text text_type_main-medium mt-8 ${orderDetails.orderIdText}`}>идентификатор заказа</p>
          <img src={doneIcon} alt='done-icon' className='mt-15' style={{ width: 120, height: 120 }} />
          <p className={`text text_type_main-default mt-15`}>Ваш заказ начали готовить</p>
          <p className={`text text_type_main-default text_color_inactive mt-2`}>Дождитесь готовности на орбитальной станции</p>
        </div>
      ) : (
        <div className={orderDetails.container} style={{ justifyContent: 'center' }}>
          <h1 className='text text_type_main-large'>Загрузка...</h1>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
