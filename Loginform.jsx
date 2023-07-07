import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../api';
import { validateEmail } from '../Validation';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (data) => {
    if (!validateEmail(data.email)) {
      setLoginError('Invalid email address');
      return;
    }

    try {
      const response = await login(data.email, data.password);
      // Handle successful login and redirect to the form page
    } catch (error) {
      setLoginError('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6">Login Page</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" {...register('email', { required: true })} id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" />
            {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" {...register('password', { required: true })} id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
            {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
            <a href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Password?</a>
          </div>
        </form>
        {loginError && <p className="text-red-500 text-xs italic">{loginError}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
