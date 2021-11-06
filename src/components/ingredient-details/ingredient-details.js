import React from 'react';
import ingredientDetailsStyle from './ingredient-details.module.css';
import dataPropTypes from "../../utils/prop-types";

function IngredientDetails(props) {
    return (
        <div className={ingredientDetailsStyle.container}>
            <img src={props.data.image_large} alt=""/>
            <h5 className="text text_type_main-medium mt-4">{props.data.name}</h5>
            <div className={`${ingredientDetailsStyle.flex} mt-8`}>
                <div className={`${ingredientDetailsStyle.item} mr-5`}>
                    <span className="text text_color_inactive text_type_main-default">Калории,ккал</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{props.data.calories}</span>
                </div>
                <div className={`${ingredientDetailsStyle.item} mr-5`}>
                    <span className="text text_color_inactive text_type_main-default">Белки, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{props.data.proteins}</span>
                </div>
                <div className={`${ingredientDetailsStyle.item} mr-5`}>
                    <span className="text text_color_inactive text_type_main-default">Жиры, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{props.data.fat}</span>
                </div>
                <div className={`${ingredientDetailsStyle.item} mr-5`}>
                    <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{props.data.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {data: dataPropTypes.isRequired};

export default  IngredientDetails;