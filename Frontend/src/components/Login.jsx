import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast'; // Import toast

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://full-stack-task-management-app-m4rh.onrender.com/api/users/login',
        { username, password }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      setToken(res.data.token);

      toast.success('Login successful! Redirecting...');
      navigate('/menu');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://wallpapers.com/images/hd/food-4k-1vrcb0mw76zcg4qf.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
        <p className="text-center text-sm mt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
