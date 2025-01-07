import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../store';
import { getRecipes } from '../../services/api';
import { setRecipes, setLoading, setError, setPagination } from '../../store/recipeSlice';
import { RecipeSearch } from './RecipeSearch';
import { MatchedRecipeList } from './MatchedRecipeList';

export const RecipeList: React.FC = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipes, matches, loading, error, pagination } = useSelector((state: RootState) => state.recipes);
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    const fetchRecipes = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getRecipes(page);
        dispatch(setRecipes(response.recipes));
        dispatch(setPagination(response.meta));
        dispatch(setError(null));
      } catch (error) {
        dispatch(setError('Failed to fetch recipes'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!matches?.length) {
      fetchRecipes();
    }
  }, [dispatch, navigate, token, user, page, matches]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <RecipeSearch />
      </div>

      {matches?.length > 0 ? (
        <MatchedRecipeList />
      ) : (
        <>
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-card">
                <div>
                  {recipe.image_url && (
                    <img src={recipe.image_url} alt={recipe.title} className="w-full h-48 object-cover rounded" />
                  )}
                  <h3 className="text-xl font-semibold mt-2">{recipe.title}</h3>
                  <div className="recipe-info">
                    <p>Prep Time: {recipe.prep_time} mins</p>
                    <p>Cook Time: {recipe.cook_time} mins</p>
                    <p>Rating: {recipe.ratings}</p>
                  </div>
                  <div className="recipe-meta">
                    <span>{recipe.category}</span>
                    <span>By {recipe.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {pagination && (
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => setPage(pagination.prev_page || 1)}
                disabled={!pagination.prev_page}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {pagination.current_page} of {pagination.total_pages}
              </span>
              <button
                onClick={() => setPage(pagination.next_page || pagination.total_pages)}
                disabled={!pagination.next_page}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
