'use client';
import { useState } from 'react';

export default function CouponsPage() {
  // Sample coupon data
  const [coupons, setCoupons] = useState([
    {
      ws_coupon_id: 3001,
      ws_start_date: "2024-01-01",
      ws_end_date: "2024-01-31",
      ws_campaigns_name: "NEW YEAR SALE",
      ws_coupon_code: "NY2024SALE01",
      ws_offer_percent: 20
    },
    {
      ws_coupon_id: 3002,
      ws_start_date: "2024-02-01",
      ws_end_date: "2024-02-14",
      ws_campaigns_name: "VALENTINE SPECIAL",
      ws_coupon_code: "VAL2024LOVE",
      ws_offer_percent: 15
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Add new coupon
  const handleAddCoupon = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newCoupon = {
      ws_coupon_id: 3000 + coupons.length + 1,
      ws_start_date: formData.get('start_date'),
      ws_end_date: formData.get('end_date'),
      ws_campaigns_name: formData.get('campaigns_name').toUpperCase(),
      ws_coupon_code: formData.get('coupon_code').toUpperCase(),
      ws_offer_percent: parseInt(formData.get('offer_percent'))
    };

    setCoupons([...coupons, newCoupon]);
    setShowAddForm(false);
  };

  // Update coupon
  const handleUpdateCoupon = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const updatedCoupon = {
      ...editingCoupon,
      ws_end_date: formData.get('end_date'),
      ws_coupon_code: formData.get('coupon_code').toUpperCase(),
      ws_offer_percent: parseInt(formData.get('offer_percent'))
    };

    setCoupons(coupons.map(coupon => 
      coupon.ws_coupon_id === editingCoupon.ws_coupon_id ? updatedCoupon : coupon
    ));
    setEditingCoupon(null);
  };

  // Check if coupon is expired
  const isExpired = (endDate) => new Date(endDate) < new Date();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Coupon Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Coupon
        </button>
      </div>

      {/* Coupons List */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr key={coupon.ws_coupon_id}>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.ws_coupon_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.ws_campaigns_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {coupon.ws_coupon_code}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.ws_start_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.ws_end_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.ws_offer_percent}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isExpired(coupon.ws_end_date)
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {isExpired(coupon.ws_end_date) ? 'Expired' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setEditingCoupon(coupon)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Coupon Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add New Coupon</h3>
            <form onSubmit={handleAddCoupon}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Campaign Name</label>
                  <input
                    name="campaigns_name"
                    type="text"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Coupon Code</label>
                  <input
                    name="coupon_code"
                    type="text"
                    required
                    pattern="[A-Za-z0-9]+"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Start Date</label>
                  <input
                    name="start_date"
                    type="date"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">End Date</label>
                  <input
                    name="end_date"
                    type="date"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Discount Percentage (max 25%)</label>
                  <input
                    name="offer_percent"
                    type="number"
                    required
                    min="1"
                    max="25"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add Coupon
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Coupon Form Modal */}
      {editingCoupon && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Edit Coupon</h3>
            <form onSubmit={handleUpdateCoupon}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Coupon Code</label>
                  <input
                    name="coupon_code"
                    type="text"
                    required
                    pattern="[A-Za-z0-9]+"
                    defaultValue={editingCoupon.ws_coupon_code}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">End Date</label>
                  <input
                    name="end_date"
                    type="date"
                    required
                    defaultValue={editingCoupon.ws_end_date}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Discount Percentage (max 25%)</label>
                  <input
                    name="offer_percent"
                    type="number"
                    required
                    min="1"
                    max="25"
                    defaultValue={editingCoupon.ws_offer_percent}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingCoupon(null)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Update Coupon
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