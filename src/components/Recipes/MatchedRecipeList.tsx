import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { setMatches, setMatchesPagination, setLoading, setError } from '../../store/matchedRecipeListSlice';
import { matchRecipes } from '../../services/api';
import ImageWithFallback from '../Common/ImageWithFallback';

export const MatchedRecipeList: React.FC = () => {
  const { matches, matchesPagination, loading, error, ingredients } = useSelector((state: RootState) => state.matchedRecipes);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(matchesPagination?.current_page || 1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!ingredients) {
      dispatch(setMatches([]));
      dispatch(setMatchesPagination({
        current_page: 1,
        total_pages: 1,
        next_page: null,
        prev_page: null,
        total_count: 0
      }));
    } else {
      const fetchMatches = async () => {
        try {
          dispatch(setLoading(true));
          const response = await matchRecipes(ingredients, currentPage, itemsPerPage);
          dispatch(setMatches(response.matched_recipes));
          dispatch(setMatchesPagination(response.meta));
          dispatch(setError(null));
        } catch (error) {
          dispatch(setError('Failed to fetch matching recipes'));
        } finally {
          dispatch(setLoading(false));
        }
      };

      fetchMatches();
    }
  }, [dispatch, currentPage, ingredients]);

  if (loading) return <div className="text-center mt-4">Searching recipes...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;
  if (!ingredients.length) return null;
  if (ingredients.length && !matches?.length) return <div className="text-center mt-4">No matching recipes found</div>;

  const handlePagination = (page: number) => {
    if (page < 1 || page > (matchesPagination?.total_pages || 1)) return;
    setCurrentPage(page);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Matching Recipes</h2>
      <div className="recipe-grid">
        {matches.map(({ recipe, score, missing_ingredients }) => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-card">
            <div className="recipe-card-content">
              <ImageWithFallback
                src={recipe.image_url || ''}
                alt={recipe.title}
              />
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

      <div className="pagination">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {matchesPagination?.total_pages}
        </span>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === matchesPagination?.total_pages}
        >
          Next
        </button>
      </div>
    </section>
  );
};
