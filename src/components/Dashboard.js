'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MessageCircle, X, Home, Users, ShoppingBag, Briefcase, MessageSquare, Settings, ChevronDown, FileText, Mail, Calendar, Star, Upload, Lock } from 'lucide-react';
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
    { 
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home size={18} />
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: <ShoppingBag size={18} />
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <Users size={18} />
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <FileText size={18} />
    },
    {
      id: 'staff',
      label: 'Staff',
      icon: <Users size={18} />
    },
    {
      id: 'coupons',
      label: 'Coupons',
      icon: <Star size={18} />
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: <MessageSquare size={18} />
    }
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

  const renderDashboardContent = () => {
    return (
      <>
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-2">Ecommerce Dashboard</h1>
          <p className="text-sm text-gray-500 mb-6">Here's what's going on with your business right now</p>

          {/* Order Statistics */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
              <div className="bg-green-100 p-2 rounded-lg">
                <div className="text-green-600">↑</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">57 new orders</div>
                <div className="text-xs text-gray-400">Awaiting processing</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <div className="text-yellow-600">!</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">5 orders</div>
                <div className="text-xs text-gray-400">On hold</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
              <div className="bg-red-100 p-2 rounded-lg">
                <div className="text-red-600">×</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">15 products</div>
                <div className="text-xs text-gray-400">Out of stock</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Total Sales Chart */}
            <div className="col-span-2 bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Total sells</h2>
                <select className="border rounded-md px-2 py-1 text-sm">
                  <option>Mar 1, 2022</option>
                </select>
              </div>
              <div style={{ height: "300px" }}>
                <ResponsiveContainer>
                  <LineChart data={sampleData.sales}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Total orders</h3>
                  <span className="text-red-500 text-sm">-6.8%</span>
                </div>
                <div className="text-2xl font-semibold mb-4">16,247</div>
                <div style={{ height: "100px" }}>
                  <ResponsiveContainer>
                    <BarChart data={sampleData.sales}>
                      <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">New customers</h3>
                  <span className="text-green-500 text-sm">+26.5%</span>
                </div>
                <div className="text-2xl font-semibold">356</div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-6">
            <h2 className="font-semibold mb-4">Latest reviews</h2>
            <div className="bg-white rounded-lg">
              <table className="w-full">
                <thead className="text-sm text-gray-500">
                  <tr className="border-b">
                    <th className="text-left p-4">PRODUCT</th>
                    <th className="text-left p-4">CUSTOMER</th>
                    <th className="text-left p-4">RATING</th>
                    <th className="text-left p-4">REVIEW</th>
                    <th className="text-left p-4">STATUS</th>
                    <th className="text-left p-4">TIME</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img src="/product1.jpg" className="w-8 h-8 rounded" />
                        <span>Elite Series Advanced...</span>
                      </div>
                    </td>
                    <td className="p-4">Richard Dawkins</td>
                    <td className="p-4">★★★★★</td>
                    <td className="p-4">This Fitbit is fantastic! I was trying to be in better shape...</td>
                    <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Approved</span></td>
                    <td className="p-4">Just now</td>
                  </tr>
                  {/* Add more review rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderContent = () => {
    switch(currentModule) {
      case 'dashboard':
        return renderDashboardContent();
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

  // Add state for expanded menu sections
  const [expandedSections, setExpandedSections] = useState({
    home: true,
    apps: false,
    pages: false
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Updated Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">Super Market Manager</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 pl-8 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">
              {/* Add your search icon here */}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentModule(item.id)}
              className={`w-full flex items-center gap-2 p-2 mb-1 text-sm rounded-md transition-colors ${
                currentModule === item.id
                  ? 'text-blue-600 bg-blue-50 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
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