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
import { DataContext, ConstructorContext } from "../../services/burgerContext";
import { getIngredients } from "../../utils/api";

function App() {

  const constructorInitialData = {
    bun: null,
    ingredients: []
  };
  const [constructorData, constuctorDataDispatch] = React.useReducer(constructorDataReducer, constructorInitialData, undefined);

  function constructorDataReducer(constructorData, action) {
    switch (action.type) {
      case 'add':
        return {
          ...constructorData,
          ingredients: [
            ...constructorData.ingredients,
            action.payload
          ]
        };
      case 'addBun':
        return {
          ...constructorData,
          bun: action.payload
        }
      case 'del':
        return {
          ...constructorData,
          ingredients: constructorData.ingredients.filter(item => item._id !== action.payload)
            
        }
    }
  };

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [stateModal, setStateModal] = React.useState({
    isActive: false,
    type: '',
    details: {}
  });

  React.useEffect(() => {
    setState({ ...state, hasError: false, isLoading: true });
    getIngredients()
      .then(json => setState({ ...state, data: json.data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
        console.log(e);
      });
  }, []);


  return (
    <div className={`${s.app} p-10`}>
      <DataContext.Provider value={{ state, setState }}>
        <ConstructorContext.Provider value={{ constructorData, constuctorDataDispatch }}>
          <AppHeader />
          <main className="pb-10">
            {
              state.data.length !== 0 &&
              <>
                <BurgerIngredients stateModal={stateModal} setStateModal={setStateModal} />
                <BurgerConstructor stateModal={stateModal} setStateModal={setStateModal} />
              </>
            }
          </main>
          {
            stateModal.isActive &&
            <Modal onClose={() => setStateModal({ ...stateModal, isActive: false })} >
              {stateModal.type === 'order' && <OrderDetails details={stateModal.details}/>}
              {stateModal.type === 'details' && <IngredientDetails details={stateModal.details} />}
            </Modal>
          }
        </ConstructorContext.Provider>
      </DataContext.Provider>
    </div>
  );
};

export default App;
