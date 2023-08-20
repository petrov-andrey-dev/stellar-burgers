import done from '../../images/done.svg';
import orderDetailsStyles from './order-details.module.css';

export default function OrderDetails() {

    return (
        <>
            <h2 className='text text_type_digits-large mt-20'>034536</h2>
            <h1 className="text text_type_main-medium mt-8">идентификатор заказа</h1>
            <img className={`${orderDetailsStyles.img} mt-15`} src={done} alt="done" />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-20">Дождитесь готовности на орбитальной станции</p>
        </>
    )
};