import React from "react";
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css";
import PropTypes from 'prop-types';
import { ingredientPropType } from "../../utils/prop-types";
import { ConstructorContext } from "../../services/burgerContext";

export default function BurgerConstructor({ stateModal, setStateModal }) {
    const dataContext = React.useContext(ConstructorContext);

    const bun = dataContext.constructorData.bun;
    const otheringredientsArray = dataContext.constructorData.ingredients;
    const total = otheringredientsArray.reduce((acc, p) => acc + p.price, 0) + ( bun ? bun.price * 2 : 0 );

    const handleOnOrder = () => {
        const orderDataOutput = [bun._id].concat(otheringredientsArray.map(i => i._id));
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            body: JSON.stringify({
                ingredients: orderDataOutput
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
            .then(json => setStateModal({ ...stateModal, isActive: true, type: 'order', details: json }))
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <section className={`${s.wrapper} pt-25`}>
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
            <ul className={`${s.list} ${otheringredientsArray.length > 2 ? s.withScroll : ''} custom-scroll`}>
                {
                    otheringredientsArray &&
                    otheringredientsArray.map(item => (
                        <li key={item._id} className={s.item}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                handleClose={() => {
                                    dataContext.constuctorDataDispatch({ type: 'del', payload: item._id });
                                }}
                            />
                        </li>
                    ))
                }
            </ul>
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
                <Button htmlType="button" type="primary" size="large" onClick={handleOnOrder}>
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType),
    stateModal: PropTypes.object,
    setStateModal: PropTypes.func.isRequired
};