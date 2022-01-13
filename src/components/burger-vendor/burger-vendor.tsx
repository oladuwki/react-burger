import s from './burger-vendor.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from '../../services/hooks';
import {FC, ReactNode} from "react";

interface IModalProps {
    handleClose: () => void;
}

const BurgerVendor: FC<IModalProps> = ({  handleClose }) => {
  const { modalIsVisible, currentModalType, arrOfIngridients, dataIsLoading, dataHasError } = useAppSelector((store) => ({
    modalIsVisible: store.burgerVendor.modalIsVisible,
    currentModalType: store.burgerVendor.currentModalType,
    ingrInModalData: store.burgerVendor.ingrInModalData,
    arrOfIngridients: store.burgerVendor.ingridientsData.arrOfIngridients,
    dataIsLoading: store.burgerVendor.ingridientsData.ingrDataIsLoading,
    dataHasError: store.burgerVendor.ingridientsData.ingrDataHasError,
  }));

  return (
    <>
      <section className={s.headerSection}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </section>

      <section className={s.constructorContainer}>
        {!dataIsLoading && !dataHasError && !!arrOfIngridients && !!arrOfIngridients.length && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>

            {modalIsVisible && (currentModalType === 'OrderDetails') &&
              <Modal handleClose={handleClose}>
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