import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetais from '../components/ingridient-details/ingridient-details';
import { TIngredientObjData } from '../utils/types';


import {
  getIngridientsData,
} from '../services/actions/burgerVendor';
import { urlApiGetIngridients } from '../utils/api-url';

export function IngridientPage() {
  let { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();

  const { arrOfIngridients } = useSelector((store: any) => store.burgerVendor.ingridientsData);

  React.useEffect(() => dispatch(getIngridientsData(urlApiGetIngridients)), [dispatch]);

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