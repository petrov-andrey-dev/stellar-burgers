import {useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-ingredients.module.css";
import PropTypes from 'prop-types';
import { ingredientPropType } from "../../utils/prop-types";
import Ingredient from "../ingredient/ingredient";
import { useSelector} from "react-redux";


export default function BurgerIngredients({ setStateModal }) {
    const { ingredients } = useSelector(state => state.ingredients)

    const [current, setCurrent] = useState('buns');
    const bunsArray = ingredients.filter(item => item.type === 'bun');
    const saucesArray = ingredients.filter(item => item.type === 'sauce');
    const mainsArray = ingredients.filter(item => item.type === 'main');

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
                <div className={`${s.items} pr-1 pl-4`}>
                    {
                        bunsArray.map(item => (
                            <Ingredient data={item} key={item._id} setStateModal={setStateModal} />
                        ))
                    }
                </div>
                <h2 id="sauces" className="text text_type_main-medium pt-10">Соусы</h2>
                <div className={`${s.items} pr-1 pl-4`}>
                    {
                        saucesArray.map(item => (
                            <Ingredient data={item} key={item._id} setStateModal={setStateModal} />
                        ))
                    }
                </div>
                <h2 id="mains" className="text text_type_main-medium pt-10">Начинки</h2>
                <div className={`${s.items} pr-1 pl-4`}>
                    {
                        mainsArray.map(item => (
                            <Ingredient data={item} key={item._id} setStateModal={setStateModal} />
                        ))
                    }
                </div>
            </div>
        </section>

    )
};


BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType),
    setStateModal: PropTypes.func.isRequired
};
