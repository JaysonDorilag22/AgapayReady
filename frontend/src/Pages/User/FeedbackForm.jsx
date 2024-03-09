import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FeedbackForm() {
  const { _id: userId } = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    comment: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/send-feedback', { ...formData, user: userId });
      toast.success('Feedback submitted successfully!');
      // Optionally, you can clear the form fields after submission
      setFormData({ comment: '' });
    } catch (error) {
      toast.error('Error submitting feedback');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
      <ToastContainer />
      <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Feedback</h2>
      <p className="mb-5 leading-relaxed text-gray-600">If you had any issues or you liked our product, please share with us!</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="comment" className="text-sm leading-7 text-gray-600">Comment</label>
          <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"></textarea>
        </div>
        <button type="submit" className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>
      <p className="mt-3 text-xs text-gray-500">Feel free to connect with us on social media platforms.</p>
    </div>
  );
}
