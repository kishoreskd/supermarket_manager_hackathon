import { useState } from 'react';
import { validateEmail, validateRole } from '@/utils/validations';

export default function StaffForm() {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const roles = ['MANAGER', 'BILLER', 'SUPERVISOR', 'FACILITY'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate Employee ID
    if (!/^\d{5}$/.test(formData.employeeId)) {
      newErrors.employeeId = 'Employee ID must be 5 digits';
    }

    // Validate Email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format. Must contain @ and end with .com';
    }

    // Validate Phone
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Validate Role
    if (!validateRole(formData.role)) {
      newErrors.role = 'Invalid role selection';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // API call to add/update staff
    const data = {
      PMAI013Operation: {
        ws_stafins_recin: {
          ws_employee_id: formData.employeeId,
          ws_employee_name: formData.name,
          ws_employee_email: formData.email,
          ws_employee_phno: formData.phone,
          ws_role: formData.role
        }
      }
    };

    try {
      const response = await axios.post('http://10.123.79.112:1026/u/home/json/pmai013', data);
      // Handle successful staff addition
    } catch (error) {
      console.error('Staff addition failed:', error);
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
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
      </div>

      {/* Other form fields */}
    </form>
  );
} 