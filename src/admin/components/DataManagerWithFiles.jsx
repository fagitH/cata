import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Edit2, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '../../utils/api';

const getTodayDate = () => new Date().toISOString().slice(0, 10);

export default function DataManagerWithFiles({
  title,
  endpoint,
  columns,
  formFields,
  fileField = null, // { name: 'image', label: 'Image', accept: 'image/*' }
  fileFields = [], // Array of file fields for multiple file uploads: [{ name: 'image', label: 'Image', accept: 'image/*' }, ...]
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [filesData, setFilesData] = useState({}); // { image: file, event_image: file, event_images: [file1, file2...], ... }
  const [message, setMessage] = useState(null);

  // Support both single fileField and array fileFields
  const allFileFields = fileFields.length > 0 ? fileFields : (fileField ? [fileField] : []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get(`/${endpoint}`);
      setItems(data);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    if (e.target.multiple) {
      // Handle multiple files for fields like event_images
      const files = Array.from(e.target.files);
      setFilesData((prev) => ({ ...prev, [fieldName]: files }));
    } else {
      // Handle single file
      const file = e.target.files[0];
      if (file) {
        setFilesData((prev) => ({ ...prev, [fieldName]: file }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const normalizedFormData = { ...formData };
      const hasPublishedDate = formFields.some((field) => field.key === 'published_date');
      if (hasPublishedDate && normalizedFormData.published_date === '') {
        normalizedFormData.published_date = getTodayDate();
      }

      const submitData = new FormData();

      // Add form fields to FormData
      Object.keys(normalizedFormData).forEach((key) => {
        // Skip file fields - we'll add them separately
        if (!allFileFields.some(ff => ff.name === key)) {
          submitData.append(key, normalizedFormData[key]);
        }
      });

      // Add files from filesData
      allFileFields.forEach((field) => {
        if (filesData[field.name]) {
          const fileValue = filesData[field.name];
          // Check if it's an array of files (multiple) or single file
          if (Array.isArray(fileValue)) {
            // For multiple files, append each one with the same field name
            fileValue.forEach((file) => {
              submitData.append(field.name, file);
            });
          } else {
            // For single file
            submitData.append(field.name, fileValue);
          }
        }
      });
      // When editing without uploading new files, don't include the file fields
      // so the backend will keep the existing values unchanged

      if (editingId) {
        await api.put(`/${endpoint}/${editingId}`, submitData);
        setMessage({ type: 'success', text: 'Updated successfully' });
      } else {
        await api.post(`/${endpoint}`, submitData);
        setMessage({ type: 'success', text: 'Created successfully' });
      }
      setFormData({});
      setFilesData({});
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      ...item,
      ...(formFields.some((field) => field.key === 'published_date')
        ? { published_date: item.published_date || item.date || getTodayDate() }
        : {}),
    });
    setFilesData({});
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/${endpoint}/${id}`);
        setMessage({ type: 'success', text: 'Deleted successfully' });
        fetchData();
      } catch (err) {
        setMessage({ type: 'error', text: err.message });
      }
    }
  };

  const handleNewItem = () => {
    setEditingId(null);
    setFormData(
      formFields.some((field) => field.key === 'published_date')
        ? { published_date: getTodayDate() }
        : {}
    );
    setFilesData({});
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">Manage your {title.toLowerCase()}</p>
        </div>
        <button
          onClick={handleNewItem}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 border transition-all ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle size={20} className="flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="flex-shrink-0" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 p-4 sm:p-8">
          <div className="flex min-h-full items-center justify-center">
            <div className="w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow-2xl sm:p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {editingId ? '✏️ Edit' : '➕ Create New'} {title}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.key}
                      value={formData[field.key] || ''}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.key}
                      value={formData[field.key] || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required={field.required}
                    >
                      <option value="">-- Select {field.label} --</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      name={field.key}
                      value={formData[field.key] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}

              {allFileFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type="file"
                    accept={field.accept || '*'}
                    multiple={field.multiple === true}
                    onChange={(e) => handleFileChange(e, field.name)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded file:cursor-pointer file:font-medium file:hover:bg-blue-700"
                  />
                  {filesData[field.name] && (
                    <p className="text-sm text-emerald-600 mt-2 font-medium">
                      ✓ {Array.isArray(filesData[field.name]) 
                        ? `Selected: ${filesData[field.name].length} file(s)`
                        : `Selected: ${filesData[field.name].name}`
                      }
                    </p>
                  )}
                  {editingId && formData[field.name] && !filesData[field.name] && (
                    <p className="text-sm text-gray-500 mt-2">
                      {(() => {
                        try {
                          const parsed = JSON.parse(formData[field.name] || '[]');
                          return Array.isArray(parsed) 
                            ? `Current: ${parsed.length} file(s)`
                            : `Current: ${formData[field.name]}`;
                        } catch {
                          return `Current: ${formData[field.name]}`;
                        }
                      })()}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({});
                  setFilesData({});
                  setEditingId(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-3 font-medium">Loading data...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {columns.map((col) => (
                    <th key={col.key} className="px-6 py-4 text-left font-semibold text-gray-700">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">
                      <div className="space-y-2">
                        <p className="font-medium">No items found</p>
                        <p className="text-sm">Click "Add New" to create one</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      {columns.map((col) => (
                        <td key={col.key} className="px-6 py-4 text-gray-900">
                          <div className="truncate max-w-xs">
                            {typeof col.render === 'function'
                              ? col.render(item)
                              : String(item[col.key] || '-').substring(0, 50)}
                          </div>
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(item)}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                            <span className="text-xs">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                            <span className="text-xs">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
