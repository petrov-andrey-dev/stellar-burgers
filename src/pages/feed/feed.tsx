/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import OrderCard from '../../components/order-card/order-card';
import {
    connect as connectFeed,
    disconnect as disconnectFeed
} from '../../services/feedSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import s from './feed.module.css';

const FEED_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all'

export default function Feed() {
    const dispatch = useAppDispatch();
    const { orders, total, totalToday } = useAppSelector(state => state.feed);

    const done = useMemo(() => orders.filter(item => item.status === 'done'), [orders]);
    const inWork = useMemo(() => orders.filter(item => item.status !== 'done'), [orders]);

    useEffect(
        () => {
            dispatch(connectFeed(FEED_SERVER_URL));
            return () => {
                dispatch(disconnectFeed());
            }
        }
        , []);

    return (
        <main className={`${s.main} mt-10`}>
            <div className='mr-15'>
                <h2 className='text text_type_main-large'>Лента заказов</h2>
                <div className={`${s.feed} custom-scroll mt-10 p-2`}>
                    {
                        orders.map(order => (
                            <OrderCard data={order} key={order._id} />
                        ))
                    }
                </div>
            </div>
            <div className={s.stats}>
                <div className={`${s.listContainer} mr-9`}>
                    <h3 className='mp-6 text text_type_main-medium'>Готовы:</h3>
                    <div className={s.list}>
                        {
                            done.map(item => {
                                return <p key={item.number} className={`${s.done} text text_type_digits-default`}>{item.number}</p>
                            })
                        }
                    </div>
                </div>
                <div className={s.listContainer}>
                    <h3 className='mp-6 text text_type_main-medium'>В работе:</h3>
                    <div className={s.list}>
                        {
                            inWork.map(item => {
                                return <p key={item.number} className="text text_type_digits-default">{item.number}</p>
                            })
                        }
                    </div>
                </div>
                <div className={`${s.count} mt-15`}>
                    <h3 className='text text_type_main-medium'>Выполнено за все время</h3>
                    <span className={`${s.digits} text text_type_digits-large`}>{total}</span>
                </div>
                <div className={`${s.count} mt-15`}>
                    <h3 className='text text_type_main-medium'>Выполнено за все время</h3>
                    <span className={`${s.digits} text text_type_digits-large`}>{totalToday}</span>
                </div>
            </div>
        </main>
    )
};