import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';

export const MatchedRecipeList: React.FC = () => {
  const { matches, loading, error } = useSelector((state: RootState) => state.recipes);

  if (loading) return <div className="text-center mt-4">Searching recipes...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;
  if (!matches?.length) return <div className="text-center mt-4">No matching recipes found</div>;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Matching Recipes</h2>
      <div className="recipe-grid">
        {matches.map(({ recipe, score, missing_ingredients }) => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-card">
            <div className="recipe-card-content">
              {recipe.image_url && (
                <img src={recipe.image_url} alt={recipe.title} />
              )}
              <div className="recipe-card-info">
                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                <div className="text-sm text-gray-600">
                  <div>Match Score: {(score * 100).toFixed(0)}%</div>
                  <div>Prep Time: {recipe.prep_time} mins</div>
                  <div>Cook Time: {recipe.cook_time} mins</div>
                  <div>Rating: {recipe.ratings}</div>
                </div>
              </div>
              {missing_ingredients.length > 0 && (
                <div className="recipe-card-missing text-sm text-red-600">
                  Missing: {missing_ingredients.join(', ')}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
