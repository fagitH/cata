import React, { useState, useEffect, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { api } from '../../utils/api';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get('/contact');
      setContacts(data);
    } catch (err) {
      console.error('Failed to load contacts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await api.delete(`/contact/${id}`);
        fetchContacts();
      } catch (err) {
        console.error('Failed to delete contact:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Form Submissions</h1>
        <p className="text-slate-400 mt-2">Manage contact form submissions from your website visitors</p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400">Loading submissions...</div>
      ) : (
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Phone</th>
                <th className="px-4 py-3 text-left font-semibold">Subject</th>
                <th className="px-4 py-3 text-left font-semibold">Message</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-slate-300 font-medium">{contact.name}</td>
                  <td className="px-4 py-3 text-slate-300">
                    <a href={`mailto:${contact.email}`} className="text-blue-400 hover:underline">
                      {contact.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{contact.phone}</td>
                  <td className="px-4 py-3 text-slate-300 font-medium">{contact.subject}</td>
                  <td className="px-4 py-3 text-slate-300 max-w-xs truncate">
                    {contact.message}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {contacts.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              No contact submissions yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
