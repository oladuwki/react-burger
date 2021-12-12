import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import IngredientDetais from '../components/ingridient-details/ingridient-details';
import { TIngredientObjData } from '../utils/types';


export function IngridientPage() {
  let { id } = useParams<{ id?: string }>();

  const { arrOfIngridients } = useSelector((store: any) => store.burgerVendor.ingridientsData);


  let ingridientProp = arrOfIngridients.find((ingr: TIngredientObjData) => ingr._id === id);

  if (!ingridientProp) {
    return null;
  }

  return (
    <div style={{paddingTop: 80,}}>
      <IngredientDetais ingredientData={ingridientProp} />
    </div>
  );
}