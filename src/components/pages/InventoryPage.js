import { useState, useEffect } from 'react';
import axios from 'axios';

export default function InventoryPage({ isDarkMode }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    unitPrice: '',
    stock: '',
    category: ''
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  // waawfwqwq

  const fetchInventory = async () => {
    try {
      const response = await axios.post('http://10.123.79.112:1026/u/home/json/pmai006', {
        PMAI006Operation: {}
      });
      setInventory(response.data.PMAI006OperationResponse.ws_invent_recout.ws_invent_res);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Inventory Management
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {inventory.map((item) => (
                <tr key={item.ws_item_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.ws_item_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.ws_item_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{item.ws_unit_price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.ws_stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.ws_category}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 