import { useState } from 'react';
import { validatePassword } from '@/utils/validations';
import axios from 'axios';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate userId
    if (!/^\d{5}$/.test(formData.userId) && !/^\d{10}$/.test(formData.userId)) {
      newErrors.userId = 'User ID must be 5 digits or phone number must be 10 digits';
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with letters and numbers';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed with login API call
    const data = {
      PMAI001Operation: {
        ws_log_recin: {
          ws_us_userid: formData.userId,
          ws_us_pswd: formData.password
        }
      }
    };

    try {
      const response = await axios.post('http://10.123.79.112:1026/u/home/json/pmai001', data);
      // Handle successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">User ID / Phone</label>
        <input
          type="text"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
} 