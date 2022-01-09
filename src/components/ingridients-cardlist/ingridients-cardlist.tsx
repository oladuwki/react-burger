import React from "react";
import IngridientCard from "../ingridient-card/ingrdient-card";
import { TIngredientObjData, TIngredientType } from '../../utils/types';

import { useAppSelector } from '../../services/hooks';

type TCardListProps = { type: TIngredientType };

const CardList: React.FC<TCardListProps> = ({ type }) => {

    const arrOfIngridients = useAppSelector((store) => store.burgerVendor.ingridientsData.arrOfIngridients);

    const arrTargetedIngridients = arrOfIngridients.filter(function (obj: TIngredientObjData) {
        return obj.type === type;
    });

    return (
        <>
            {
                arrTargetedIngridients.map((obj: TIngredientObjData, index: number) => {
                    return (
                        <IngridientCard
                            objIngridient={obj}
                            key={obj._id}                            
                        />
                    )
                })
            }
        </>
    );
}

export default CardList;