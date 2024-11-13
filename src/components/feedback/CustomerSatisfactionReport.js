'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CustomerSatisfactionReport({ data }) {
  const ratings = [
    { type: 'Item Rating', average: data.reduce((acc, item) => acc + item.ws_item_feedback, 0) / data.length },
    { type: 'Service Rating', average: data.reduce((acc, item) => acc + item.ws_service_feedback, 0) / data.length },
    { type: 'Billing Rating', average: data.reduce((acc, item) => acc + item.ws_billing_feedback, 0) / data.length }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Customer Satisfaction Report</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={ratings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="average" fill="#4CAF50" name="Average Rating" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}