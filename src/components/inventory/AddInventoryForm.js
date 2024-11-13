'use client';
import React, { useState } from 'react';

export default function AddInventoryForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    ws_item_name: '',
    ws_unit_price: '',
    ws_stock: '',
    ws_category: '',
    ws_description: ''
  });

  const categories = [
    'ELECTRONICS',
    'APPLIANCES',
    'GROCERIES',
    'CLOTHING',
    'FURNITURE',
    'BOOKS',
    'TOYS'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      ws_unit_price: parseFloat(formData.ws_unit_price),
      ws_stock: parseInt(formData.ws_stock)
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Item</h2>
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
              Item Name
            </label>
            <input
              type="text"
              name="ws_item_name"
              value={formData.ws_item_name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Price
              </label>
              <input
                type="number"
                name="ws_unit_price"
                value={formData.ws_unit_price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Stock
              </label>
              <input
                type="number"
                name="ws_stock"
                value={formData.ws_stock}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="ws_category"
              value={formData.ws_category}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="ws_description"
              value={formData.ws_description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
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
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}