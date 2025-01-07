import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { matchRecipes } from '../../services/api';
import { setMatches, setLoading, setError } from '../../store/recipeSlice';

export const RecipeSearch: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const dispatch = useDispatch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await matchRecipes(ingredients);
    dispatch(setMatches(response.matched_recipes));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError('Failed to match recipes'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSearch} className="recipe-search">
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (e.g., 2 eggs, 1 cup flour)"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Find Matching Recipes
      </button>
    </form>
  );
};
