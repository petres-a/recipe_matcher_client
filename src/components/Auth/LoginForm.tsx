import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { setUser, setToken, setError } from '../../store/authSlice';
import { RootState } from '../../store';

export const LoginForm: React.FC = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const error = useSelector((state: RootState) => state.auth.error);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  dispatch(setError(null));

  try {
    const response = await login(email, password);
    const token = response.status.data.token;
    const user = response.status.data.user;

    localStorage.setItem('token', token);  // This was missing
    dispatch(setUser(user));
    dispatch(setToken(token));
    navigate('/recipes');
  } catch (error: any) {
    const message = error.response?.data?.status?.message || 'Login failed. Please try again.';
    dispatch(setError(message));
  }
};

 return (
   <div className="auth-form">
     <h2>Login</h2>
     {error && <div className="error-message">{error}</div>}
     <form onSubmit={handleSubmit}>
       <input
         type="email"
         placeholder="Email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
       />
       <input
         type="password"
         placeholder="Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       />
       <button type="submit">Login</button>
     </form>
   </div>
 );
};
