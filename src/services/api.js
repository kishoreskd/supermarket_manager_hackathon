import axios from 'axios';

const BASE_URL = 'http://10.123.79.112:1026/u/home/json';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const api = {
  // Auth endpoints
  login: async (credentials) => {
    const data = {
      PMAI001Operation: {
        ws_log_recin: {
          ws_us_userid: credentials.userId,
          ws_us_pswd: credentials.password
        }
      }
    };
    return apiClient.post('/pmai001', data);
  },

  createAccount: async (accountData) => {
    const data = {
      PMAI002Operation: {
        ws_creat_recin: {
          ws_employee_id: accountData.employeeId,
          ws_security_question: accountData.securityQuestion,
          ws_answer: accountData.answer,
          ws_password: accountData.password
        }
      }
    };
    return apiClient.post('/pmai002', data);
  },

  forgotPassword: async (resetData) => {
    const data = {
      PMAI003Operation: {
        ws_forgot_recin: {
          ws_employee_id: resetData.employeeId,
          ws_security_question: resetData.securityQuestion,
          ws_answer: resetData.answer,
          ws_password: resetData.newPassword
        }
      }
    };
    return apiClient.post('/pmai003', data);
  },

  // Dashboard endpoints
  getBestSelling: async () => {
    const data = { PMAI004Operation: {} };
    return apiClient.post('/pmai004', data);
  },

  getDailySales: async () => {
    const data = { PMAI005Operation: {} };
    return apiClient.post('/pmai005', data);
  },

  // Inventory endpoints
  getInventory: async () => {
    const data = { PMAI006Operation: {} };
    return apiClient.post('/pmai006', data);
  },

  // Feedback endpoints
  getFeedback: async () => {
    const data = { PMAI007Operation: {} };
    return apiClient.post('/pmai007', data);
  },

  submitFeedback: async (feedbackData) => {
    const data = {
      PMAI020Operation: {
        ws_feedback_recin: {
          ws_order_id: feedbackData.orderId,
          ws_customerid: feedbackData.customerId,
          ws_item_feedback: feedbackData.itemRating,
          ws_service_feedback: feedbackData.serviceRating,
          ws_billing_feedback: feedbackData.billingRating,
          ws_customer_review: feedbackData.review
        }
      }
    };
    return apiClient.post('/pmai020', data);
  },

  // Customer endpoints
  getCustomerDetails: async (customerId) => {
    const data = {
      PMAI008Operation: {
        ws_custdet_recin: {
          ws_customer_id: customerId
        }
      }
    };
    return apiClient.post('/pmai008', data);
  },

  addCustomer: async (customerData) => {
    const data = {
      PMAI019Operation: {
        ws_custins_recin: {
          ws_customername: customerData.name,
          ws_emailid: customerData.email,
          ws_phoneno: customerData.phone
        }
      }
    };
    return apiClient.post('/pmai019', data);
  },

  // Order endpoints
  getOrders: async () => {
    const data = { PMAI009Operation: {} };
    return apiClient.post('/pmai009', data);
  },

  placeOrder: async (orderData) => {
    const data = {
      PMAI010Operation: {
        ws_place_order_input: {
          ws_customerid: orderData.customerId,
          ws_item_id: orderData.itemId,
          ws_quantity: orderData.quantity,
          ws_coupon: orderData.coupon
        }
      }
    };
    return apiClient.post('/pmai010', data);
  },

  updateOrder: async (orderId, status) => {
    const data = {
      PMAI011Operation: {
        ws_order_update_input: {
          ws_order_id: orderId,
          ws_status: status
        }
      }
    };
    return apiClient.post('/pmai011', data);
  },

  // Staff endpoints
  getStaff: async () => {
    const data = { PMAI012Operation: {} };
    return apiClient.post('/pmai012', data);
  },

  addStaff: async (staffData) => {
    const data = {
      PMAI013Operation: {
        ws_stafins_recin: {
          ws_employee_id: staffData.employeeId,
          ws_employee_name: staffData.name,
          ws_employee_email: staffData.email,
          ws_employee_phno: staffData.phone,
          ws_role: staffData.role
        }
      }
    };
    return apiClient.post('/pmai013', data);
  },

  deleteStaff: async (employeeId) => {
    const data = {
      PMAI014Operation: {
        ws_stafdel_recin: {
          ws_employee_id: employeeId
        }
      }
    };
    return apiClient.post('/pmai014', data);
  },

  updateStaff: async (staffData) => {
    const data = {
      PMAI015Operation: {
        ws_stafupd_recin: {
          ws_employee_id: staffData.employeeId,
          ws_employee_email: staffData.email,
          ws_employee_phno: staffData.phone,
          ws_role: staffData.role
        }
      }
    };
    return apiClient.post('/pmai015', data);
  },

  // Coupon endpoints
  getCoupons: async () => {
    const data = { PMAI016Operation: {} };
    return apiClient.post('/pmai016', data);
  },

  addCoupon: async (couponData) => {
    const data = {
      PMAI017Operation: {
        ws_coupins_recin: {
          ws_start_date: couponData.startDate,
          ws_end_date: couponData.endDate,
          ws_campaigns_name: couponData.campaignName,
          ws_coupon_code: couponData.code,
          ws_offer_percent: couponData.percentage
        }
      }
    };
    return apiClient.post('/pmai017', data);
  },

  updateCoupon: async (couponData) => {
    const data = {
      PMAI018Operation: {
        ws_coupupd_recin: {
          ws_coupon_id: couponData.couponId,
          ws_end_date: couponData.endDate,
          ws_coupon_code: couponData.code,
          ws_offer_percent: couponData.percentage
        }
      }
    };
    return apiClient.post('/pmai018', data);
  }
};

export default api;