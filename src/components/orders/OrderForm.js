import { useState } from 'react';
import { validateOrderId, validateQuantity } from '@/utils/validations';

export default function OrderForm() {
  const [formData, setFormData] = useState({
    customerId: '',
    itemId: '',
    quantity: '',
    couponId: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate Customer ID
    if (!/^C\d{3}$/.test(formData.customerId)) {
      newErrors.customerId = 'Customer ID must start with C followed by 3 digits';
    }

    // Validate Item ID
    if (!/^I\d{3}$/.test(formData.itemId)) {
      newErrors.itemId = 'Item ID must start with I followed by 3 digits';
    }

    // Validate Quantity
    if (!validateQuantity(formData.quantity)) {
      newErrors.quantity = 'Quantity must be between 1 and 100';
    }

    // Validate Coupon ID (optional)
    if (formData.couponId && formData.couponId.length !== 4) {
      newErrors.couponId = 'Coupon ID must be 4 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // API call to place order
    const data = {
      PMAI010Operation: {
        ws_place_order_input: {
          ws_customerid: formData.customerId,
          ws_item_id: formData.itemId,
          ws_quantity: parseInt(formData.quantity),
          ws_coupon: formData.couponId || null
        }
      }
    };

    try {
      const response = await axios.post('http://10.123.79.112:1026/u/home/json/pmai010', data);
      // Handle successful order placement
    } catch (error) {
      console.error('Order placement failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
    </form>
  );
} 