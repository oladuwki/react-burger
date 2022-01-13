import React, { useEffect } from 'react';
import styles from './burger-vendor.module.css';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetais from '../ingridient-details/ingridient-details';
import OrderDetails from '../order-details/order-details';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useSelector } from 'react-redux';


function BurgerVendor() {

  const { modalIsVisible, currentModalType, arrOfIngridients, dataIsLoading, dataHasError } = useSelector((store: any) => ({
    modalIsVisible: store.burgerVendor.modalIsVisible,
    currentModalType: store.burgerVendor.currentModalType,
    ingrInModalData: store.burgerVendor.ingrInModalData,
    arrOfIngridients: store.burgerVendor.ingridientsData.arrOfIngridients,
    dataIsLoading: store.burgerVendor.ingridientsData.ingrDataIsLoading,
    dataHasError: store.burgerVendor.ingridientsData.ingrDataHasError,
  }));

  return (
    <>
      <section className={styles.headerSection}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </section>

      <section className={styles.constructorContainer}>
        {!dataIsLoading && !dataHasError && !!arrOfIngridients.length && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>

            {modalIsVisible && (currentModalType === 'OrderDetails') &&
              <Modal>
                <OrderDetails />
              </Modal>
            }
          </>
        )}
      </section>
    </>
  );
}

export default BurgerVendor;