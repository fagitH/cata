import React from 'react';
import DataManagerWithFiles from '../components/DataManagerWithFiles';
import { toAssetUrl } from '../../utils/api';

export default function BannersAdmin() {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    {
      key: 'description',
      label: 'Description',
      render: (item) => String(item.description || '').substring(0, 50) + '...',
    },
    {
      key: 'image',
      label: 'Image',
      render: (item) => {
        const imageUrl = toAssetUrl(item.image);
        return (
          <img
            src={imageUrl}
            alt={item.title}
            className="h-10 w-10 rounded object-cover"
            onError={(e) => (e.target.src = '/placeholder.png')}
          />
        );
      },
    },
    { key: 'link', label: 'Link' },
  ];

  const formFields = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'link', label: 'Link/Button URL', type: 'text' },
  ];

  const fileField = {
    name: 'image',
    label: 'Banner Image',
    accept: 'image/*',
  };

  return (
    <DataManagerWithFiles
      title="Banners"
      endpoint="banners"
      columns={columns}
      formFields={formFields}
      fileField={fileField}
    />
  );
}
