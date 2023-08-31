import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./app-header.module.css";


export default function AppHeader() {
    return (
        <header className={`${s.header} p-4`}>
            <nav>
                <ul className={`${s.links}`}>
                    <li className="pr-5 pt-4 pb-4">
                        <a href="#" className={s.link}>
                            <BurgerIcon type="primary" />
                            <p className="pl-2 text text_type_main-small">Конструктор</p>
                        </a>
                    </li>
                    <li className="pl-5 pr-5 pt-4 pb-4"> 
                        <a href="#" className={s.link}>
                            <ListIcon type="secondary" />
                            <p className="pl-2 text text_type_main-small text_color_inactive">Лента заказов</p>
                        </a>
                    </li>
                </ul>
                <a href="#" className={s.logo}>
                    <Logo />
                </a>
                <a href="#" className={`${s.link_type_lk} pl-5 pt-4 pb-4 `}>
                    <ProfileIcon type="secondary" />
                    <p className="pl-2 text text_type_main-small text_color_inactive">Личный кабинет</p>
                </a>
            </nav>
        </header>

    )
};