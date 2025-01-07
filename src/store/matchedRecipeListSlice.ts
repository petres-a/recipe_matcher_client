import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeMatch, PaginationMeta } from '../types';

interface MatchedRecipeListState {
  matches: RecipeMatch[];
  matchesPagination: PaginationMeta | null;
  ingredients: string;
  loading: boolean;
  error: string | null;
}

const initialState: MatchedRecipeListState = {
  matches: [],
  matchesPagination: null,
  ingredients: '',
  loading: false,
  error: null,
};

const matchedRecipeListSlice = createSlice({
  name: 'matchedRecipeList',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<RecipeMatch[]>) => {
      state.matches = action.payload;
    },
    setMatchesPagination: (state, action: PayloadAction<PaginationMeta>) => {
      state.matchesPagination = action.payload;
    },
    setIngredients: (state, action: PayloadAction<string>) => {
      state.ingredients = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearMatches: (state) => {
      state.matches = [];
      state.matchesPagination = null;
      state.ingredients = '';
    },
  },
});

export const {
  setMatches,
  setMatchesPagination,
  setIngredients,
  setLoading,
  setError,
  clearMatches,
} = matchedRecipeListSlice.actions;
export default matchedRecipeListSlice.reducer;

