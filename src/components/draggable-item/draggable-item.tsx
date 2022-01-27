import React from "react";
import diStyles from "./draggable-item.module.css";
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { useDrag, useDrop } from "react-dnd";
import {
    UPDATE_DRAGGABLE_INGRIDIENTS,
} from '../../services/actions/burgerVendor';
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TIngredientObjData, TFindIngredientInStore, TResortIngrList } from '../../utils/types';


type TDraggableItemProps = {
    ingrInstanceID: number,
    ingrData: TIngredientObjData,
    ingrIndexInStoreArr: number,
    resortIngrList: TResortIngrList,
    findIngridient: TFindIngredientInStore,
}

const DraggableItem: React.FC<TDraggableItemProps> = ({ ingrInstanceID, ingrData, ingrIndexInStoreArr, resortIngrList, findIngridient }) => {
    const dispatch = useAppDispatch();

    const stateDraggableIngridients = useAppSelector((store) => store.burgerVendor.draggableIngridients);

    const deleteThisIngridient = () => {
        const arrOfIngrObjects = stateDraggableIngridients.slice(0);

        arrOfIngrObjects.splice(ingrIndexInStoreArr, 1);

        dispatch({
            type: UPDATE_DRAGGABLE_INGRIDIENTS,
            value: arrOfIngrObjects,
        });
    }

    const [{ isDragging }, dragItem, draggedPreview] = useDrag(
        () => ({
            type: "draggableIngridient",
            item: { ingrInstanceID, ingrIndexInStoreArr },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const didDrop = monitor.didDrop();
                if (!didDrop) {
                    resortIngrList(item.ingrInstanceID, item.ingrIndexInStoreArr);
                }
            },
        }),
        [ingrInstanceID, ingrIndexInStoreArr, resortIngrList]
    );

    const [, targetOfDrop] = useDrop(
        // @ts-ignore
        () => ({
            accept: "draggableIngridient",
            canDrop: () => false,
            hover({ ingrInstanceID: draggedInstanceId }) {
                if (draggedInstanceId !== ingrInstanceID) {
                    const { ingrIndexInStore: droppedIndexInStore } = findIngridient(ingrInstanceID);
                    resortIngrList(draggedInstanceId, droppedIndexInStore);
                }
            },
        }),
        [findIngridient, resortIngrList]
    );

    const opacity = isDragging ? 0 : 1;

    return (

        <div className={diStyles.draggableItime} ref={(node) => targetOfDrop(draggedPreview(node))} style={{ opacity }}>
            <button ref={dragItem} className={diStyles.draggableButton}>
                <DragIcon type="primary" />
            </button>
            <ConstructorElement text={ingrData.name} thumbnail={ingrData.image} price={ingrData.price} handleClose={deleteThisIngridient} />
        </div>
    )
}

export default DraggableItem;