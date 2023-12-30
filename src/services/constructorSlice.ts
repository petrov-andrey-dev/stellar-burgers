import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../types/types';

type TConstructorSlice = {
    bun: TIngredient | null;
    otheringredientsArray: TIngredient[];
}

const initialState: TConstructorSlice = {
    bun: null,
    otheringredientsArray: []
}

const constructorSlice = createSlice({
    name: 'constructorData',
    initialState,
    reducers: {
        add: {
            reducer: (state, action: PayloadAction<TIngredient>) => {
                state.otheringredientsArray.push(action.payload);
            },
            prepare: (otheringredientsArray) => {
                return {payload: {...otheringredientsArray, key: uuidv4()}};
            }
        },
        addBun: {
            reducer: (state, action: PayloadAction<TIngredient>) => {
                state.bun = action.payload;
            },
            prepare: (bun) => {
                return {payload: {...bun, key: uuidv4()}};
            }
        } ,
        del(state, action) {
            state.otheringredientsArray = state.otheringredientsArray.filter(item => item.key !== action.payload);
        },
        moveItem(state, action) {
            state.otheringredientsArray.splice(action.payload.hoverIndex, 0, state.otheringredientsArray.splice(action.payload.dragIndex, 1)[0])
        },
        reset(state) {
            state.bun = null;
            state.otheringredientsArray = [];
        }
    }
});

export default constructorSlice.reducer;
export const { add, addBun, del, moveItem,  reset } = constructorSlice.actions;