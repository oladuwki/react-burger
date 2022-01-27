import React, { useEffect } from "react";
import cardStyles from "./ingridient-card.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, DragPreviewImage } from "react-dnd";
import { useHistory, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks';

import {
    OPEN_MODAL,
    SET_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
} from '../../services/actions/burgerVendor';
import { TIngredientObjData, TIngredientInStore, TDraggableIngr } from '../../utils/types';

type TIngridientCardProps = {
    objIngridient: TIngredientObjData
};

const IngridientCard: React.FC<TIngridientCardProps> = ({ objIngridient }) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation();

    const [{ outline }, dragRef, dragPreviewImg] = useDrag({
        type: 'ingridient',
        item: objIngridient,

        collect: (monitor) => ({
            outline: monitor.isDragging() ? '1px solid #4C4CFF' : '',
        }),
    });

    const openIngridientDetails = () => {
        dispatch({
            type: OPEN_MODAL,
        });
        dispatch({
            type: SET_MODAL_TYPE,
            value: 'IngridientDetails',
        });
        dispatch({
            type: SET_INGRIDIENT_IN_MODAL,
            value: objIngridient,
        });
    };

    const handleClick = () => {
        openIngridientDetails();

        history.push({
            pathname: `/ingredients/${objIngridient._id}`,
            state: { ingredientModal: location },
        });
    };

    const [ingrCounter, setIngrCounter] = React.useState<number>();

    const bunInConstructor: TIngredientObjData | undefined = useAppSelector((state) => {
        if (objIngridient.type === 'bun') {
            return state.burgerVendor.bun ;
        }
        return undefined;
    });

    const draggableIngrInConstructor: TDraggableIngr[] | undefined = useAppSelector((state) => {
        if (objIngridient.type === 'sauce' || objIngridient.type === 'main') {
            return state.burgerVendor.draggableIngridients ;
        }
        return undefined;
    });

    function getNumOfIngridients(): number {
        let counterValue = 0;

        if (objIngridient.type === 'bun') {
            if (bunInConstructor && (bunInConstructor._id === objIngridient._id) ) {
                return 2;
            }
        }

        if (draggableIngrInConstructor && (objIngridient.type === 'sauce' || objIngridient.type === 'main')) {
            draggableIngrInConstructor.forEach((item: TIngredientInStore) => {
                if (item._id === objIngridient._id) {
                    counterValue++;
                }
            });
        }

        return counterValue;
    }

    useEffect(() => {
        setIngrCounter(getNumOfIngridients());
        // eslint-disable-next-line
    }, [bunInConstructor, draggableIngrInConstructor, objIngridient]);

    return (
        <>
            <DragPreviewImage connect={dragPreviewImg} src={objIngridient.image} />
            <div className={cardStyles.ingrCard + ' mb-8'} onClick={handleClick} ref={dragRef} style={{ outline }}>
                <img src={objIngridient.image} alt={objIngridient.name} className={cardStyles.itemPic} />
                <div className={cardStyles.price}>
                    {!!ingrCounter && <Counter count={ingrCounter} size="default" />}
                    <span className="m-2 text_type_digits-default">{objIngridient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className="m-1 text_type_main-default">{objIngridient.name}</h3>
            </div>
        </>
    );
}

export default IngridientCard;