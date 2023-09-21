/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import s from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import { loadIngredients } from "../../services/ingredientsSlice";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const { ingredients } = useSelector(state => state.ingredients);
  const  modal  = useSelector(state => state.modal);
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  return (
    <div className={`${s.app} p-10`}>
      <AppHeader />
      <main className="pb-10">
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
      {
        modal.isActive &&
        <Modal>
          {modal.type === 'order' && <OrderDetails />}
          {modal.type === 'details' && <IngredientDetails />}
        </Modal>
      }
    </div>
  );
};

export default App;
