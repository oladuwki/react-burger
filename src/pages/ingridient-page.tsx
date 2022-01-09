import { useParams } from "react-router-dom";
import { useAppSelector } from '../services/hooks';
import IngredientDetais from '../components/ingridient-details/ingridient-details';
import { TIngredientObjData } from '../utils/types';


export function IngridientPage() {
  const { id } = useParams<{ id?: string }>();

  const { arrOfIngridients } = useAppSelector((store) => store.burgerVendor.ingridientsData);

  const ingridientProp = arrOfIngridients.find((ingr: TIngredientObjData) => ingr._id === id);

  if (!ingridientProp) {
    return null;
  }

  return (
    <div style={{ paddingTop: 80, }}>
      <IngredientDetais ingredientData={ingridientProp} />
    </div>
  );
}