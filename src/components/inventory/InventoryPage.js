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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <div className="flex gap-4">
          <button
            onClick={fetchInventory}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh Data
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add New Item
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.ws_item_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{item.ws_item_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.ws_item_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${item.ws_unit_price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.ws_stock < 10 ? 'bg-red-100 text-red-800' : 
                    item.ws_stock < 30 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.ws_stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.ws_category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button 
                    onClick={() => handleDeleteItem(item.ws_item_id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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