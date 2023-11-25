import { useDispatch, useSelector } from "react-redux";
import s from "./profile-orders.module.css";
import {
    connect as connectOrders,
    disconnect as disconnectOrders
} from '../../services/profileOrdersSlice';
import { useEffect } from "react";
import OrderCard from "../../components/order-card/order-card";



export default function PorfileOrders() {
    const ORDER_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all';
    const token = localStorage.getItem('accessToken').replace('Bearer ', '');
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.profileOrders);

    useEffect(() => {
        dispatch(connectOrders(`${ORDER_SERVER_URL}?token=${token}`));
        return () => dispatch(disconnectOrders())
    }, []);

    return (
        <div className={`${s.orders} custom-scroll p-2`}>
            {
                orders.map(order => (
                    <OrderCard data={order} key={order._id} />
                ))
            }
        </div>
    )
};