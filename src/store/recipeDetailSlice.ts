import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types';

interface RecipeDetailState {
  currentRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeDetailState = {
  currentRecipe: null,
  loading: false,
  error: null,
};

const recipeDetailSlice = createSlice({
  name: 'recipeDetail',
  initialState,
  reducers: {
    setCurrentRecipe: (state, action: PayloadAction<Recipe>) => {
      state.currentRecipe = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null;
    },
  },
});

export const {
  setCurrentRecipe,
  setLoading,
  setError,
  clearCurrentRecipe,
} = recipeDetailSlice.actions;
export default recipeDetailSlice.reducer;
