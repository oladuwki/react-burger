import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyles from './app-header.module.css';

const AppHeader = () => {

    return (
        <header className={`${AppHeaderStyles.header} pt-4 pb-4 text_type_main-default`}>
            <nav className={AppHeaderStyles.menu}>
                <span className={`${AppHeaderStyles.menu__item} pr-5 pl-5 mr-2`}>
                    <BurgerIcon />
                    <span className="ml-2">Конструктор</span>
                </span>
                <span className={`${AppHeaderStyles.menu__item} pr-5 pl-5`}>
                    <ListIcon type="secondary" />
                    <span className="ml-2 text_color_inactive">Лента заказов</span>
                </span>
            </nav>
            <Logo />
            <span className={`${AppHeaderStyles.profile} pr-5 pl-5`}>
                <ProfileIcon type="secondary" />
                <span className="ml-2 text_color_inactive">Личный кабинет</span>
            </span>
        </header>
    );
}

export default AppHeader;