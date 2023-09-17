import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../utils/api';

export const loadIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async (thunkAPI) => {
        try {
            const response = getIngredients()
            return response
        } catch (error) {
            thunkAPI.rejectWithValie(error.message)
        }
    }
)

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        ingredients: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loadIngredients.fulfilled, (state,action) =>{
                state.loading = false;
                state.ingredients = action.payload.data;
            })
    }
});

export default ingredientsSlice.reducer;