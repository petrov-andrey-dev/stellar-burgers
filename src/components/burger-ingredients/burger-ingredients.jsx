import React from "react";
import {
    Tab,
    CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./burger-ingredients.module.css";
import PropTypes from 'prop-types';
import { ingredientPropType } from "../../utils/prop-types";

function Ingredient({ data, stateModal, setStateModal }) {
    return (
        <div className={ingredientStyles.item} onClick={() => setStateModal({ ...stateModal, isActive: true, type: 'details', details: { ...data } })}>
            <img src={data.image} alt={data.name} className="pb-2" />
            <div className={`${ingredientStyles.price} pb-2`}>
                <p className="text text_type_digits-default pr-2">{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pb-6">{data.name}</p>
        </div>
    )
};

export default function BurgerIngredients({ data, setStateModal }) {
    const [current, setCurrent] = React.useState('buns');
    const bunsArray = data.filter(item => item.type === 'bun');
    const saucesArray = data.filter(item => item.type === 'sauce');
    const mainsArray = data.filter(item => item.type === 'main');

    function chooseCategory(value) {
        const categoryTitle = document.querySelector(`#${value}`);

        setCurrent(value);
        categoryTitle.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className={`${ingredientStyles.wrapper}`}>
            <h1 className="mt-10 text text_type_main-large">Соберите бургер</h1>
            <div className={`${ingredientStyles.tabs} pt-5`}>
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
            <div className={`${ingredientStyles.ingredients} custom-scroll mt-10`}>
                <h2 id="buns" className="text text_type_main-medium ">Булки</h2>
                <div className={`${ingredientStyles.items} pr-1 pl-4`}>
                    {
                        bunsArray.map(item => (
                            <Ingredient data={item} key={item._id} setStateModal={setStateModal} />
                        ))
                    }
                </div>
                <h2 id="sauces" className="text text_type_main-medium pt-10">Соусы</h2>
                <div className={`${ingredientStyles.items} pr-1 pl-4`}>
                    {
                        saucesArray.map(item => (
                            <Ingredient data={item} key={item._id} setStateModal={setStateModal} />
                        ))
                    }
                </div>
                <h2 id="mains" className="text text_type_main-medium pt-10">Начинки</h2>
                <div className={`${ingredientStyles.items} pr-1 pl-4`}>
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

Ingredient.propTypes = {
    data: ingredientPropType.isRequired,
    stateModal: PropTypes.object,
    setStateModal: PropTypes.func.isRequired

};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired,
    setStateModal: PropTypes.func.isRequired
};
