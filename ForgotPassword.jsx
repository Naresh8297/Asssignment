import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = (data) => {
    // Implement your reset password logic here
    // Send a request to the backend API to handle the password reset
    // You can use your preferred method for making API requests (e.g., axios, fetch)

    // Simulating a successful reset for demonstration purposes
    setResetSuccess(true);
    setResetEmail(data.email);
  };

  return (
    <div>
      <h1>Forgot Password Page</h1>
      {resetSuccess ? (
        <div>
          <p>An email with instructions to reset your password has been sent to {resetEmail}.</p>
          {/* Display additional instructions or UI elements */}
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
            />
            {errors.email && <p>Email is required</p>}
          </div>
          <button type="submit">Reset Password</button>
          {resetError && <p>{resetError}</p>}
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;

