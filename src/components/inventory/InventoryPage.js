'use client';
import React, { useState, useEffect } from 'react';
import AddInventoryForm from './AddInventoryForm';
import api from '@/services/api';
import { useApi, handleApiError } from '@/hooks/useApi';

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { loading, error, callApi } = useApi();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await callApi(api.getInventory);
      // Get the inventory data from the API response
      const data = response.PMAI006OperationResponse.ws_invent_recout.ws_invent_res;
      setInventory(data);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      // If the API fails, use sample data
      setInventory([
        {
          ws_item_id: "I001",
          ws_item_name: "LAPTOP",
          ws_unit_price: 999.99,
          ws_stock: 34,
          ws_category: "ELECTRONICS",
          ws_description: "HIGH-PERFORMANCE LAPTOP WITH 16GB RAM AND 512GB SSD"
        },
        {
          ws_item_id: "I002",
          ws_item_name: "SMARTPHONE",
          ws_unit_price: 699.99,
          ws_stock: 88,
          ws_category: "ELECTRONICS",
          ws_description: "LATEST MODEL SMARTPHONE WITH 5G CONNECTIVITY"
        }
      ]);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      // Call the API to add the item
      await callApi(api.addInventoryItem, newItem);
      // Refresh the inventory list
      fetchInventory();
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding item:', err);
      // For now, just add it to local state
      setInventory([...inventory, { 
        ...newItem,
        ws_item_id: `I${String(inventory.length + 1).padStart(3, '0')}` 
      }]);
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        // Call the API to delete the item
        await callApi(api.deleteInventoryItem, itemId);
        // Refresh the inventory list
        fetchInventory();
      } catch (err) {
        console.error('Error deleting item:', err);
        // For now, just remove it from local state
        setInventory(inventory.filter(item => item.ws_item_id !== itemId));
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        <h3 className="font-bold mb-2">Error Loading Inventory</h3>
        <p>{error}</p>
        <button 
          onClick={fetchInventory}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">Inventory Management</h1>
      <p className="text-sm text-gray-500 mb-6">Track and manage your product inventory</p>

      {/* Inventory Statistics */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-green-100 p-2 rounded-lg">
            <div className="text-green-600">↑</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">122 products</div>
            <div className="text-xs text-gray-400">In stock</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <div className="text-yellow-600">!</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">8 products</div>
            <div className="text-xs text-gray-400">Low stock</div>
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

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-64 px-3 py-2 pl-8 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">
              {/* Add search icon here */}
            </span>
          </div>
          <select className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300">
            <option>All categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Accessories</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            onClick={fetchInventory}
            className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
          >
            Refresh
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          <p>{error}</p>
          <button 
            onClick={fetchInventory}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.ws_item_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{item.ws_item_id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                        {item.ws_item_name[0]}
                      </div>
                      <span className="text-sm text-gray-900">{item.ws_item_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${item.ws_unit_price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.ws_stock < 10 ? 'bg-red-100 text-red-800' : 
                      item.ws_stock < 30 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.ws_stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.ws_category}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button 
                        onClick={() => handleDeleteItem(item.ws_item_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Item Form Modal */}
      {showAddForm && (
        <AddInventoryForm
          onSubmit={handleAddItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}