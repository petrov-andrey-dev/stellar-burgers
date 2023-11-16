import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css";
import { useSelector, useDispatch } from "react-redux";
import { reset, addBun, add } from "../../services/constructorSlice";
import { openModal } from "../../services/modalSlice";
import { loadOrderData } from "../../services/orderSlice";
import { useDrop} from "react-dnd";
import OtherIngredients from '../other-ingredients/other-ingredients';
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom"


export default function BurgerConstructor() {
    const { bun, otheringredientsArray } = useSelector(state => state.constructorData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const total = useMemo(() => otheringredientsArray.reduce((acc, p) => acc + p.price, 0) + (bun ? bun.price * 2 : 0), [bun, otheringredientsArray]);

    const handleOnOrder = () => {
        const orderDataOutput = [bun._id].concat(otheringredientsArray.map(i => i._id));
        dispatch(loadOrderData(orderDataOutput))
        dispatch(openModal())
        dispatch(reset())
        navigate('/order', { state: { background: location }} );
    };

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
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