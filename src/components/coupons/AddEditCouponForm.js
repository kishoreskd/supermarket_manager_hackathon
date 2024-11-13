'use client';
import { useState, useEffect } from 'react';

export default function AddEditCouponForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    ws_start_date: '',
    ws_end_date: '',
    ws_campaigns_name: '',
    ws_coupon_code: '',
    ws_offer_percent: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      ws_offer_percent: parseInt(formData.ws_offer_percent)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {initialData ? 'Edit Coupon' : 'Add New Coupon'}
        </h2>
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
            Campaign Name
          </label>
          <input
            type="text"
            name="ws_campaigns_name"
            value={formData.ws_campaigns_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code
          </label>
          <input
            type="text"
            name="ws_coupon_code"
            value={formData.ws_coupon_code}
            onChange={handleChange}
            required
            pattern="[A-Z0-9]+"
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Percentage
          </label>
          <input
            type="number"
            name="ws_offer_percent"
            value={formData.ws_offer_percent}
            onChange={handleChange}
            required
            min="1"
            max="25"
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="ws_start_date"
              value={formData.ws_start_date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="ws_end_date"
              value={formData.ws_end_date}
              onChange={handleChange}
              required
              min={formData.ws_start_date}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
            {initialData ? 'Update Coupon' : 'Add Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
}