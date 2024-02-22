import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

export default function ContactsTable() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PORT}/api/v1/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-8">
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="border px-4 py-2">{contact.name}</td>
              <td className="border px-4 py-2">{contact.description}</td>
              <td className="border px-4 py-2">{contact.phone}</td>
              <td className="border px-4 py-2">
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="h-10 w-10 object-cover"
                />
              </td>
              <td className="border px-4 py-2">
              <div className="flex">
                <Link to={`/admin/update/category/contacts/`} className="mr-2">
                  <AiOutlineEdit className="text-blue-500" />
                </Link>
                <button>
                  <AiOutlineDelete className="text-red-500" />
                </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}
