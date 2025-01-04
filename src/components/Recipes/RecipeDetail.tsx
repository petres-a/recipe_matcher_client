import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipe } from '../../services/api';
import { RecipeSearch } from './RecipeSearch';
import { Recipe } from '../../types';

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipe(id!);
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

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
            {recipe.ingredients.map((ingredient, index) => (
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
