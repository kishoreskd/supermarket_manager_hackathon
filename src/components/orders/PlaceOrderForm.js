'use client';
import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { useApi } from '@/hooks/useApi';

export default function PlaceOrderForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    ws_customerid: '',
    ws_item_id: '',
    ws_quantity: '',
    ws_coupon: ''
  });

  const [availableItems, setAvailableItems] = useState([]);
  const { loading: itemsLoading, callApi } = useApi();

  useEffect(() => {
    // Fetch available items for the dropdown
    const fetchItems = async () => {
      try {
        const response = await callApi(api.getInventory);
        const items = response.PMAI006OperationResponse.ws_invent_recout.ws_invent_res;
        setAvailableItems(items);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, [callApi]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If item is selected, check stock and set max quantity
    if (name === 'ws_item_id') {
      const selectedItem = availableItems.find(item => item.ws_item_id === value);
      if (selectedItem) {
        const quantityInput = document.querySelector('input[name="ws_quantity"]');
        if (quantityInput) {
          quantityInput.max = selectedItem.ws_stock;
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.ws_customerid || !formData.ws_item_id || !formData.ws_quantity) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if quantity is available
    const selectedItem = availableItems.find(item => item.ws_item_id === formData.ws_item_id);
    if (selectedItem && parseInt(formData.ws_quantity) > selectedItem.ws_stock) {
      alert(`Only ${selectedItem.ws_stock} items available in stock`);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Place New Order</h2>
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
              Customer ID
            </label>
            <input
              type="text"
              name="ws_customerid"
              value={formData.ws_customerid}
              onChange={handleChange}
              required
              pattern="C[0-9]{3}"
              placeholder="C001"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item
            </label>
            <select
              name="ws_item_id"
              value={formData.ws_item_id}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an item</option>
              {availableItems.map(item => (
                <option key={item.ws_item_id} value={item.ws_item_id}>
                  {item.ws_item_name} - ${item.ws_unit_price} (Stock: {item.ws_stock})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="ws_quantity"
              value={formData.ws_quantity}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Code (Optional)
            </label>
            <input
              type="text"
              name="ws_coupon"
              value={formData.ws_coupon}
              onChange={handleChange}
              pattern="[A-Z0-9]{4}"
              placeholder="Optional"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
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
              disabled={itemsLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}