/* eslint-disable */
import React, { useState } from "react";
import { useCallback } from "react";

import s from "./burger-constructor.module.css";
import DraggableItem from "../draggable-item/draggable-item";
import { useDrop } from "react-dnd";
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { Loader } from "../loader/loader";

import { useHistory } from 'react-router-dom';
import { TIngredientType, TIngredientObjData, TIngredientInStore, TFindIngredientInStore, TResortIngrList } from '../../utils/types';

import {
  postBurgerOrderThunk,
  ADD_BUN,
  ADD_SAUCE,
  ADD_MAIN,
  RESORT_DRAGGABLE_INGRIDIENTS,
} from '../../services/actions/burgerVendor';

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { urlApiPostOrder } from '../../utils/api-url';

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { chosenBun, chosenDraggableIngr, isLoggedIn, loaderIsVisible  } = useAppSelector((store) => ({
    chosenBun: store.burgerVendor.bun,
    chosenDraggableIngr: store.burgerVendor.draggableIngridients,
    isLoggedIn: store.user.isLoggedIn,
    loaderIsVisible: store.burgerVendor.constructorLoaderIsVisible,
  }));

  function onDropHandler(objIngridient: TIngredientObjData) {
    addIngridientInConstructor(objIngridient);
  }

  type TGetActionResponse = 'ADD_BUN' | 'ADD_SAUCE' | 'ADD_MAIN' | 'error';

  const getAction = (typeOfIngridient: TIngredientType): TGetActionResponse => {
    if (typeOfIngridient === 'bun') {
      return ADD_BUN;
    }

    if (typeOfIngridient === 'sauce') {
      return ADD_SAUCE;
    }

    if (typeOfIngridient === 'main') {
      return ADD_MAIN;
    }

    return 'error';
  };

  const addIngridientInConstructor = (objIngridient: TIngredientObjData) => {
    dispatch({
      type: getAction(objIngridient.type),
      value: objIngridient,
    })
  };

  const [{ background }, dropTarget] = useDrop({
    accept: "ingridient",
    drop(objIngridient: TIngredientObjData) {
      onDropHandler(objIngridient);
    },
    collect: monitor => ({
      background: monitor.isOver() ? 'radial-gradient(circle, rgba(63,94,251,0.6110819327731092) 0%, rgba(252,70,107,0) 44%)' : '',
    }),
  });

  const findIngridientInStore = useCallback<TFindIngredientInStore>(
    (targetIngrID) => {
      const objIngrData = chosenDraggableIngr.filter((objIngr: TIngredientInStore) => objIngr.instanceID === targetIngrID)[0];
      return {
        objIngrData,
        ingrIndexInStore: chosenDraggableIngr.indexOf(objIngrData),
      };
    },
    [chosenDraggableIngr]
  );

  const resortIngrList: TResortIngrList =
    (draggedInstanceId: number, droppedIndexInStore: number) => {
      const { ingrIndexInStore } = findIngridientInStore(draggedInstanceId);

      dispatch({
        type: RESORT_DRAGGABLE_INGRIDIENTS,
        indexOfDraggedIngr: ingrIndexInStore,
        indexOfDroppedIngr: droppedIndexInStore,
      });
    };

  const [, dropResort] = useDrop(() => ({ accept: "draggableIngridient" }));

  function getTotalPrice(): number {
    const priceOfBun = chosenBun.price * 2;
    let priceOfDraggableIngr = 0;

    if (chosenDraggableIngr.length > 0) {
      priceOfDraggableIngr = chosenDraggableIngr.reduce(function (summ: number, ingridient: TIngredientInStore) {
        return summ + Number(ingridient.price);
      }, 0);
    }

    return priceOfBun + priceOfDraggableIngr;
  }

  function createPostBody() {
    const arrWithOrderData = [];

    arrWithOrderData.push(chosenBun["_id"]);

    chosenDraggableIngr.forEach((obj: TIngredientInStore) => {
      arrWithOrderData.push(obj["_id"]);
    });

    return { "ingredients": arrWithOrderData };
  }

  const sendOrderToApi = async () => {
    if (!isLoggedIn) {
      return (history.push({ pathname: '/login' }));
    }

    return dispatch(postBurgerOrderThunk(urlApiPostOrder, createPostBody));
  };

  return (
    <section className={s.container} ref={dropTarget} style={{ background }}>
      { loaderIsVisible ? <div className={s.loader}><Loader /></div> : null}


      <ul className={s.chosenIngridients + ' mb-6'}>
        {(chosenBun.name) &&
          (
            <li className={s.topIngridinet}>
              <ConstructorElement type="top" isLocked={true} text={chosenBun.name + " (верх)"} thumbnail={chosenBun.image} price={chosenBun.price} />
            </li>
          )
        }

        {(chosenDraggableIngr.length > 0) &&
          (
            <li className={s.draggableIngridinetContainer} ref={dropResort}>
              {chosenDraggableIngr.map((ingr: TIngredientInStore, index: number) => {
                return (
                  <DraggableItem
                    key={ingr.instanceID}
                    ingrInstanceID={ingr.instanceID}
                    ingrData={ingr}
                    ingrIndexInStoreArr={index}
                    resortIngrList={resortIngrList}
                    findIngridient={findIngridientInStore}
                  />
                )
              })
              }
            </li>
          )
        }

        {(chosenBun.name) &&
          (
            <li className={s.bottomIngridinet}>
              <ConstructorElement type="bottom" isLocked={true} text={chosenBun.name + " (низ)"} thumbnail={chosenBun.image} price={chosenBun.price} />
            </li>
          )
        }

      </ul>

      <div className={s.totalBar}>
        {(chosenBun.name) &&
          (
            <>
              <span className={'text text_type_digits-medium mr-10'}>{getTotalPrice()}<CurrencyIcon type={'primary'} /></span>
              <Button type="primary" size="large" onClick={sendOrderToApi}>Оформить заказ</Button>
            </>
          )
          ||
          (
            <div style={{ margin: '0 auto' }}>
              {(!chosenBun.name) && (chosenDraggableIngr.length < 1) &&
                (
                  <span className={'text text_type_main-medium mr-10'} style={{ textAlign: 'center', justifyContent: 'center', display: 'table-cell', paddingRight: '40px' }}>
                    Перетащите сюда ингридиенты, <br></br>которые хотите добавить в бургер
                  </span>
                )
                ||
                (
                  <span className={'text text_type_main-medium mr-10'} style={{}}>
                    Выберите булку для бургера
                  </span>
                )
              }
            </div>
          )
        }

      </div>

    </section>
  );
}

export default BurgerConstructor;