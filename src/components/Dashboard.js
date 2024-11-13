'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MessageCircle, X } from 'lucide-react';
import InventoryPage from './inventory/InventoryPage.js';
import CustomerPage from './customers/CustomerPage';
import OrdersPage from './orders/OrdersPage';
import StaffPage from './staff/StaffPage';
import CouponsPage from './coupons/CouponsPage';
import FeedbackPage from './feedback/FeedbackPage';

// AI Assistant Chat Component
const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Add initial suggestions
    setMessages([
      {
        type: 'assistant',
        content: 'Here are some key insights:',
        suggestions: [
          'Two promotional coupons have expired, consider launching new campaigns'
        ]
      }
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);

    // Process query and generate response
    let response = '';
    const query = input.toLowerCase();

    if (query.includes('best') && query.includes('product')) {
      response = 'Based on current sales data, Smartphones are the best-selling product with 15% growth. Consider investing more in this category.';
    }
    else if (query.includes('stock') || query.includes('reorder')) {
      response = 'Items below reorder level:\n- Laptops (5 units, minimum: 10)\n- Tablets (3 units, minimum: 8)\nRecommend restocking these items soon.';
    }
    else if (query.includes('coupon') || query.includes('discount')) {
      response = 'Expired coupons:\n- SUMMER2024 (ended: 31-03-2024)\n- SPRING20 (ended: 15-03-2024)\nRecommend creating new promotional campaigns.';
    }
    else if (query.includes('sales') || query.includes('revenue')) {
      response = 'Sales are up 12% this month. Best performing categories:\n1. Electronics\n2. Home Appliances\n3. Fashion';
    }
    else if (query.includes('hi') || query.includes('hello')) {
      response = "Hello! I'm your AI assistant. How can I help you today with inventory management, sales analysis, or coupon strategies?";
    }
    else {
      response = "I can help you with inventory management, sales analysis, and coupon strategies. What would you like to know?";
    }

    // Add AI response
    setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-900 text-white">
        <h3 className="font-semibold">AI Assistant</h3>
        <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.type === 'user' 
                ? 'bg-blue-100 ml-8'
                : 'bg-white mr-8 shadow-sm'
            }`}
          >
            {msg.content}
            {msg.suggestions && (
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-blue-700">
                {msg.suggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about inventory, sales, or coupons..."
            className="flex-1 p-2 border rounded-lg focus:ring-blue-900 focus:border-blue-900"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Dashboard() {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'customers', label: 'Customers' },
    { id: 'orders', label: 'Orders' },
    { id: 'staff', label: 'Staff' },
    { id: 'coupons', label: 'Coupons' },
    { id: 'feedback', label: 'Feedback' }
  ];
  
  // Sample data
  const sampleData = {
    sales: [
      { date: '2024-01', amount: 4000 },
      { date: '2024-02', amount: 3000 },
      { date: '2024-03', amount: 2000 },
      { date: '2024-04', amount: 2780 },
    ],
    bestSellers: [
      { name: 'Product A', value: 400 },
      { name: 'Product B', value: 300 },
      { name: 'Product C', value: 300 },
      { name: 'Product D', value: 200 },
    ]
  };

  const [feedbackData] = useState([
    { type: 'Item Rating', average: 4.2 },
    { type: 'Service Rating', average: 4.5 },
    { type: 'Billing Rating', average: 4.0 }
  ]);

  const refreshDashboard = async () => {
    setLastUpdate(new Date());
  };

  const renderContent = () => {
    switch(currentModule) {
      case 'dashboard':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-900">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </span>
                <button
                  onClick={refreshDashboard}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
                >
                  Refresh Data
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Total Orders</h3>
                <div className="text-3xl font-bold text-blue-900">152</div>
                <div className="text-sm text-gray-900">This month</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Revenue</h3>
                <div className="text-3xl font-bold text-green-600">$45,250</div>
                <div className="text-sm text-gray-900">This month</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Active Customers</h3>
                <div className="text-3xl font-bold text-purple-900">89</div>
                <div className="text-sm text-gray-500">This month</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sales Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Daily Sales</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={sampleData.sales}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#111827" tick={{ fill: '#111827' }} />
                      <YAxis stroke="#111827" tick={{ fill: '#111827' }} />
                      <Tooltip contentStyle={{ background: 'white', border: '1px solid #e0e0e0' }} />
                      <Legend />
                      <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Best Sellers */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Best Selling Products</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={sampleData.bestSellers}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#2563eb"
                        label
                      />
                      <Tooltip contentStyle={{ background: 'white', border: '1px solid #e0e0e0' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Customer Satisfaction Report */}
              <div className="bg-white p-6 rounded-xl shadow-sm md:col-span-3">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Customer Satisfaction Report</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={feedbackData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="type" stroke="#666" />
                      <YAxis domain={[0, 5]} stroke="#666" />
                      <Tooltip contentStyle={{ background: 'white', border: '1px solid #e0e0e0' }} />
                      <Legend />
                      <Bar dataKey="average" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        );
      case 'inventory':
        return <InventoryPage />;
      case 'customers':
        return <CustomerPage />;
      case 'orders':
        return <OrdersPage />;
      case 'staff':
        return <StaffPage />;
      case 'coupons':
        return <CouponsPage />;
      case 'feedback':
        return <FeedbackPage />;
      default:
        return <h2 className="text-2xl font-bold mb-6 text-gray-900">{currentModule.charAt(0).toUpperCase() + currentModule.slice(1)}</h2>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold mb-8 text-gray-900">Supermarket</h1>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentModule(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentModule === item.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 overflow-auto">
        {renderContent()}
      </div>
      
      {/* Message Circle Button & Chat Window */}
      <div className="fixed bottom-4 right-4">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      </div>
    </div>
  );
}