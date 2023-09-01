import React from "react";
import s from "./ingredient.module.css";
import PropTypes from 'prop-types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import { ConstructorContext } from "../../services/burgerContext";

export default function Ingredient({ data, count, stateModal, setStateModal }) {
    const constructorContext = React.useContext(ConstructorContext);

    const handleOnIngredient = () => {
        setStateModal({ 
            ...stateModal, 
            isActive: true, 
            type: 'details', 
            details: { ...data } });
        data.type === 'bun' ?
        constructorContext.constuctorDataDispatch({ type: 'addBun', payload: data})
        :
        constructorContext.constuctorDataDispatch({ type: 'add', payload: data})
    }

    return (
        <div className={s.item} onClick={handleOnIngredient}>
            <img src={data.image} alt={data.name} className="pb-2" />
            <div className={`${s.price} pb-2`}>
                <p className="text text_type_digits-default pr-2">{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pb-6">{data.name}</p>
        </div>
    )
};


Ingredient.propTypes = {
    data: ingredientPropType.isRequired,
    stateModal: PropTypes.object,
    setStateModal: PropTypes.func.isRequired

};