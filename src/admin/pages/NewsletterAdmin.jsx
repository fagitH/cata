import React from 'react';
import DataManagerWithFiles from '../components/DataManagerWithFiles';

export default function NewsletterAdmin() {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    {
      key: 'image_url',
      label: 'Image',
      render: (item) => item.image_url || item.pdf_url ? 'Uploaded' : '-',
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (item) => item.created_at ? new Date(item.created_at).toLocaleDateString() : '-',
    },
  ];

  return (
    <DataManagerWithFiles
      title="Newsletter"
      endpoint="newsletters"
      columns={columns}
      formFields={[
        { key: 'title', label: 'Newsletter Title (optional)', type: 'text' },
      ]}
      fileFields={[
        { name: 'file[]', label: 'Newsletter Images (select multiple)', accept: 'image/*', multiple: true },
      ]}
    />
  );
}
