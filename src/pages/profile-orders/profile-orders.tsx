/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import OrderCard from "../../components/order-card/order-card";
import {
    connect as connectOrders,
    disconnect as disconnectOrders
} from '../../services/profileOrdersSlice';
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import s from "./profile-orders.module.css";



export default function PorfileOrders() {
    const ORDER_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all';
    const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
    const ORDER_SERVER_URL_WITH_TOKEN = `${ORDER_SERVER_URL}?token=${token}`;
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(state => state.profileOrders);

    useEffect(
        () => {
            dispatch(connectOrders(ORDER_SERVER_URL_WITH_TOKEN));
            return () => {
                dispatch(disconnectOrders());
            }
        }
        , []);

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