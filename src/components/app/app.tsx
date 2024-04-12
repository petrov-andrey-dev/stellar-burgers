/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Feed from "../../pages/feed/feed";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Login from "../../pages/login/login";
import Main from "../../pages/main/main";
import ProfileInfo from "../../pages/profile-info/profile-info";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import Profile from "../../pages/profile/profile";
import Register from "../../pages/register/register";
import ResetPassword from "../../pages/reset-password/reset-password";
import { loadIngredients } from "../../services/ingredientsSlice";
import { closeModal } from "../../services/modalSlice";
import { checkUserAuth } from "../../services/userSlice";
import { setHeaders } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import OrderInfo from "../order-info/order-info";
import { OnlyAuth, OnlyUnAuth } from "../protected-routes/protected-route";
import s from "./app.module.css";

function App() {
  const modal = useAppSelector(state => state.modal);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    setHeaders();
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
            element={
              modal.isActive &&
              <Modal onClose={handleModalClose}>
                <OrderDetails />
              </Modal>} />
        </Routes>
      )}
    </div>
  );
};

export default App;
