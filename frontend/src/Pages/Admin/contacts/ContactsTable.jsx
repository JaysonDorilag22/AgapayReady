import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <table className="table-auto w-full">
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
                <Link
                  to={`/contacts/${contact._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-3"
                >
                  Edit
                </Link>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-3" onClick={() => handleDelete(contact._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}
