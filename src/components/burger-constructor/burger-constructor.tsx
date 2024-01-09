import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { add, addBun, reset } from "../../services/constructorSlice";
import { openModal } from "../../services/modalSlice";
import { loadOrderData } from "../../services/orderSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import OtherIngredients from '../other-ingredients/other-ingredients';
import s from "./burger-constructor.module.css";
import { TIngredient } from "../../types/types";


export default function BurgerConstructor() {
    const { bun, otheringredientsArray } = useAppSelector(state => state.constructorData);
    const { orderData } = useAppSelector(state => state.order);
    const user = useAppSelector((store) => store.user.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const total = useMemo(() => otheringredientsArray.reduce((acc, p) => acc + p.price, 0) + (bun ? bun.price * 2 : 0), [bun, otheringredientsArray]);

    const handleOnOrder = () => {
        if (user) {
            const orderDataOutput = bun 
                ? [bun._id].concat(otheringredientsArray.map(i => i._id)).concat([bun._id])
                : otheringredientsArray.map(i => i._id)
            dispatch(loadOrderData(orderDataOutput))
            dispatch(openModal(orderData))
            dispatch(reset())
            navigate('/order', { state: { background: location } });

        } else {
            navigate('/login')
        }
    };

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: TIngredient) {
            item.type === 'bun' ? dispatch(addBun(item)) : dispatch(add(item))
        }
    })

    return (
        <section 
        className={`${s.wrapper} pt-25`} 
        ref={dropTarget}
        >
            {
                bun &&
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass="ml-10 mb-4"
                />
            }
            <div className={`${s.list} ${otheringredientsArray.length > 2 ? s.withScroll : ''} custom-scroll`}>
                {
                    otheringredientsArray &&
                    otheringredientsArray.map((item, index) => ( <OtherIngredients key={item.key} item={item} index={index}  />))
                }
            </div>
            {
                bun &&
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass="ml-10 mt-4"
                />
            }
            <div className={`${s.info} pt-10 pr-8`}>
                <div className={`${s.priceWrapper} pr-10`}>
                    <p className="text text_type_digits-medium pr-2">{total}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleOnOrder}
                    disabled={bun ? false : true}
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
};