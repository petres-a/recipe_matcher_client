import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { logout as logoutAPI } from '../../services/api';
import { logout as logoutAction } from '../../store/authSlice';
import { clearRecipes } from '../../store/recipeSlice';

export const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(logoutAction());
      dispatch(clearRecipes());
      navigate('/login');
    }
  };

  return (
    <nav className="navigation">
      {user ? (
        <>
          <Link to="/recipes">Recipes</Link>
          <Link to="#" onClick={handleLogout} className="logout-link">
            Logout
          </Link>
          <span>Welcome, {user.username}!</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};
