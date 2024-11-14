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
      <h1 className="text-xl font-semibold mb-2">Coupon Management</h1>
      <p className="text-sm text-gray-500 mb-6">Create and manage promotional campaigns</p>

      {/* Coupon Statistics */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-green-100 p-2 rounded-lg">
            <div className="text-green-600">↑</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">12 active</div>
            <div className="text-xs text-gray-400">Current campaigns</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <div className="text-yellow-600">!</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">5 expiring</div>
            <div className="text-xs text-gray-400">Within 7 days</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-blue-100 p-2 rounded-lg">
            <div className="text-blue-600">✓</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">1,234 uses</div>
            <div className="text-xs text-gray-400">This month</div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search coupons..."
              className="w-64 px-3 py-2 pl-8 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">
              {/* Add search icon here */}
            </span>
          </div>
          <select className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300">
            <option>All coupons</option>
            <option>Active</option>
            <option>Expired</option>
            <option>Upcoming</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          New Coupon
        </button>
      </div>

      {/* Coupons List */}
      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr key={coupon.ws_coupon_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{coupon.ws_coupon_id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{coupon.ws_campaigns_name}</td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-900">
                    {coupon.ws_coupon_code}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{coupon.ws_start_date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{coupon.ws_end_date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{coupon.ws_offer_percent}%</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isExpired(coupon.ws_end_date)
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {isExpired(coupon.ws_end_date) ? 'Expired' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => setEditingCoupon(coupon)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Coupon Modal */}
      {(showAddForm || editingCoupon) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}
              </h3>
              <button 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingCoupon(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <form onSubmit={editingCoupon ? handleUpdateCoupon : handleAddCoupon}>
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
                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCoupon(null);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {editingCoupon ? 'Update' : 'Add'} Coupon
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