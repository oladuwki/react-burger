import React, { useEffect } from "react";
import cardStyles from "./ingridient-card.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, DragPreviewImage } from "react-dnd";
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    OPEN_MODAL,
    SET_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
} from '../../services/actions/burgerVendor';
import { TIngredientObjData, TIngredientInStore } from '../../utils/types';

type TIngridientCardProps = {
    objIngridient: TIngredientObjData
};

const IngridientCard: React.FC<TIngridientCardProps> = ({ objIngridient }) => {
    const dispatch = useDispatch();
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

        history.replace({
            pathname: `/ingredients/${objIngridient._id}`,
            state: { background: location },
        });
    };

    const [ingrCounter, setIngrCounter] = React.useState<number>();

    const { ingrInConstructor } = useSelector((state: any): any => {
        if (objIngridient.type === 'bun') {
            return ({ ingrInConstructor: state.burgerVendor.bun });
        }
        if (objIngridient.type === 'sauce' || objIngridient.type === 'main') {
            return ({ ingrInConstructor: state.burgerVendor.draggableIngridients });
        }
    })

    function getNumOfIngridients(): number {
        let counterValue = 0;

        if (objIngridient.type === 'bun') {
            if (ingrInConstructor._id === objIngridient._id) {
                return 2;
            }
        }

        if (objIngridient.type === 'sauce' || objIngridient.type === 'main') {
            ingrInConstructor.forEach((item: TIngredientInStore) => {
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
    }, [ingrInConstructor, objIngridient]);

    /**************************************************** */

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