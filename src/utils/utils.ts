import { format, differenceInDays, formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import { TIngredientObjData, TOrder } from './types';

export const getInstanceID = () => {return (new Date()).getTime()};

export const getFormattedDate = (data: string) => {
  const currentDate = new Date();
  const pastDate = new Date(data);

  const formatedTime =
    format(pastDate, 'HH:mm ') + 'i-' + format(pastDate, 'O');

  const diffDays = differenceInDays(currentDate.getTime(), pastDate.getTime());

  let calendarDate = '';
  if (diffDays === 0) {
    calendarDate = 'Сегодня';
  } else if (diffDays === 1) {
    calendarDate = 'Вчера';
  } else if (diffDays < 5) {
    calendarDate = `${diffDays} дня назад`;
  } else if (diffDays < 20) {
    calendarDate = `${diffDays} дней назад`;
  } else {
    calendarDate = `${formatDistance(new Date(pastDate), Date.now(), { locale: ru })} назад`;
  }

  const res = `${calendarDate}, ${formatedTime}`;
  return res;
};

export const getOrderStatus = (orderStatus: string): string => {
  switch (orderStatus) {
    case ('done'): {
      return 'Выполнен';
    }
    case ('pending'): {
      return 'Готовится';
    }
    default: return 'Отменён'
  }
}

export const getPrice = (arr: Array<TIngredientObjData>) => {
  return arr.reduce((previousValue: number, currentValue: TIngredientObjData) => {
    return previousValue + currentValue.price;
  }, 0);
}

export const getCompletedIngrList = (orderData: TOrder, allIngrCatalog: Array<TIngredientObjData>): Array<TIngredientObjData> => {
  const completedIngrList: Array<TIngredientObjData> = [];


  for (const ingrId of orderData.ingredients) {
    allIngrCatalog.forEach((ingrObj) => {
      if (ingrObj._id === ingrId) {
        completedIngrList.push(ingrObj)
      }
    })
  }

  return completedIngrList;
}