'use client';
import { useState } from 'react';

export default function CustomerPage() {
  const [customerId, setCustomerId] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [customers] = useState([
    { 
      ws_customer_id: 'C001',
      ws_customername: 'John Doe',
      ws_emailid: 'john@example.com',
      ws_phoneno: '9876541230'
    },
    {
      ws_customer_id: 'C002',
      ws_customername: 'Jane Smith',
      ws_emailid: 'jane@example.com',
      ws_phoneno: '9988776655'
    }
  ]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">Customer Management</h1>
      <p className="text-sm text-gray-500 mb-6">Manage your customer relationships</p>

      {/* Customer Statistics */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-blue-100 p-2 rounded-lg">
            <div className="text-blue-600">↑</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">1,234 total</div>
            <div className="text-xs text-gray-400">Active customers</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-green-100 p-2 rounded-lg">
            <div className="text-green-600">+</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">56 new</div>
            <div className="text-xs text-gray-400">This month</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <div className="text-yellow-600">★</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">85% loyal</div>
            <div className="text-xs text-gray-400">Retention rate</div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Search customers..."
              className="w-64 px-3 py-2 pl-8 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">
              {/* Add search icon here */}
            </span>
          </div>
          <select className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300">
            <option>All customers</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>New</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Customer
        </button>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.ws_customer_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{customer.ws_customer_id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {customer.ws_customername[0]}
                    </div>
                    <span className="text-sm text-gray-900">{customer.ws_customername}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{customer.ws_emailid}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{customer.ws_phoneno}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Add New Customer</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addCustomer(formData);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Add Customer
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