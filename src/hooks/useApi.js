import { useState, useCallback } from 'react';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, callApi };
}

export function handleApiError(error) {
  console.error('API Error:', error);
  if (error.response) {
    // The request was made and server responded with error status
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    return error.response.data?.message || 'Server error occurred';
  } else if (error.request) {
    // The request was made but no response received
    console.error('No response received:', error.request);
    return 'No response from server';
  } else {
    // Error in request setup
    console.error('Request error:', error.message);
    return 'Failed to make request';
  }
}