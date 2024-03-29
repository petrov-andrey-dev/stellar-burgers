import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { openModal } from "../../services/modalSlice";
import { TOrder, TIngredient } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import s from "./order-card.module.css";

type TOrderCoardProps = {
    data: TOrder
}

export default function OrderCard({ data }: TOrderCoardProps) {
    const dispatch = useAppDispatch();
    const location = useLocation();
    
    const { ingredients } = useAppSelector(state => state.ingredients);

    const orderIngredients = useMemo(() => data.ingredients.map(id => {
        return ingredients.find(item => item._id === id) as TIngredient
    }), [data.ingredients, ingredients]);

    const total = useMemo(() => orderIngredients.reduce((acc, p) => acc + p.price, 0), [orderIngredients]);

    const handleOnOrder = () => {
        dispatch(openModal({ details: data }))
    };
    
    const url = useMemo(() => {
        return location.pathname === '/feed'
            ? `/feed/${data.number}`
            : location.pathname === '/profile/orders'
                ? `/profile/orders/${data.number}`
                : '/'
    }, [location, data.number]);

    if (orderIngredients === null) {
        return null;
    };

    return (
            <Link to={url} state={{ background: location }} className={s.link} >
            <div className={s.card} onClick={handleOnOrder}>
                <div className={s.cardTop}>
                    <p className="text text_type_main-default">#{data.number}</p>
                    <p>
                        <FormattedDate date={new Date(data.createdAt)} className="text text_type_main-default text_color_inactive" />
                    </p>
                </div>
                <div className={s.cardCenter}>
                    <p className="text text_type_main-medium">{data.name}</p>
                </div>
                <div className={s.cardButtom}>
                    <div className={s.ingtedients}>
                        {
                            orderIngredients.map(item => {
                                return <img key={uuidv4()} className={s.pic} src={item?.image_mobile} alt='pic'/>
                            })
                        }
                    </div>
                    <div className={s.price}>
                        <p className="text text_type_digits-medium">{total}</p>
                        <CurrencyIcon type='primary'/>
                    </div>
                </div>
            </div>
        </Link>
    )
};