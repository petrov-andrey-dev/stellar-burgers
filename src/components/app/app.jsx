import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {

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
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => res.json())
      .then(json => setState({ ...state, data: json.data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);


  return (
    <div className={`${styles.app} p-10`}>
      <AppHeader />
      <main className="pb-10">
        {
          state.data.length !== 0 &&
          <>
            <BurgerIngredients data={state.data} stateModal={stateModal} setStateModal={setStateModal} />
            <BurgerConstructor data={state.data} stateModal={stateModal} setStateModal={setStateModal} />

          </>
        }
      </main>
      {
        stateModal.isActive &&
        <Modal onClose={() => setStateModal({ ...stateModal, isActive: false })} >
          {stateModal.type === 'order' && <OrderDetails />};
          {stateModal.type === 'details' && <IngredientDetails details={stateModal.details} />};
        </Modal>
      }

    </div>
  );
};

export default App;
