import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { useAppSelector } from "../../utils/hook";
import s from "./main.module.css";

export default function Main() {
    const { ingredients } = useAppSelector(state => state.ingredients);

    return (
        <main className={`${s.main} pb-10`}>
            <DndProvider backend={HTML5Backend}>
                {
                    ingredients.length !== 0 &&
                    <>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </>
                }
            </DndProvider>
        </main>
    )
}