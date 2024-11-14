'use client';
import React, { useState, useEffect } from 'react';
import PlaceOrderForm from './PlaceOrderForm';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);

  // Sample data for development/testing
  const sampleOrders = [
    {
      ws_order_id: "ORD00001",
      ws_customerid: "C001",
      ws_item_id: "I001",
      ws_quantity: 1,
      ws_coupon: "C001",
      ws_order_total: 999.99,
      ws_transaction_date: "2024-10-01",
      ws_order_status: "RECEIVED"
    },
    {
      ws_order_id: "ORD00002",
      ws_customerid: "C002",
      ws_item_id: "I002",
      ws_quantity: 2,
      ws_coupon: null,
      ws_order_total: 1399.98,
      ws_transaction_date: "2024-10-01",
      ws_order_status: "ORDERED"
    }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      // For now, we'll use sample data instead of API
      setOrders(sampleOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = (orderData) => {
    try {
      // Create new order with generated ID
      const newOrder = {
        ...orderData,
        ws_order_id: `ORD${String(orders.length + 1).padStart(5, '0')}`,
        ws_transaction_date: new Date().toISOString().split('T')[0],
        ws_order_status: 'ORDERED'
      };
      
      // Add to orders list
      setOrders([newOrder, ...orders]);
      setShowPlaceOrder(false);
      
      // Show success message
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    if (window.confirm(`Are you sure you want to mark this order as ${newStatus}?`)) {
      try {
        // Update order status in the list
        setOrders(orders.map(order => 
          order.ws_order_id === orderId 
            ? { ...order, ws_order_status: newStatus }
            : order
        ));
      } catch (err) {
        console.error('Error updating order status:', err);
        alert('Failed to update order status. Please try again.');
      }
    }
  };

  const getStatusBadgeColor = (status) => {
    switch(status.toUpperCase()) {
      case 'ORDERED':
        return 'bg-yellow-100 text-yellow-800';
      case 'RECEIVED':
        return 'bg-green-100 text-green-800';
      case 'CANCEL':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">Orders Management</h1>
      <p className="text-sm text-gray-500 mb-6">Track and manage all your orders</p>

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
          <div className="bg-blue-100 p-2 rounded-lg">
            <div className="text-blue-600">✓</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">142 orders</div>
            <div className="text-xs text-gray-400">Completed this month</div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-64 px-3 py-2 pl-8 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">
              {/* Add search icon here */}
            </span>
          </div>
          <select className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300">
            <option>All orders</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            onClick={fetchOrders}
            className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
          >
            Refresh
          </button>
          <button
            onClick={() => setShowPlaceOrder(true)}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            New Order
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          <p>{error}</p>
          <button 
            onClick={fetchOrders}
            className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.ws_order_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{order.ws_order_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.ws_customerid}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.ws_item_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.ws_quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${order.ws_order_total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.ws_transaction_date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(order.ws_order_status)}`}>
                      {order.ws_order_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {order.ws_order_status === 'ORDERED' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(order.ws_order_id, 'RECEIVED')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Receive
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(order.ws_order_id, 'CANCEL')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPlaceOrder && (
        <PlaceOrderForm
          onSubmit={handlePlaceOrder}
          onCancel={() => setShowPlaceOrder(false)}
        />
      )}
    </div>
  );
}