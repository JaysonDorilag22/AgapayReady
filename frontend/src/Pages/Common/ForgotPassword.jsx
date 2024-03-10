import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import background from '../../assets/Verification.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/v1/forgot-password', { email });
      toast.success('Password reset instructions have been sent to your email.');
    } catch (error) {
      console.error('Error sending forgot password request:', error);
      toast.error('Failed to send password reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="z-10 bg-white  max-w-md w-full p-8 rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring focus:ring-red-600 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-600 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
