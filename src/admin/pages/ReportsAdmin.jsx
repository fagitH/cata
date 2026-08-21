import React, { useEffect, useState } from 'react';
import DataManagerWithFiles from '../components/DataManagerWithFiles';
import { api } from '../../utils/api';

const normalizeSlug = (value = '') => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export default function ReportsAdmin() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [reportOptions, setReportOptions] = useState([]);
  const [detailForm, setDetailForm] = useState({
    title: '',
    slug: '',
    description: '',
    year: '',
    image: '',
  });
  const [reportFiles, setReportFiles] = useState({ image: null });
  const [detailMessage, setDetailMessage] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showDetailEditor, setShowDetailEditor] = useState(false);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug' },
    {
      key: 'description',
      label: 'Description',
      render: (item) => {
        const text = item.description;
        return text ? `${text.substring(0, 40)}${text.length > 40 ? '...' : ''}` : '—';
      },
    },
    { key: 'year', label: 'Year' },

    {
      key: 'updated_at',
      label: 'Updated',
      render: (item) => {
        const dateValue = item.updated_at || item.created_at || item.date;
        return dateValue ? new Date(dateValue).toLocaleDateString() : '—';
      },
    },
  ];

  const formFields = [
    { key: 'title', label: 'Report Title', type: 'text' },
    { key: 'slug', label: 'Slug', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'year', label: 'Year', type: 'number' },
  ];

  const fileFields = [
    {
      name: 'image',
      label: 'Cover Image',
      accept: 'image/*',
    },
  ];

  const handleSelectReport = (report) => {
    setSelectedId(report?.id ?? null);
    setSelectedReport(report ?? null);
    setDetailForm({
      title: report?.title || '',
      slug: report?.slug || '',
      description: report?.description || '',
      year: report?.year || '',
      image: report?.image || '',
    });
  };

  const fetchReportList = async () => {
    try {
      const data = await api.get('/annual_reports');
      setReportOptions(Array.isArray(data) ? data : []);

      if (data?.length) {
        const chosenReport = selectedId
          ? data.find((item) => Number(item.id) === Number(selectedId)) || data[0]
          : data[0];
        handleSelectReport(chosenReport);
      } else {
        setSelectedId(null);
        setSelectedReport(null);
        setDetailForm({
          title: '',
          slug: '',
          description: '',
          year: '',
          image: '',
        });
      }
    } catch (error) {
      console.error('Failed to load annual report data for detail editor:', error);
    }
  };

  useEffect(() => {
    fetchReportList();
  }, []);

  const handleDetailChange = (event) => {
    const { name, value } = event.target;
    setDetailForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReportFileChange = (event, fieldName) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    setReportFiles((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleDetailSubmit = async (event) => {
    event.preventDefault();
    if (!selectedId) return;

    try {
      setLoadingDetail(true);
      setDetailMessage(null);

      const payload = {
        ...detailForm,
        slug: detailForm.slug.trim() || normalizeSlug(detailForm.title),
      };

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
          return;
        }
        if (value !== '') {
          formData.append(key, String(value));
        }
      });

      if (reportFiles.image) {
        formData.set('image', reportFiles.image);
      }

      await api.put(`/annual_reports/${selectedId}`, formData);
      setReportFiles({ image: null });
      setDetailMessage({ type: 'success', text: 'Annual report detail saved successfully.' });
      await fetchReportList();
    } catch (error) {
      setDetailMessage({ type: 'error', text: error.message || 'Failed to save annual report detail.' });
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="space-y-8">
      <DataManagerWithFiles
        title="Annual Reports"
        endpoint="annual_reports"
        columns={columns}
        formFields={formFields}
        fileFields={fileFields}
      />

      {showDetailEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
            <div className="flex flex-col gap-4 border-b border-slate-700 pb-4 mb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Report Detail Manager</h2>
                <p className="text-sm text-slate-400">
                  Select a report to control the detail content shown on the public report page.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="text-sm text-slate-300">Selected Annual Report</label>
                <select
                  value={selectedId ?? ''}
                  onChange={(event) => {
                    const nextReport = reportOptions.find((item) => Number(item.id) === Number(event.target.value));
                    if (nextReport) handleSelectReport(nextReport);
                  }}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  {reportOptions.map((report) => (
                    <option key={report.id} value={report.id}>
                      {report.title}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setDetailMessage(null)}
                  className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-sm font-medium"
                >
                  Clear message
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetailEditor(false)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>

            {selectedReport ? (
              <form onSubmit={handleDetailSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Report Title</label>
                    <input
                      name="title"
                      value={detailForm.title}
                      onChange={handleDetailChange}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <input
                      name="slug"
                      value={detailForm.slug}
                      onChange={handleDetailChange}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Year</label>
                    <input
                      name="year"
                      type="number"
                      value={detailForm.year}
                      onChange={handleDetailChange}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={detailForm.description}
                      onChange={handleDetailChange}
                      rows="3"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Replace Report Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleReportFileChange(event, 'image')}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    {reportFiles.image && (
                      <p className="mt-2 text-sm text-green-400">Selected image: {reportFiles.image.name}</p>
                    )}
                  </div>
                </div>

                {detailMessage && (
                  <div
                    className={`p-3 rounded-lg ${
                      detailMessage.type === 'success'
                        ? 'bg-green-900 text-green-200'
                        : 'bg-red-900 text-red-200'
                    }`}
                  >
                    {detailMessage.text}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loadingDetail}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-4 py-2 rounded-lg font-semibold"
                  >
                    {loadingDetail ? 'Saving...' : 'Save Report Detail'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDetailEditor(false)}
                    className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-slate-400 py-8 text-center">No annual report selected.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
