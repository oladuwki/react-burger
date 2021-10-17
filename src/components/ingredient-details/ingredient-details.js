import React from "react";
import IngredientDetailsStyles from './ingredients-details.module.css';
import PropTypes from 'prop-types';


const IngredientDetails = (props) => {

    return (
        <section className={IngredientDetailsStyles.ingredients_content}>
            <img className={`${IngredientDetailsStyles.ingredient_image} mb-4`} src={props.image_large} alt="props.name" />
            <h2 className="text text_type_main-medium">{props.name}</h2>
            <section className={`${IngredientDetailsStyles.food_value} mt-8 text_type_main-default text_color_inactive`}>
                <div>
                    <p>Калории, ккал</p>
                    <p>{props.calories}</p>
                </div>
                <div>
                    <p>Белки, г</p>
                    <p>{props.proteins}</p>
                </div>
                <div>
                    <p>Жиры, г</p>
                    <p>{props.fat}</p>
                </div>
                <div>
                    <p>Углеводы, г</p>
                    <p>{props.carbohydrates}</p>
                </div>
            </section>
        </section>
    )
}

IngredientDetails.propTypes = {
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}

export default IngredientDetails;