import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './AppHeader.module.css';

const AppHeader = () => {
  const { pathname } = useLocation();
  return (
    <header className={`${appHeader.header} pt-4 pb-4`}>
      <div className={appHeader.headerContent}>
        <div className={`${appHeader.navGroup}`}>
          <NavLink exact to='/' className={`${appHeader.navButton} pt-4 pb-4 pl-5 pr-5 mr-2`} activeClassName={appHeader.activeNavButton}>
            <BurgerIcon type={`${pathname === '/' ? 'primary' : 'secondary'}`} />
            <p className={`text text_type_main-medium ml-2 ${appHeader.navText}`}>Конструктор</p>
          </NavLink>
          <NavLink to='/orders' className={`${appHeader.navButton} pt-4 pb-4 pl-5 pr-5`} activeClassName={appHeader.activeNavButton}>
            <ListIcon type={`${pathname === '/orders' ? 'primary' : 'secondary'}`} />
            <p className={`text text_type_main-medium ml-2 ${appHeader.navText}`}>Лента заказов</p>
          </NavLink>
        </div>
        <Link to='/'>
          <Logo />
        </Link>
        <div className={`${appHeader.navGroup}`} style={{ justifyContent: 'flex-end' }}>
          <NavLink to='/profile' className={`${appHeader.navButton} pt-4 pb-4 pl-5 pr-5`} activeClassName={appHeader.activeNavButton}>
            <ProfileIcon type={`${pathname.includes('/profile') ? 'primary' : 'secondary'}`} />
            <p className={`text text_type_main-medium ml-2 ${appHeader.navText}`}>Личный кабинет</p>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
