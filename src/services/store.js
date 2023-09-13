import { configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredientsSlice";

export default configureStore({
    reducer: {
        ingredients: ingredientsSlice
    }
});
