import { useState } from 'react';
import { validatePassword, SECURITY_QUESTIONS } from '@/utils/validations';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    employeeId: '',
    securityQuestion: '',
    answer: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate employee ID
    if (!/^\d{5}$/.test(formData.employeeId)) {
      newErrors.employeeId = 'Employee ID must be 5 digits';
    }

    // Validate security question
    if (!formData.securityQuestion) {
      newErrors.securityQuestion = 'Please select a security question';
    }

    // Validate answer
    if (!formData.answer.trim()) {
      newErrors.answer = 'Answer is required';
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with letters and numbers';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed with registration API call
    const data = {
      PMAI002Operation: {
        ws_creat_recin: {
          ws_employee_id: formData.employeeId,
          ws_security_question: formData.securityQuestion,
          ws_answer: formData.answer,
          ws_password: formData.password
        }
      }
    };

    try {
      const response = await axios.post('http://10.123.79.112:1026/u/home/json/pmai002', data);
      // Handle successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Employee ID</label>
        <input
          type="text"
          value={formData.employeeId}
          onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Security Question</label>
        <select
          value={formData.securityQuestion}
          onChange={(e) => setFormData({ ...formData, securityQuestion: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select a question</option>
          {SECURITY_QUESTIONS.map((question, index) => (
            <option key={index} value={question}>{question}</option>
          ))}
        </select>
        {errors.securityQuestion && <p className="text-red-500 text-sm mt-1">{errors.securityQuestion}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Answer</label>
        <input
          type="text"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.answer && <p className="text-red-500 text-sm mt-1">{errors.answer}</p>}
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
        Create Account
      </button>
    </form>
  );
} 