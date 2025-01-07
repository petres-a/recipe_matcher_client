import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, RecipeMatch, PaginationMeta } from '../types';

interface RecipeState {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  matches: RecipeMatch[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
}

const initialState: RecipeState = {
  recipes: [],
  currentRecipe: null,
  matches: [],
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
    setCurrentRecipe: (state, action: PayloadAction<Recipe>) => {
      state.currentRecipe = action.payload;
    },
    setMatches: (state, action: PayloadAction<RecipeMatch[]>) => {
      state.matches = action.payload;
    },
    setPagination: (state, action: PayloadAction<PaginationMeta>) => {
      state.pagination = action.payload;
    },
    clearRecipes: (state) => {
      state.recipes = [];
      state.currentRecipe = null;
      state.matches = [];
      state.pagination = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setRecipes,
  setCurrentRecipe,
  setMatches,
  setPagination,
  clearRecipes,
  setLoading,
  setError
} = recipeSlice.actions;
export default recipeSlice.reducer;
