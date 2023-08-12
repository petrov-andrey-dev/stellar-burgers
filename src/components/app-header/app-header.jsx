import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css"


export default function AppHeader() {
    return (
        <header className={`${headerStyles.header} p-4`}>
            <nav>
                <ul className={`${headerStyles.links}`}>
                    <li className="pr-5 pt-4 pb-4">
                        <a href="#" className={headerStyles.link}>
                            <BurgerIcon type="primary" />
                            <p className="pl-2 text text_type_main-small">Конструктор</p>
                        </a>
                    </li>
                    <li className="pl-5 pr-5 pt-4 pb-4"> 
                        <a href="#" className={headerStyles.link}>
                            <ListIcon type="secondary" />
                            <p className="pl-2 text text_type_main-small text_color_inactive">Лента заказов</p>
                        </a>
                    </li>
                </ul>
                <a href="#" className={headerStyles.logo}>
                    <Logo />
                </a>
                <a href="#" className={`${headerStyles.link_type_lk} pl-5 pt-4 pb-4 `}>
                    <ProfileIcon type="secondary" />
                    <p className="pl-2 text text_type_main-small text_color_inactive">Личный кабинет</p>
                </a>
            </nav>
        </header>

    )
}