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
    // Limit the comment length to 100 characters
    if (e.target.value.length <= 100) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
    <div className="max-w-md mx-auto mt-8 bg-white p-5 rounded-md shadow-lg outline outline-1 outline-slate-400">

      <ToastContainer />
      <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Feedback</h2>
      <p className="mb-5 leading-relaxed text-gray-600">If you had any issues or you liked our product, please share with us!</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="comment" className="mb-1 font-medium">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            maxLength={100} // Set the maximum character length
            className="h-64 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          ></textarea>
          <p className="text-sm text-gray-500">{formData.comment.length}/100 characters</p> {/* Display character count */}
        </div>
        <button type="submit" className="w-full font-bold py-2 rounded-md bg-red-500 text-white" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}
