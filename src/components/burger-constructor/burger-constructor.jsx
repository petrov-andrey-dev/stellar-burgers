import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import PropTypes from 'prop-types';
import { ingredientPropType } from "../../utils/prop-types";

export default function BurgerConstructor({ data, stateModal, setStateModal }) {
    const bunsArray = data.filter(item => item.type === 'bun');
    const firstBun = bunsArray[0];
    const otheringredientsArray = data.filter(item => item.type === 'main' || item.type === 'sauce');
    const total = otheringredientsArray.reduce((acc, p) => acc + p.price, 0) + firstBun.price * 2;

    return (
        <section className="pt-25">
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${firstBun.name} (верх)`}
                price={firstBun.price}
                thumbnail={firstBun.image}
                extraClass="ml-10 mb-4"
            />
            <ul className={`${constructorStyles.list} custom-scroll`}>
                {
                    otheringredientsArray.map(item => (
                        <li key={item._id} className={constructorStyles.item}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    ))
                }
            </ul>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${firstBun.name} (низ)`}
                price={firstBun.price}
                thumbnail={firstBun.image}
                extraClass="ml-10 mt-4"
            />
            <div className={`${constructorStyles.info} pt-10 pr-8`}>
                <div className={`${constructorStyles.priceWrapper} pr-10`}>
                    <p className="text text_type_digits-medium pr-2">{total}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => setStateModal({ ...stateModal, isActive: true, type: 'order' })}>
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired,
    stateModal: PropTypes.object,
    setStateModal: PropTypes.func.isRequired
};