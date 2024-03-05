import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ContactsbyCategory() {
  const [contacts, setContacts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    fetchContactsByCategory();
  }, [categoryId]); // Add categoryId to dependency array

  const fetchContactsByCategory = async () => {
    try {
      const response = await axios.get(`/api/v1/category/contacts/${categoryId}`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  return (
    <div className='flex justify-center items-center mt-10 mb-32'>
      <div>
        <h2 className='text-2xl font-semibold text-center text-red-500 mb-5'>Contacts</h2>
        <table className="table-fixed">
          <thead className='bg-red-500 text-white'>
            <tr>
              <th className="w-1/3">Name</th>
              <th className="w-1/3">Description</th>
              <th className="w-1/3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id} className='text-center'>
                <td className="border border-gray-400 px-4 py-2">{contact.name}</td>
                <td className="border border-gray-400 px-4 py-2">{contact.description}</td>
                <td className="border border-gray-400 px-4 py-2">{contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
