export type TIngredientType = 'bun' | 'sauce' | 'main';
export type TProfileMenuTabsValue = 'profile' | 'orderHistory' | 'logOut';

export type TIngredientObjData = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TIngredientInStore = TIngredientObjData & { instanceID: number }

export type TFindIngredientInStore = (targetIngrID: number) => {
  objIngrData: TIngredientInStore,
  ingrIndexInStore: number,
};

export type TResortIngrList = (dragID: number, dropID: number) => void;
