import { createSlice } from '@reduxjs/toolkit';

const constructorSlice = createSlice({
    name: 'constructor',
    initialState: {
        bun: null,
        otheringredientsArray: []
    },
    reducers: {
        add(state, action) {
            state.otheringredientsArray.push(action.payload);
        },
        addBun(state, action) {
            state.bun = action.payload;
        },
        del(state, action) {
            state.otheringredientsArray = state.otheringredientsArray.filter(item => item._id !== action.payload);
        },
        reset(state) {
            state = {
                bun: null,
                otheringredientsArray: []
            };
        }
    }
});

export const reducer = constructorSlice.reducer;
export const { add, addBun, del, reset } = constructorSlice.actions;