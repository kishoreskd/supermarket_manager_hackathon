'use client';
import { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    securityQuestion: '',
    answer: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const securityQuestions = [
    "WHAT IS YOUR PET'S NAME",
    "WHAT IS YOUR FAVOURITE MOVIE",
    "WHAT IS YOUR MOTHER'S MAIDEN NAME",
    "WHAT CITY WERE YOU BORN IN"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        PMAI001Operation: {
          ws_log_recin: {
            ws_us_userid: formData.userId,
            ws_us_pswd: formData.password
          }
        }
      };

      // For development, bypass API call and just login
      onLogin();

      /* Uncomment for actual API implementation
      const response = await axios.post('http://10.123.79.112:1026/u/home/json/pmai001', data);
      if (response.data.PMAI001OperationResponse.ws_log_recout.ws_out_status.includes('successful')) {
        onLogin();
      } else {
        setError('Invalid credentials');
      }
      */
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const data = {
        PMAI002Operation: {
          ws_creat_recin: {
            ws_employee_id: formData.userId,
            ws_security_question: formData.securityQuestion,
            ws_answer: formData.answer,
            ws_password: formData.password
          }
        }
      };

      // For development, just show success
      setError('Account created successfully!');
      setTimeout(() => setMode('login'), 1500);

      /* Uncomment for actual API implementation
      const response = await axios.post('http://10.123.79.112:1026/u/home/json/pmai002', data);
      if (response.data.PMAI002OperationResponse.ws_reg_recout.ws_out_status.includes('SUCCESSFUL')) {
        setError('Account created successfully!');
        setTimeout(() => setMode('login'), 1500);
      }
      */
    } catch (error) {
      setError('Failed to create account. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const data = {
        PMAI003Operation: {
          ws_forgot_recin: {
            ws_employee_id: formData.userId,
            ws_security_question: formData.securityQuestion,
            ws_answer: formData.answer,
            ws_password: formData.password
          }
        }
      };

      // For development, just show success
      setError('Password reset successful!');
      setTimeout(() => setMode('login'), 1500);

      /* Uncomment for actual API implementation
      const response = await axios.post('http://10.123.79.112:1026/u/home/json/pmai003', data);
      if (response.data.PMAI003OperationResponse.ws_reg_recout.ws_out_status.includes('successfully')) {
        setError('Password reset successful!');
        setTimeout(() => setMode('login'), 1500);
      }
      */
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block mb-1 text-gray-900">User ID / Phone</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
          minLength={5}
        />
      </div>
      
      <div>
        <label className="block mb-1 text-gray-900">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );

  const renderCreateAccountForm = () => (
    <form onSubmit={handleCreateAccount} className="space-y-4">
      <div>
        <label className="block mb-1 text-gray-900">Employee ID</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
          minLength={5}
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-900">Security Question</label>
        <select
          name="securityQuestion"
          value={formData.securityQuestion}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
        >
          <option value="" className="text-gray-900">Select a security question</option>
          {securityQuestions.map((q, i) => (
            <option key={i} value={q} className="text-gray-900">{q}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-gray-900">Answer</label>
        <input
          type="text"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-900">New Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
          minLength={8}
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-900">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
          minLength={8}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Create Account
      </button>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div>
        <label className="block mb-1 text-gray-900">Employee ID</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
          minLength={5}
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-900">Security Question</label>
        <select
          name="securityQuestion"
          value={formData.securityQuestion}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
        >
          <option value="" className="text-gray-900">Select a security question</option>
          {securityQuestions.map((q, i) => (
            <option key={i} value={q} className="text-gray-900">{q}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-gray-900">Answer</label>
        <input
          type="text"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-900">New Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
          minLength={8}
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-900">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
          required
          minLength={8}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Reset Password
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {mode === 'login' ? 'Login to Supermarket Manager' :
           mode === 'create' ? 'Create Account' : 'Reset Password'}
        </h1>
        
        {error && (
          <div className={`p-3 rounded mb-4 ${
            error.includes('success') 
              ? 'bg-green-100 text-green-900'
              : 'bg-red-100 text-red-900'
          }`}>
            {error}
          </div>
        )}
        
        {mode === 'login' && renderLoginForm()}
        {mode === 'create' && renderCreateAccountForm()}
        {mode === 'forgot' && renderForgotPasswordForm()}
        
        <div className="flex justify-between mt-4">
          {mode === 'login' ? (
            <>
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-blue-600 hover:underline text-gray-900"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => setMode('create')}
                className="text-blue-600 hover:underline text-gray-900"
              >
                Create Account
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-blue-600 hover:underline text-gray-900"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}