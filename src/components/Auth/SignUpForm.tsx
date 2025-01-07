import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp, login } from '../../services/api';
import { setUser, setToken, setError } from '../../store/authSlice';
import { RootState } from '../../store';

export const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setError(null));

    try {
      const response = await signUp(email, password, username);
      const user = {
        id: response.data.id,
        email: response.data.email,
        username: response.data.username
      };
      dispatch(setUser(user));
      const loginResponse = await login(email, password);
      dispatch(setToken(loginResponse.status.data.token));
      navigate('/recipes');
    } catch (error: any) {
      dispatch(setError(error.response?.data?.status?.message || 'Signup failed. Please try again.'));
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
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
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
