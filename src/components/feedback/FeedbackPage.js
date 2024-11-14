'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FeedbackPage() {
  const [showForm, setShowForm] = useState(false);
  const [feedbacks, setFeedbacks] = useState([
    {
      ws_order_id: "ORD00001",
      ws_customerid: "C001",
      ws_item_feedback: 4.5,
      ws_service_feedback: 4.3,
      ws_billing_feedback: 4.1,
      ws_customer_review: "THIS PRODUCT IS GOOD AT THIS PRICE"
    },
    {
      ws_order_id: "ORD00002",
      ws_customerid: "C002",
      ws_item_feedback: 4.8,
      ws_service_feedback: 4.5,
      ws_billing_feedback: 4.7,
      ws_customer_review: "EXCELLENT SERVICE AND QUALITY"
    }
  ]);

  const calculateAverages = () => {
    const sum = feedbacks.reduce((acc, fb) => ({
      item: acc.item + fb.ws_item_feedback,
      service: acc.service + fb.ws_service_feedback,
      billing: acc.billing + fb.ws_billing_feedback
    }), { item: 0, service: 0, billing: 0 });

    const count = feedbacks.length;
    return [
      { name: 'Item Rating', average: (sum.item / count).toFixed(1) },
      { name: 'Service Rating', average: (sum.service / count).toFixed(1) },
      { name: 'Billing Rating', average: (sum.billing / count).toFixed(1) }
    ];
  };

  const handleSubmitFeedback = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newFeedback = {
      ws_order_id: formData.get('order_id'),
      ws_customerid: formData.get('customer_id'),
      ws_item_feedback: parseFloat(formData.get('item_rating')),
      ws_service_feedback: parseFloat(formData.get('service_rating')),
      ws_billing_feedback: parseFloat(formData.get('billing_rating')),
      ws_customer_review: formData.get('review').toUpperCase()
    };

    setFeedbacks([...feedbacks, newFeedback]);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">Customer Feedback</h1>
      <p className="text-sm text-gray-500 mb-6">Monitor and analyze customer satisfaction</p>

      {/* Feedback Statistics */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-green-100 p-2 rounded-lg">
            <div className="text-green-600">★</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">4.5 average</div>
            <div className="text-xs text-gray-400">Overall rating</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-blue-100 p-2 rounded-lg">
            <div className="text-blue-600">↑</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">127 reviews</div>
            <div className="text-xs text-gray-400">This month</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <div className="text-yellow-600">!</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">12 pending</div>
            <div className="text-xs text-gray-400">Awaiting response</div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-64 px-3 py-2 pl-8 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">
              {/* Add search icon here */}
            </span>
          </div>
          <select className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300">
            <option>All ratings</option>
            <option>5 stars</option>
            <option>4 stars</option>
            <option>3 stars</option>
            <option>2 stars</option>
            <option>1 star</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </div>
      </div>

      {/* Customer Satisfaction Report */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-sm font-medium mb-4">Customer Satisfaction Report</h3>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calculateAverages()}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="average" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Billing Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <tr key={feedback.ws_order_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{feedback.ws_order_id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{feedback.ws_customerid}</td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {'★'.repeat(Math.floor(feedback.ws_item_feedback))}
                    <span className="text-gray-300">{'★'.repeat(5 - Math.floor(feedback.ws_item_feedback))}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {'★'.repeat(Math.floor(feedback.ws_service_feedback))}
                    <span className="text-gray-300">{'★'.repeat(5 - Math.floor(feedback.ws_service_feedback))}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {'★'.repeat(Math.floor(feedback.ws_billing_feedback))}
                    <span className="text-gray-300">{'★'.repeat(5 - Math.floor(feedback.ws_billing_feedback))}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{feedback.ws_customer_review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Feedback Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Submit Feedback</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitFeedback}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <input
                    name="order_id"
                    type="text"
                    required
                    pattern="ORD\d{5}"
                    placeholder="ORD00001"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
                  <input
                    name="customer_id"
                    type="text"
                    required
                    pattern="C\d{3}"
                    placeholder="C001"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Rating (0-5)</label>
                  <input
                    name="item_rating"
                    type="number"
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Rating (0-5)</label>
                  <input
                    name="service_rating"
                    type="number"
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Billing Rating (0-5)</label>
                  <input
                    name="billing_rating"
                    type="number"
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review (max 240 characters)</label>
                  <textarea
                    name="review"
                    maxLength="240"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows="3"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}