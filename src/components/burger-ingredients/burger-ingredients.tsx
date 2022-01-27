import React, { useRef } from "react";
import ingrStyles from "./burger-ingredients.module.css";
import CardList from "../ingridients-cardlist/ingridients-cardlist";

import {
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TIngredientType } from '../../utils/types';

function BurgerIngredients() {
    const [currentTab, setCurrentTab] = React.useState<string>("bun");

    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    function scrollIntoRef(tabName: TIngredientType): void {

        let currentTab;

        if (tabName === 'bun') {
            currentTab = bunRef;
        }
        else if (tabName === 'sauce') {
            currentTab = sauceRef;
        }
        else if (tabName === 'main') {
            currentTab = mainRef
        }

        currentTab && currentTab.current && currentTab.current.scrollIntoView({ block: "start", behavior: "smooth" });

    }

    const handleTabClick = (value: string): void => {
        setCurrentTab(value);
        scrollIntoRef(value as TIngredientType);
    };

    const handleScroll = () => {

        const scrollContainerPosition = scrollContainerRef.current ? scrollContainerRef.current.getBoundingClientRect().top : 0;
        const bunHeaderPosition = bunRef.current ? bunRef.current.getBoundingClientRect().top : 0;
        const sauceHeaderPosition = sauceRef.current ? sauceRef.current.getBoundingClientRect().top : 0;
        const mainHeaderPosition = mainRef.current ? mainRef.current.getBoundingClientRect().top : 0;
        const bunDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
        const sauceDiff = Math.abs(scrollContainerPosition - sauceHeaderPosition);
        const mainDiff = Math.abs(scrollContainerPosition - mainHeaderPosition);

        if (bunDiff < sauceDiff) {
            setCurrentTab("bun");
        } else if (sauceDiff < mainDiff) {
            setCurrentTab("sauce");
        } else {
            setCurrentTab("main");
        }

    };

    return (
        <section className={ingrStyles.ingridiensContainer}>
            <div className={ingrStyles.tabs}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={handleTabClick}>Булки</Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleTabClick}>Соусы</Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={handleTabClick}>Начинки</Tab>
            </div>

            <div className={ingrStyles.ingrDisplay + ' mt-10'} ref={scrollContainerRef} onScroll={handleScroll}>

                <div className={ingrStyles.ingrShowcase} ref={bunRef}>
                    <h3 className="text text_type_main-medium">Булки</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"bun"} />
                    </div>
                </div>

                <div className={ingrStyles.ingrShowcase} ref={sauceRef}>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"sauce"} />
                    </div>
                </div>

                <div className={ingrStyles.ingrShowcase} ref={mainRef}>
                    <h3 className="text text_type_main-medium">Начинки</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"main"} />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default BurgerIngredients;