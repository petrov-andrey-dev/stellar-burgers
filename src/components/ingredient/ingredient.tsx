import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { openModal } from "../../services/modalSlice";
import { TIngredient } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import s from "./ingredient.module.css";

type TIngredientProps = {
    data: TIngredient;
}

export default function Ingredient({ data }: TIngredientProps) {
    const dispatch = useAppDispatch();
    const [counter, setCounter] = useState(0);
    const location = useLocation();

    const ingredientId = data._id;

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: data
    })

    const { bun, otheringredientsArray } = useAppSelector(state => state.constructorData)

    useEffect(() => {
        let count = 0;
        if (bun !== null) {
            if (data.type === 'bun') {
                bun._id === data._id ? count = 2 : count = 0;
            } else {
                count = otheringredientsArray.filter(item => item._id === data._id).length
            }
        }
        setCounter(count);
    }, [bun, otheringredientsArray, data._id, data.type])

    const handleOnIngredient = () => {
        dispatch(openModal({ details: data }))
    }

    return (
        <Link 
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
        className={s.link}
        >
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
        </Link>
    )
};
