import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import recipeDetailReducer from './recipeDetailSlice';
import recipeListReducer from './recipeListSlice';
import matchedRecipeListReducer from './matchedRecipeListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeDetailReducer,
    matchedRecipes: matchedRecipeListReducer,
    recipes: recipeListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
