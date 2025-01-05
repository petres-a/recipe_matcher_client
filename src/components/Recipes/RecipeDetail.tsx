import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRecipe, setLoading } from '../../store/recipeSlice';  // Import actions from recipeSlice
import { RootState } from '../../store';  // Adjust according to your store setup
import { getRecipe } from '../../services/api';
import { RecipeSearch } from './RecipeSearch';

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const recipe = useSelector((state: RootState) => state.recipes.currentRecipe);  // Get currentRecipe from Redux store
  const loading = useSelector((state: RootState) => state.recipes.loading);  // Get loading state from Redux store

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        dispatch(setLoading(true));  // Dispatch loading state to true
        const data = await getRecipe(id!);
        dispatch(setCurrentRecipe(data.recipe));  // Dispatch the fetched recipe to Redux
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      } finally {
        dispatch(setLoading(false));  // Dispatch loading state to false once done
      }
    };

    fetchRecipe();
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  const ingredients = recipe.ingredients || [];

  return (
    <div>
      <RecipeSearch />
      <div className="recipe-detail">
        <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
        <div className="meta mb-4">
          <p>By {recipe.author}</p>
          <p>Prep time: {recipe.prep_time} minutes</p>
          <p>Cook time: {recipe.cook_time} minutes</p>
          <p>Rating: {recipe.ratings}</p>
        </div>
        <div className="ingredients mb-4">
          <h2 className="text-xl font-bold mb-2">Ingredients</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        {recipe.instructions && (
          <div className="instructions">
            <h2 className="text-xl font-bold mb-2">Instructions</h2>
            <p>{recipe.instructions}</p>
          </div>
        )}
      </div>
    </div>
  );
};
