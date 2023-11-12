/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./app-header.module.css";
import { Link, NavLink } from "react-router-dom"

export default function AppHeader() {
    return (
        <header className={`${s.header} p-4`}>
            <nav className={s.nav}>
                <ul className={`${s.links}`}>
                    <li className="pr-5 pt-4 pb-4">
                        <NavLink to="/" className={s.link}>
                            {
                                ({ isActive }) => (
                                    <>
                                        <BurgerIcon type={isActive ? "primary" : "secondary"} />
                                        <p className={isActive
                                            ? "pl-2 text text_type_main-small"
                                            : "pl-2 text text_type_main-small text_color_inactive"}
                                        >
                                            Конструктор
                                        </p>
                                    </>
                                )
                            }
                        </NavLink>
                    </li>
                    <li className="pl-5 pr-5 pt-4 pb-4">
                        <NavLink to="/feed" className={s.link}>
                            {
                                ({ isActive }) => (
                                    <>
                                        <ListIcon type={isActive ? "primary" : "secondary"} />
                                        <p className={isActive
                                            ? "pl-2 text text_type_main-small"
                                            : "pl-2 text text_type_main-small text_color_inactive"}
                                        >
                                            Лента заказов
                                        </p>
                                    </>
                                )
                            }
                        </NavLink>
                    </li>
                </ul>
                <Link to="/" className={s.logo}>
                    <Logo />
                </Link>
                <NavLink to={"/profile"} className={`${s.link_type_lk} pl-5 pt-4 pb-4 `}>
                    {
                        ({ isActive }) => (
                            <>
                                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                                <p className={isActive
                                    ? "pl-2 text text_type_main-small"
                                    : "pl-2 text text_type_main-small text_color_inactive"}
                                >
                                    Личный кабинет
                                </p>
                            </>
                        )
                    }
                </NavLink>
            </nav>
        </header>
    )
};