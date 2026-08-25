import React from 'react';
import DataManagerWithFiles from '../components/DataManagerWithFiles';
import { toAssetUrl } from '../../utils/api';

export default function ScholarshipsAdmin() {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    {
      key: 'deadline',
      label: 'Deadline',
      render: (item) => item.deadline ? new Date(item.deadline).toLocaleDateString() : '-',
    },
    { key: 'status', label: 'Status' },
    {
      key: 'image',
      label: 'Image',
      render: (item) => item.image ? (
        <img className="h-10 w-10 rounded border border-slate-200 object-cover" src={toAssetUrl(item.image)} alt={item.title} />
      ) : '-',
    },
  ];

  const formFields = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'deadline', label: 'Application Deadline', type: 'date' },
    { key: 'link', label: 'Application / Details Link', type: 'url' },
    {
      key: 'status', label: 'Visibility', type: 'select', required: true,
      options: [{ value: 'active', label: 'Active (public)' }, { value: 'draft', label: 'Draft (admin only)' }],
    },
  ];

  return <DataManagerWithFiles title="Scholarships" endpoint="scholarships" columns={columns} formFields={formFields} fileField={{ name: 'image', label: 'Announcement Image', accept: 'image/*' }} />;
}
