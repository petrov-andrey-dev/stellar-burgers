import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice";
import modalSlice from "./modalSlice";
import constructorSlice from "./constructorSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        constructorData: constructorSlice,
        modal: modalSlice,
        order: orderSlice,
        user: userSlice
    }
});