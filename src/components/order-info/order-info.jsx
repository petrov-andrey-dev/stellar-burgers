import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./order-info.module.css";
import { useParams } from "react-router-dom";
import { loadSelectedOrder } from "../../services/orderSlice";

export default function OrderInfo() {
    const dispatch = useDispatch();
    const { number } = useParams();
    const { ingredients } = useSelector(state => state.ingredients);

    useEffect(() => {
        if (!order) {
            dispatch(loadSelectedOrder(number))
        }
    }, []);

    const order = useSelector(state => {
        let order = state.feed.orders.find(order => order.number === parseInt(number))
        if (order) {
            return order;
        }
        order = state.profileOrders.orders.find(order => order.number === parseInt(number))
        if (order) {
            return order;
        }
        return state.order.selectedOrder?.orders[0]
    });

    const orderIngredients = useMemo(() => {
        if (order) {
            return order.ingredients.map(id => {
                return ingredients.find(item => item._id === id)
            })
        }
    }, [order, ingredients]);


    const aggOrderIngredients = useMemo(() => {
        const resultArr = [];
        if (orderIngredients) {
            orderIngredients.map(item => {
                const ingredients = orderIngredients.filter(ing => ing._id === item._id)
                if (resultArr.lenght || !resultArr.find(i => i._id === item._id)) {
                    resultArr.push({ ...ingredients[0], count: ingredients.length })
                }
                return resultArr;
            })
        }

        return resultArr;
    }, [orderIngredients]);

    const total = useMemo(() => {
        if (orderIngredients) {
            return orderIngredients.reduce((acc, p) => acc + p.price, 0)
        }
    }, [orderIngredients]);

    if (!order) {
        return null
    };

    return (
        <div className={s.wrapper}>
            <h3 className="text text_type_digits-default pt-6 pb-6">#{order.number}</h3>
            <h2 className="text text_type_main-medium pt-5">{order.name}</h2>
            <p className={`${order.status === 'done' ? s.done : ''} text text_type_main-default pt-2`}>
                {
                    order.status === 'done' ? 'Выполнен' : 'Готовится'
                }
            </p>
            <p className="text text_type_main-medium pt-10">Состав:</p>
            <div className={`${s.ingredients} custom-scroll pt-8`}>
                {
                    aggOrderIngredients.map(item => {
                        return (
                            <div className={s.ingredient} key={item._id}>
                                <div className={s.ingredientInfo}>
                                    <img src={item.image_mobile} alt={item.name} className={s.pic} />
                                    <p className="text text_type_main-default">{item.name}</p>
                                </div>
                                <div className={`${s.priceContainer} mr-8`}>
                                    <p className="text text_type_digits-default">{`${item.count} x ${item.price}`}</p>
                                    <CurrencyIcon />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={`${s.infoFooter} mt-10`}>
                <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive" />
                <div className={`${s.priceContainer} mr-10`}>
                    <p className="text text_type_digits-default">{total}</p>
                    <CurrencyIcon />
                </div>
            </div>
        </div>
    )
};