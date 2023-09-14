import { configureStore } from "@reduxjs/toolkit";
import { reducer as ingredientReducer } from "./ingredientsSlice";
import { reducer as constructorReducer } from "./constructorSlice";

export default configureStore({
    reducer: {
        ingredients: ingredientReducer,
        constructor: constructorReducer
    }
});

// export const createStore = (initialState) => {
//     const store = configureStore({
//         reducer: {
//             ingredients: ingredientReducer,
//             constructor: constructorReducer
//         },
//         preloadedState: initialState
//     })
//     return store
// }