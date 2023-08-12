import React from "react";
import {
    Tab,
    CurrencyIcon,
    Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./burger-ingredients.module.css"
import PropTypes from 'prop-types';
import { ingredientPropType } from "../../utils/prop-types";

function Ingredient({src, name, price}) {
    return (
        <div className={ingredientStyles.item}>
            <img src={src} alt={name} className="pb-2" />
            <div className={`${ingredientStyles.price} pb-2`}>
                <p className="text text_type_digits-default pr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pb-6">{name}</p>
        </div>
    )
}

export default function BurgerIngredients({data}) {
    const [current, setCurrent] = React.useState('buns');
    const bunsArray = data.filter(item => item.type === 'bun');
    const saucesArray = data.filter(item => item.type === 'sauce');
    const mainsArray = data.filter(item => item.type === 'main');

    return (
        <section className={`${ingredientStyles.wrapper}`}>
            <h1 className="mt-10 text text_type_main-large">Соберите бургер</h1>
            <div className={`${ingredientStyles.tabs} pt-5`}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`${ingredientStyles.ingredients} custom-scroll mt-10`}>
                <h2 className="text text_type_main-medium ">Булки</h2>
                <div className={`${ingredientStyles.items} pr-1 pl-4`}>
                    {
                        bunsArray.map(item => (
                            <Ingredient src={item.image} price={item.price} name={item.name} key={item._id} />
                        ))
                    }
                </div>
                <h2 className="text text_type_main-medium pt-10">Соусы</h2>
                <div className={`${ingredientStyles.items} pr-1 pl-4`}>
                    {
                        saucesArray.map(item => (
                            <Ingredient src={item.image} price={item.price} name={item.name} key={item._id} />
                        ))
                    }
                </div>
                <h2 className="text text_type_main-medium pt-10">Начинки</h2>
                <div className={`${ingredientStyles.items} pr-1 pl-4`}>
                    {
                        mainsArray.map(item => (
                            <Ingredient src={item.image} price={item.price} name={item.name} key={item._id} />
                        ))
                    }
                </div>
            </div>
        </section>

    )
};

Ingredient.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired
};
