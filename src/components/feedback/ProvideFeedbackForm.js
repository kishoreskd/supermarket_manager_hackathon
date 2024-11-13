'use client';
import { useState } from 'react';

export default function ProvideFeedbackForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    ws_order_id: '',
    ws_customerid: '',
    ws_item_id: '',
    ws_item_feedback: 5,
    ws_service_feedback: 5,
    ws_billing_feedback: 5,
    ws_customer_review: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      ws_item_feedback: parseFloat(formData.ws_item_feedback),
      ws_service_feedback: parseFloat(formData.ws_service_feedback),
      ws_billing_feedback: parseFloat(formData.ws_billing_feedback)
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
        <h2 className="text-2xl font-bold">Provide Feedback</h2>
        <button 
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order ID
            </label>
            <input
              type="text"
              name="ws_order_id"
              value={formData.ws_order_id}
              onChange={handleChange}
              required
              pattern="ORD[0-9]{5}"
              placeholder="ORD00001"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item ID
          </label>
          <input
            type="text"
            name="ws_item_id"
            value={formData.ws_item_id}
            onChange={handleChange}
            required
            pattern="I[0-9]{3}"
            placeholder="I001"
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Rating
            </label>
            <input
              type="number"
              name="ws_item_feedback"
              value={formData.ws_item_feedback}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.1"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Rating
            </label>
            <input
              type="number"
              name="ws_service_feedback"
              value={formData.ws_service_feedback}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.1"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Billing Rating
            </label>
            <input
              type="number"
              name="ws_billing_feedback"
              value={formData.ws_billing_feedback}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.1"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review
          </label>
          <textarea
            name="ws_customer_review"
            value={formData.ws_customer_review}
            onChange={handleChange}
            maxLength={240}
            rows={3}
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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}