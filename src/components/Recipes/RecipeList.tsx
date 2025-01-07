import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../store';
import { getRecipes } from '../../services/api';
import { setRecipes, setLoading, setError, setPagination } from '../../store/recipeListSlice';

export const RecipeList: React.FC = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, loading, error, pagination } = useSelector(
    (state: RootState) => state.recipes
  );
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

    fetchRecipes();
  }, [dispatch, navigate, token, user, page]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <section>
        <h2 className="text-2xl font-bold mb-4">All Recipes</h2>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-card">
              <div className="recipe-card-content">
                {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} />}
                <div className="recipe-card-info">
                  <h3 className="text-xl font-semibold">{recipe.title}</h3>
                  <div className="text-sm text-gray-600">
                    <div>Prep Time: {recipe.prep_time} mins</div>
                    <div>Cook Time: {recipe.cook_time} mins</div>
                    <div>Rating: {recipe.ratings}</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    <div>{recipe.category}</div>
                    <div>By {recipe.author}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {pagination && (
          <div className="pagination">
            <button
              onClick={() => setPage(pagination.prev_page || 1)}
              disabled={!pagination.prev_page}
            >
              Previous
            </button>
            <span>
              Page {pagination.current_page} of {pagination.total_pages}
            </span>
            <button
              onClick={() => setPage(pagination.next_page || pagination.total_pages)}
              disabled={!pagination.next_page}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
