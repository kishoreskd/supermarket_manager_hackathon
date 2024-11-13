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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customer Feedback</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </div>

      {/* Customer Satisfaction Report */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Customer Satisfaction Report</h3>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calculateAverages()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="average" fill="#4CAF50" name="Average Rating" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <tr key={feedback.ws_order_id}>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.ws_order_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.ws_customerid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.ws_item_feedback}/5</td>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.ws_service_feedback}/5</td>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.ws_billing_feedback}/5</td>
                <td className="px-6 py-4">{feedback.ws_customer_review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Feedback Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Submit Feedback</h3>
            <form onSubmit={handleSubmitFeedback}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Order ID</label>
                  <input
                    name="order_id"
                    type="text"
                    required
                    pattern="ORD\d{5}"
                    placeholder="ORD00001"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Customer ID</label>
                  <input
                    name="customer_id"
                    type="text"
                    required
                    pattern="C\d{3}"
                    placeholder="C001"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Item Rating (0-5)</label>
                  <input
                    name="item_rating"
                    type="number"
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Service Rating (0-5)</label>
                  <input
                    name="service_rating"
                    type="number"
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Billing Rating (0-5)</label>
                  <input
                    name="billing_rating"
                    type="number"
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Review (max 240 characters)</label>
                  <textarea
                    name="review"
                    maxLength="240"
                    required
                    className="w-full p-2 border rounded"
                    rows="3"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Submit Feedback
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