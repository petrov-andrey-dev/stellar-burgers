import {useEffect, useState, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { useSelector} from "react-redux";
import { useInView } from "react-intersection-observer";

export default function BurgerIngredients() {
    const { ingredients } = useSelector(state => state.ingredients)
    const [current, setCurrent] = useState('buns');
    const [bunRef, bunInView] = useInView({ threshold: 0 });
    const [sauceRef, sauceInView] = useInView({ threshold: 0 });
    const [mainRef, mainInView] = useInView({ threshold: 0 });
    
    useEffect(() => {
        if (bunInView) {
            setCurrent('buns')
        } else if (sauceInView) {
            setCurrent('sauces')
        } else if (mainInView) {
            setCurrent('mains')
        }
    }, [bunInView, sauceInView, mainInView]);

    const bunsArray = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
    const saucesArray = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);
    const mainsArray = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);
    
    function chooseCategory(value) {
        const categoryTitle = document.querySelector(`#${value}`);
        setCurrent(value);
        categoryTitle.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className={`${s.wrapper}`}>
            <h1 className="mt-10 text text_type_main-large">Соберите бургер</h1>
            <div className={`${s.tabs} pt-5`}>
                <Tab value="buns" active={current === 'buns'} onClick={chooseCategory}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={chooseCategory}>
                    Соусы
                </Tab>
                <Tab value="mains" active={current === 'mains'} onClick={chooseCategory}>
                    Начинки
                </Tab>
            </div>
            <div className={`${s.ingredients} custom-scroll mt-10`}>
                <h2 id="buns" className="text text_type_main-medium ">Булки</h2>
                <div className={`${s.items} pr-1 pl-4`} ref={bunRef}>
                    {
                        bunsArray.map(item => (
                            <Ingredient data={item} key={item._id} />
                        ))
                    }
                </div>
                <h2 id="sauces" className="text text_type_main-medium pt-10">Соусы</h2>
                <div className={`${s.items} pr-1 pl-4`}  ref={sauceRef}>
                    {
                        saucesArray.map(item => (
                            <Ingredient data={item} key={item._id} />
                        ))
                    }
                </div>
                <h2 id="mains" className="text text_type_main-medium pt-10">Начинки</h2>
                <div className={`${s.items} pr-1 pl-4`} ref={mainRef}>
                    {
                        mainsArray.map(item => (
                            <Ingredient data={item} key={item._id} />
                        ))
                    }
                </div>
            </div>
        </section>

    )
};