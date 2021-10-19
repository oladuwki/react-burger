import React from "react";
import OrderDetailsStyles from './order-details.module.css';
import iconDone from '../../images/done.svg'

const OrderDetails = (props) => {
    return (
        <section className={`${OrderDetailsStyles.order_details} pt-20 pb-20`}>
            <h1 className="text text_type_digits-large mb-8">034536</h1>
            <p className="text text_type_main-medium">индефикатор заказа</p>
            <span className="mt-15 mb-15">
                <img src={iconDone} alt="Done icon" />
            </span>
            <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </section>
    )
}

export default OrderDetails;