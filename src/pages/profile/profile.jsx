import { Outlet, NavLink } from "react-router-dom";
import s from "./profile.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../services/userSlice";

export default function Profile() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout());
    }

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
            <div>
                <Outlet />
            </div>
        </main>
    )
}