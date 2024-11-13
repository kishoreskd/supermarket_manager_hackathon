'use client';
import { useState, useEffect } from 'react';

export default function AiAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Add initial suggestions
    setMessages([
      {
        type: 'assistant',
        content: 'Here are some key insights:',
        suggestions: [
          'Consider restocking Laptops as current stock is below minimum',
          'Smartphone sales are trending up, consider increasing inventory',
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
    else {
      response = "I can help you with inventory management, sales analysis, and coupon strategies. What would you like to know?";
    }

    // Add AI response
    setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">AI Assistant</h3>
      </div>

      {/* Chat messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.type === 'user' 
                ? 'bg-blue-100 ml-8'
                : 'bg-gray-100 mr-8'
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
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about inventory, sales, or coupons..."
            className="flex-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}