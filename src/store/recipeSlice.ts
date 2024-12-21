import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, PaginationMeta } from '../types';

interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
}

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
  pagination: null
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    setPagination: (state, action: PayloadAction<PaginationMeta>) => {
      state.pagination = action.payload;
    },
    clearRecipes: (state) => {
      state.recipes = [];
      state.pagination = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRecipes, setPagination, clearRecipes, setLoading, setError } = recipeSlice.actions;
export default recipeSlice.reducer;
