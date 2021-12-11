import React from 'react';
import indexStyles from './app.module.css';
import { Route, Switch, useLocation, useHistory, } from 'react-router-dom';

import { ProtectedRoute } from '../protected-route/protected-route';
import { Location } from 'history';

import Modal from '../modal/modal';
import IngredientDetais from '../ingridient-details/ingridient-details';
import { useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header';
import BurgerVendor from '../burger-vendor/burger-vendor';
import { LoginPage, RegistrationPage, ForgotPage, ResetPassword, ProfilePage, IngridientPage } from '../../pages';

type TLocationState = {
  background?: Location;
};

function App() {

  const history = useHistory();
  let location = useLocation<TLocationState | undefined>();
  let background = location.state && location.state.background;
  console.log('background', background);

  const { modalIsVisible, ingrInModalData } = useSelector((store: any) => store.burgerVendor); // хранилище типизируем в следующем спринте
  React.useEffect(() => {
    history.replace({
      state: { background: undefined },
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppHeader />

      <main className={indexStyles.main}>
        <Switch location={background || location}>
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
            /profile/orders — страница истории заказов пользователя. Доступен только авторизованным пользователям.
            <br /><a href="/profile/orders/123">Страница заказа 123</a>
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id">
            /profile/orders/:id — страница заказа в истории заказов. Доступен только авторизованным пользователям.

          </ProtectedRoute>

          <Route path="/ingredients/:id">
            <IngridientPage />
          </Route>

          <Route path="/feed" exact={true}>
            /feed — страница ленты заказов. Доступен всем пользователям.
          </Route>

          <Route path="/feed/:id">
            /feed/:id — страница заказа в ленте. Доступен всем пользователям.
          </Route>

          <Route path="/" exact={true}>
            <BurgerVendor />
          </Route>
        </Switch>

        {background && (
          <Route path="/ingredients/:id">
            {modalIsVisible && (
              <Modal>
                <IngredientDetais ingredientData={ingrInModalData} />
              </Modal>
            )}
          </Route>
        )}
      </main>
    </>
  );
}

export default App;
