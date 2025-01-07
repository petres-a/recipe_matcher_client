import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, PaginationMeta } from '../types';

interface RecipeListState {
  recipes: Recipe[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeListState = {
  recipes: [],
  pagination: null,
  loading: false,
  error: null,
};

const recipeListSlice = createSlice({
  name: 'recipeList',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    setPagination: (state, action: PayloadAction<PaginationMeta>) => {
      state.pagination = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearRecipes: (state) => {
      state.recipes = [];
      state.pagination = null;
    },
  },
});

export const {
  setRecipes,
  setPagination,
  setLoading,
  setError,
  clearRecipes,
} = recipeListSlice.actions;
export default recipeListSlice.reducer;
