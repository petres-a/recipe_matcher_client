import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { getRecipes } from '../../services/api';
import { setRecipes, setLoading, setError, setPagination } from '../../store/recipeSlice';

export const RecipeList: React.FC = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipes, loading, error, pagination } = useSelector((state: RootState) => state.recipes);
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipes) return <div>No recipes found</div>;

  return (
    <div>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
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
        ))}
      </div>
      {pagination && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.prev_page || 1)}
            disabled={!pagination.prev_page}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {pagination.current_page} of {pagination.total_pages}
          </span>
          <button 
            onClick={() => handlePageChange(pagination.next_page || pagination.total_pages)}
            disabled={!pagination.next_page}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
