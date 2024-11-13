'use client';
import { useState } from 'react';

export default function CustomerPage() {
  const [customerId, setCustomerId] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Function to get customer details
  const getCustomerDetails = async () => {
    try {
      const data = {
        PMAI008Operation: {
          ws_custdet_recin: {
            ws_customer_id: customerId
          }
        }
      };

      // Replace with actual API call
      const response = await fetch('http://10.123.79.112:1026/u/home/json/pmai008', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      setCustomerDetails(result.PMAI008OperationResponse.ws_custdet_recout.ws_custdet_res);
    } catch (error) {
      alert('Failed to fetch customer details');
    }
  };

  // Function to add new customer
  const addCustomer = async (formData) => {
    try {
      const data = {
        PMAI019Operation: {
          ws_custins_recin: {
            ws_customername: formData.get('name'),
            ws_emailid: formData.get('email'),
            ws_phoneno: formData.get('phone')
          }
        }
      };

      // Replace with actual API call
      const response = await fetch('http://10.123.79.112:1026/u/home/json/pmai019', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.PMAI019OperationResponse.ws_reg_recout.ws_out_status);
      setShowAddForm(false);
    } catch (error) {
      alert('Failed to add customer');
    }
  };

  return (
    <div className="p-4">
      {/* Display Customer Details Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Display Customer Details</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter Customer ID"
            className="border p-2 rounded"
          />
          <button
            onClick={getCustomerDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Details
          </button>
        </div>
        {customerDetails && (
          <div className="border p-4 rounded">
            <p>ID: {customerDetails.ws_customer_id}</p>
            <p>Name: {customerDetails.ws_customername}</p>
            <p>Email: {customerDetails.ws_emailid}</p>
            <p>Phone: {customerDetails.ws_phoneno}</p>
          </div>
        )}
      </div>

      {/* Add New Customer Section */}
      <div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add New Customer
        </button>

        {showAddForm && (
          <div className="border p-4 rounded">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addCustomer(formData);
            }}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}