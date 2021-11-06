import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import constructorStyle from "./burger-constructor-item.module.css";
import {useDispatch} from "react-redux";
import {
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR
} from "../../services/actions/burger-constructor";
import {useDrag, useDrop} from "react-dnd";

const BurgerConstructorIngredient =(props) => {
    const {_id, name, price, image, uuid, index} = props;
    const dispatch = useDispatch();
    const handleRemoveIngredient = () => {
        dispatch({
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            id: uuid
        })
    }

    const ref = useRef(null);

    const moveCardHandler = (dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
            dragIndex,
            hoverIndex
        })
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'sortable',
        item: () => {
            return { ...props, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;

    const [, drop] = useDrop({
        accept: 'sortable',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCardHandler(dragIndex, hoverIndex);
            item.index = hoverIndex
        },
    });

    drag(drop(ref))

    return (<li _id={_id} style={{opacity: opacity}} className={constructorStyle.item} ref={ref}>
        <div className="mr-2" style={{cursor: 'pointer'}}>
            <DragIcon type={"primary"}/>
        </div>
        <ConstructorElement
            text={name}
            price={price}
            thumbnail={image}
            handleClose={handleRemoveIngredient}
        />
    </li>)
}

BurgerConstructorIngredient.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
}
export default BurgerConstructorIngredient;