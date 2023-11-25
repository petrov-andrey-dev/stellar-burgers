/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import s from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Main from "../../pages/main/main";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import { closeModal } from "../../services/modalSlice";
import { loadIngredients } from "../../services/ingredientsSlice";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProfileInfo from "../../pages/profile-info/profile-info";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import { checkUserAuth } from "../../services/userSlice";
import { OnlyAuth, OnlyUnAuth } from "../protected-routes/protected-route";
import Feed from "../../pages/feed/feed";
import OrderInfo from "../order-info/order-info";

function App() {
  const modal = useSelector(state => state.modal);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    dispatch(closeModal())
    navigate(-1);
  };

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={`${s.app} p-10`}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
        <Route path="/profile/orders/:number" element={<OrderInfo />} />
        <Route path="/feed/:number" element={<OrderInfo />} />
        <Route path="/" element={<Main />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} >
          <Route path="" element={<ProfileInfo />} />
          <Route path="/profile/orders" element={<ProfileOrders />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              modal.isActive &&
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              modal.isActive &&
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              modal.isActive &&
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/order'
            element={<OnlyAuth component={
              modal.isActive &&
              <Modal onClose={handleModalClose}>
                <OrderDetails />
              </Modal>} />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
