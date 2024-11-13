'use client';
import { useState } from 'react';

export default function StaffPage() {
  // Sample staff data
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

  // Add new staff
  const handleAddStaff = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newStaff = {
      ws_employee_id: parseInt(formData.get('ws_employee_id')),
      ws_employee_name: formData.get('ws_employee_name'),
      ws_employee_email: formData.get('ws_employee_email'),
      ws_employee_phno: parseInt(formData.get('ws_employee_phno')),
      ws_role: formData.get('ws_role')
    };

    setStaffList([...staffList, newStaff]);
    setShowAddForm(false);
  };

  // Delete staff
  const handleDeleteStaff = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaffList(staffList.filter(staff => staff.ws_employee_id !== employeeId));
    }
  };

  // Update staff
  const handleUpdateStaff = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const updatedStaff = {
      ...editingStaff,
      ws_employee_email: formData.get('ws_employee_email'),
      ws_employee_phno: parseInt(formData.get('ws_employee_phno')),
      ws_role: formData.get('ws_role')
    };

    setStaffList(staffList.map(staff => 
      staff.ws_employee_id === editingStaff.ws_employee_id ? updatedStaff : staff
    ));
    setEditingStaff(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Staff
        </button>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffList.map((staff) => (
              <tr key={staff.ws_employee_id}>
                <td className="px-6 py-4 whitespace-nowrap">{staff.ws_employee_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{staff.ws_employee_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{staff.ws_employee_email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{staff.ws_employee_phno}</td>
                <td className="px-6 py-4 whitespace-nowrap">{staff.ws_role}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => setEditingStaff(staff)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(staff.ws_employee_id)}
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

      {/* Add Staff Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add New Staff</h3>
            <form onSubmit={handleAddStaff}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Employee ID (5 digits)</label>
                  <input
                    name="ws_employee_id"
                    type="number"
                    required
                    pattern="\d{5}"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    name="ws_employee_name"
                    type="text"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    name="ws_employee_email"
                    type="email"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Phone (10 digits)</label>
                  <input
                    name="ws_employee_phno"
                    type="tel"
                    required
                    pattern="\d{10}"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Role</label>
                  <select
                    name="ws_role"
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="MANAGER">MANAGER</option>
                    <option value="BILLER">BILLER</option>
                    <option value="SUPERVISOR">SUPERVISOR</option>
                    <option value="FACILITY">FACILITY</option>
                  </select>
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
                    Add Staff
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Form Modal */}
      {editingStaff && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Edit Staff</h3>
            <form onSubmit={handleUpdateStaff}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    name="ws_employee_email"
                    type="email"
                    required
                    defaultValue={editingStaff.ws_employee_email}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Phone (10 digits)</label>
                  <input
                    name="ws_employee_phno"
                    type="tel"
                    required
                    pattern="\d{10}"
                    defaultValue={editingStaff.ws_employee_phno}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Role</label>
                  <select
                    name="ws_role"
                    required
                    defaultValue={editingStaff.ws_role}
                    className="w-full p-2 border rounded"
                  >
                    <option value="MANAGER">MANAGER</option>
                    <option value="BILLER">BILLER</option>
                    <option value="SUPERVISOR">SUPERVISOR</option>
                    <option value="FACILITY">FACILITY</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingStaff(null)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Update Staff
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