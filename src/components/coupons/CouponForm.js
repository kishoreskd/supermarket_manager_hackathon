import { useState } from 'react';
import { validateDate, validateCouponPercentage } from '@/utils/validations';

export default function CouponForm() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    campaignName: '',
    couponCode: '',
    offerPercent: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate dates
    if (!validateDate(formData.startDate)) {
      newErrors.startDate = 'Invalid date format (YYYY-MM-DD)';
    }
    if (!validateDate(formData.endDate)) {
      newErrors.endDate = 'Invalid date format (YYYY-MM-DD)';
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    // Validate campaign name
    if (!/^[A-Za-z\s]+$/.test(formData.campaignName)) {
      newErrors.campaignName = 'Campaign name must contain only letters and spaces';
    }

    // Validate coupon code
    if (!/^[A-Za-z0-9]+$/.test(formData.couponCode)) {
      newErrors.couponCode = 'Coupon code must be alphanumeric';
    }

    // Validate offer percentage
    if (!validateCouponPercentage(formData.offerPercent)) {
      newErrors.offerPercent = 'Offer percentage must be between 1 and 25';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // API call to add coupon
    const data = {
      PMAI017Operation: {
        ws_coupins_recin: {
          ws_start_date: formData.startDate,
          ws_end_date: formData.endDate,
          ws_campaigns_name: formData.campaignName,
          ws_coupon_code: formData.couponCode,
          ws_offer_percent: parseInt(formData.offerPercent)
        }
      }
    };

    try {
      const response = await axios.post('http://10.123.79.112:1026/u/home/json/pmai017', data);
      // Handle successful coupon addition
    } catch (error) {
      console.error('Coupon addition failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
        </div>
      </div>

      {/* Other form fields */}
    </form>
  );
} 