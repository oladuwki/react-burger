import React, { useEffect } from "react";
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';
import { Route, Switch, useLocation, useHistory, } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { confirmAuthThunk } from '../../services/actions/userActions';
import {
  CLOSE_MODAL,
  getIngridientsDataThunk, SET_MODAL_TYPE,
} from '../../services/actions/burgerVendor';
import { urlApiGetIngridients } from '../../utils/api-url';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Location } from 'history';
import Modal from '../modal/modal';
import IngredientDetais from '../ingridient-details/ingridient-details';
import { useAppSelector } from '../../services/hooks';
import AppHeader from '../app-header/app-header';
import BurgerVendor from '../burger-vendor/burger-vendor';
import { FeedDetailedCard } from '../feed-detailed-card/feed-detailed-card';
import { LoginPage, RegistrationPage, ForgotPage, ResetPassword, ProfilePage, FeedPage, IngridientPage, ProfileOrdersPage, OrderPage } from '../../pages';

type TLocationState = {
  ingredientModal?: Location;
  feedModal?: Location;
  profileOrderModal?: Location;
};

function App() {

  const history = useHistory();
  let location = useLocation<TLocationState | undefined>();

  const action = history.action === 'PUSH' || history.action === 'REPLACE'; //  history.action is mutable and automatically updates as the location changes. https://github.com/remix-run/history/blob/main/docs/api-reference.md 

  const modalIngredientOpen = action && location.state && location.state.ingredientModal;
  const modalFeedOrderOpen = action && location.state && location.state.feedModal;
  const modalProfileOrderOpen = action && location.state && location.state.profileOrderModal;
  const currentModalType = useAppSelector(state => state.burgerVendor.currentModalType);
  const { ingrInModalData } = useAppSelector((store) => store.burgerVendor); // хранилище типизируем в следующем спринте

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch({
      type: CLOSE_MODAL,
    });

    dispatch({
      type: SET_MODAL_TYPE,
      value: 'none',
    });

    if (currentModalType === 'OrderDetails') {
      return history.push({
        state: { background: location },
      })
    }

    history.goBack();
  }
  
  useEffect(() => {
    dispatch(confirmAuthThunk());
    dispatch(getIngridientsDataThunk(urlApiGetIngridients));
  }, [dispatch]);

  return (
    <>
      <AppHeader />

      <main className={indexStyles.main}>
        <Switch location={modalIngredientOpen || modalFeedOrderOpen || modalProfileOrderOpen || location}>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/registration">
            <RegistrationPage />
          </Route>

          <Route path="/forgot-password">
            <ForgotPage />
          </Route>

          <Route path="/reset-password">
            <ResetPassword />
          </Route>

          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfileOrdersPage />

          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id">
            <OrderPage orderSource={'personalOrder'} />

          </ProtectedRoute>

          <Route path="/ingredients/:id">
            <IngridientPage />
          </Route>

          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>

          <Route path="/feed/:id">
            <OrderPage orderSource={'feed'} />
          </Route>

          <Route path="/" exact={true}>
            <BurgerVendor handleClose = {handleClose} />
          </Route>
        </Switch>

        {modalIngredientOpen && (
            <Route path="/ingredients/:id">
              <Modal handleClose = {handleClose}>
                <IngredientDetais ingredientData={ingrInModalData} />
              </Modal>
            </Route>
        )}

        {modalFeedOrderOpen && (
            <Route path="/feed/:id">
              <Modal handleClose={handleClose}>
                <FeedDetailedCard />
              </Modal>
            </Route>
        )}

        {modalProfileOrderOpen && (
            <ProtectedRoute path="/profile/orders/:id">
              <Modal handleClose = {handleClose}>
                <FeedDetailedCard />
              </Modal>
            </ProtectedRoute>
        )}

      </main>
    </>
  );
}

export default App;
