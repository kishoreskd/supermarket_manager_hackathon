'use client';
import React from 'react';

export default function ViewCustomer({ customer, onClose }) {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Customer Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Customer ID</label>
              <p className="mt-1 text-lg">{customer.ws_customer_id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1 text-lg">{customer.ws_customername}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-lg">
                <a href={`mailto:${customer.ws_emailid}`} className="text-blue-600 hover:text-blue-900">
                  {customer.ws_emailid}
                </a>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone</label>
              <p className="mt-1 text-lg">
                <a href={`tel:${customer.ws_phoneno}`} className="text-blue-600 hover:text-blue-900">
                  {customer.ws_phoneno}
                </a>
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500">No recent activity found.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}