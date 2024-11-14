'use client';
import { useState } from 'react';

export default function StaffPage() {
  const [staffList, setStaffList] = useState([
    {
      ws_employee_id: 10001,
      ws_employee_name: "SAM",
      ws_employee_email: "SAM@RETAILAPP.COM",
      ws_employee_phno: 9876541230,
      ws_role: "MANAGER"
    },
    {
      ws_employee_id: 10002,
      ws_employee_name: "ARAVIND",
      ws_employee_email: "ARAVIND@RETAILAPP.COM",
      ws_employee_phno: 9988776655,
      ws_role: "MANAGER"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">Staff Management</h1>
      <p className="text-sm text-gray-500 mb-6">Manage your store staff and roles</p>

      {/* Staff Statistics */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-blue-100 p-2 rounded-lg">
            <div className="text-blue-600">👥</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">24 total</div>
            <div className="text-xs text-gray-400">Active staff</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-green-100 p-2 rounded-lg">
            <div className="text-green-600">+</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">3 new</div>
            <div className="text-xs text-gray-400">This month</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg flex-1">
          <div className="bg-purple-100 p-2 rounded-lg">
            <div className="text-purple-600">★</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">8 managers</div>
            <div className="text-xs text-gray-400">Active roles</div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search staff..."
              className="w-64 px-3 py-2 pl-8 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">
              {/* Add search icon here */}
            </span>
          </div>
          <select className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300">
            <option>All roles</option>
            <option>Manager</option>
            <option>Supervisor</option>
            <option>Staff</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Staff
        </button>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {staffList.map((staff) => (
              <tr key={staff.ws_employee_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{staff.ws_employee_id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {staff.ws_employee_name[0]}
                    </div>
                    <span className="text-sm text-gray-900">{staff.ws_employee_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{staff.ws_employee_email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{staff.ws_employee_phno}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    {staff.ws_role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingStaff(staff)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteStaff(staff.ws_employee_id)}
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

      {/* Add/Edit Staff Modal */}
      {(showAddForm || editingStaff) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {editingStaff ? 'Edit Staff' : 'Add New Staff'}
              </h3>
              <button 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingStaff(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <form onSubmit={editingStaff ? handleUpdateStaff : handleAddStaff}>
              <div className="space-y-4">
                {!editingStaff && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                    <input
                      name="ws_employee_id"
                      type="number"
                      required
                      pattern="\d{5}"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}
                {/* ... other form fields with same styling ... */}
                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingStaff(null);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {editingStaff ? 'Update' : 'Add'} Staff
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