import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../utils/api';
import { TIngredient } from '../types/types';

type TIngredientSlice ={
    ingredients: TIngredient[],
    loading: boolean,
    error: string | null
};

const initialState: TIngredientSlice = {
    ingredients: [],
    loading: false,
    error: null
}

export const loadIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => {
        const response = getIngredients()
        return response;
    }
)

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.fulfilled, (state,action) =>{
                state.loading = false;
                state.ingredients = action.payload.data;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<string>) => {
                    state.loading = true;
                    state.error = action.payload;
                })
    }
});

export default ingredientsSlice.reducer;