import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import PropTypes from 'prop-types';
import { ingredientPropType } from "../../utils/prop-types";

export default function BurgerConstructor({data}) {
    const total = data.reduce((acc, p) => acc + p.price, 0);
    const bunsArray = data.filter(item => item.type === 'bun');
    const otheringredientsArray = data.filter(item => item.type === 'main' || item.type === 'sauce');

    return (
        <section className="pt-25">
            <ul className="custom-scroll pr-1">
                <li className="pl-6" key={bunsArray[0]._id}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bunsArray[0].name} (верх)`}
                        price={bunsArray[0].price}
                        thumbnail={bunsArray[0].image}
                        
                    />
                </li>
                {
                    otheringredientsArray.map(item => (
                        <li key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                isLocked={true}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                
                            />
                        </li>
                    ))
                }
                <li className="pl-6" key={bunsArray[1]._id}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunsArray[1].name} (низ)`}
                        price={bunsArray[1].price}
                        thumbnail={bunsArray[1].image}
                        
                    />
                </li>
            </ul>
            <div className={`${constructorStyles.info} pt-10 pr-4`}>
                <div className={`${constructorStyles.priceWrapper} pr-10`}>
                    <p className="text text_type_digits-medium pr-2">{total}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired
};