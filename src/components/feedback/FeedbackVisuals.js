'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function FeedbackVisuals({ feedbacks }) {
  const data = feedbacks.map(feedback => ({
    order: feedback.ws_order_id,
    Item: feedback.ws_item_feedback,
    Service: feedback.ws_service_feedback,
    Billing: feedback.ws_billing_feedback
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Feedback Ratings Comparison</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="order" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Item" fill="#3B82F6" />
            <Bar dataKey="Service" fill="#10B981" />
            <Bar dataKey="Billing" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}