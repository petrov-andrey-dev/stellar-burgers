import { useEffect, useState } from "react";
import s from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../services/modalSlice";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';

export default function Ingredient({ data }) {
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(0);

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: data
    })
    
    const { bun, otheringredientsArray } = useSelector(state => state.constructorData)
    
    useEffect(() => {
        let count = 0;
        if (bun !== null || otheringredientsArray.length ) {
            if (data.type === 'bun') {
                bun._id === data._id ? count++ : count = 0;
            } else {
                count = otheringredientsArray.filter(item => item._id === data._id).length
            }
        }
        setCounter(count);
    }, [bun, otheringredientsArray, data._id, data.type])

    const handleOnIngredient = () => {
        dispatch(openModal({ type: 'details', details: data }))
    }

    return (
        <div
            ref={dragRef}
            className={s.item}
            onClick={handleOnIngredient}
            draggable
        >
            <img src={data.image} alt={data.name} className="pb-2" />
            <div className={`${s.price} pb-2`}>
                <p className="text text_type_digits-default pr-2">{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pb-6">{data.name}</p>
            {
                counter > 0 &&
                <Counter count={counter} size="default" />
            }
        </div>
    )
};


Ingredient.propTypes = {
    data: ingredientPropType.isRequired,
    index: PropTypes.number.isRequired
};