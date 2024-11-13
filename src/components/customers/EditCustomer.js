'use client';
import React, { useState, useEffect } from 'react';

export default function EditCustomer({ customer, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    ws_customername: '',
    ws_emailid: '',
    ws_phoneno: ''
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        ws_customername: customer.ws_customername,
        ws_emailid: customer.ws_emailid,
        ws_phoneno: customer.ws_phoneno
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.ws_customername || !formData.ws_emailid || !formData.ws_phoneno) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.ws_emailid)) {
      alert('Please enter a valid email address');
      return;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.ws_phoneno)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    onSubmit({ ...formData, ws_customer_id: customer.ws_customer_id });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Customer</h2>
          <button 
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="ws_customername"
              value={formData.ws_customername}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="ws_emailid"
              value={formData.ws_emailid}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="ws_phoneno"
              value={formData.ws_phoneno}
              onChange={handleChange}
              pattern="[0-9]{10}"
              placeholder="10-digit number"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}