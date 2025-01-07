import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { setIngredients } from '../../store/matchedRecipeListSlice';

export const RecipeSearch: React.FC = () => {
  const [localIngredients, setLocalIngredients] = useState('');
  const { token, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalIngredients(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setIngredients(localIngredients));
    
    if (localIngredients.trim()) {
      navigate('/recipes');
    }
  };

  if (!token || !user) return null;

  return (
    <form onSubmit={handleSubmit} className="recipe-search">
      <input
        type="text"
        value={localIngredients}
        onChange={handleChange}
        placeholder="Enter ingredients (e.g., 2 eggs, flour, 1 cup sugar)"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Find Matching Recipes
      </button>
    </form>
  );
};
