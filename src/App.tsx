import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Navigation } from './components/Layout/Navigation';
import { RecipeSearch } from './components/Recipes/RecipeSearch';
import { LoginForm } from './components/Auth/LoginForm';
import { SignUpForm } from './components/Auth/SignUpForm';
import { AllRecipeList } from './components/Recipes/AllRecipeList';
import { RecipeDetail } from './components/Recipes/RecipeDetail';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navigation />
          <main>
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <RecipeSearch />
              </div>
            </div>
            <Routes>
              <Route path="/" element={<Navigate to="/recipes" replace />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/recipes" element={<AllRecipeList />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

