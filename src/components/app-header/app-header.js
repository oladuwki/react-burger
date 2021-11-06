import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

function AppHeader() {
    return (
        <div className={appHeaderStyles.body__container}>
            <div className={appHeaderStyles.appbar}>
                <div className={appHeaderStyles.container__buttons}>
                    <div className={appHeaderStyles.container__button}>
                        <BurgerIcon type="primary" />
                        <a href="/" className='text text_type_main-default ml-3'>Конструктор</a>
                    </div>
                    <div className={appHeaderStyles.container__button}>
                        <ListIcon type="primary" className={appHeaderStyles.icons} />
                        <a href="/" className='text text_type_main-default ml-3'>Лента Заказов</a>
                    </div>
                </div>
                <Logo />
                <div></div>
                <div className={appHeaderStyles.container__button}>
                    <ProfileIcon type='primary' />
                    <a href="/" className='text text_type_main-default ml-3'>Личный Кабинет</a>
                </div>
            </div>
        </div>
    );
}

export default AppHeader;