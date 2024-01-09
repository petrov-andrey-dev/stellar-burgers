import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../../services/userSlice";
import { useAppDispatch } from "../../utils/hook";
import s from "./profile.module.css";

export default function Profile() {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <main className={s.main}>
            <nav className={s.nav}>
                <NavLink to={"/profile"} className={s.link}>
                {({ isActive }) => (
                    <p className={isActive ? "text text_type_main-medium" : "text text_type_main-medium text_color_inactive"}>
                        Профиль
                      </p>
                    )}
                </NavLink>
                <NavLink to={"/profile/orders"} className={s.link}>
                {({ isActive }) => (
                    <p className={isActive ? "text text_type_main-medium" : "text text_type_main-medium text_color_inactive"}>
                        История заказов
                      </p>
                    )}
                </NavLink>
                <NavLink to={"/login"} onClick={handleLogout} className={s.link}>
                {({ isActive }) => (
                      <p className={isActive ? "text text_type_main-medium" : "text text_type_main-medium text_color_inactive"}>
                        Выход
                      </p>
                    )}
                </NavLink>
            </nav>
            <div className={s.content}>
                <Outlet />
            </div>
        </main>
    )
};