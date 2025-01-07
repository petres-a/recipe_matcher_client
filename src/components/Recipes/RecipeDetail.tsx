import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRecipe, setLoading } from '../../store/recipeDetailSlice';
import { RootState } from '../../store';
import { getRecipe } from '../../services/api';

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const recipe = useSelector((state: RootState) => state.recipe.currentRecipe);
  const loading = useSelector((state: RootState) => state.recipe.loading);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getRecipe(id!);
        dispatch(setCurrentRecipe(data.recipe));
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchRecipe();
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  const ingredients = recipe.ingredients || [];

  return (
    <div>
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
        {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} width="100%"  />}
      </div>
    </div>
  );
};
