import React, { useEffect, useState } from 'react';
import DataManagerWithFiles from '../components/DataManagerWithFiles';
import { api, toAssetUrl } from '../../utils/api';

export default function ReportItemsAdmin() {
  const [annualReports, setAnnualReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await api.get('/annual_reports');
        setAnnualReports(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch annual reports:', error);
      }
    };
    fetchReports();
  }, []);

  const columns = [
    { key: 'id', label: 'ID' },
    {
      key: 'report_id',
      label: 'Annual Report',
      render: (item) => {
        if (String(item.report_id).toLowerCase() === 'all') {
          return 'All Annual Reports';
        }
        const report = annualReports.find(r => r.id === parseInt(item.report_id));
        return report ? report.title : item.report_id || '-';
      },
    },
    {
      key: 'image',
      label: 'Image',
      render: (item) => {
        const imageUrl = toAssetUrl(item.image);
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="thumbnail"
            className="h-10 w-10 rounded object-cover"
            onError={(e) => (e.target.src = '/placeholder.png')}
          />
        ) : (
          <span className="text-slate-500">-</span>
        );
      },
    },
    {
      key: 'description',
      label: 'Description',
      render: (item) => String(item.description || '').substring(0, 50) + '...',
    },
    { key: 'amount', label: 'Amount' },
    { key: 'tag', label: 'Tag' },
  ];

  const fields = [
    {
      key: 'report_id',
      label: 'Annual Report',
      type: 'select',
      options: [
        { value: 'all', label: 'All Annual Reports' },
        ...annualReports.map(report => ({
          value: report.id,
          label: report.title,
        })),
      ],
      required: true,
    },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'amount', label: 'Amount', type: 'text', placeholder: 'e.g., KHR 10,000,000', required: true },
    { key: 'tag', label: 'Tag', type: 'text', placeholder: 'e.g., Refugee Relief' },
  ];

  const formFields = fields;

  const fileFields = [
    { name: 'image', label: 'Image', accept: 'image/*' },
  ];

  return (
    <DataManagerWithFiles
      title="Report Items"
      endpoint="report_items"
      columns={columns}
      formFields={formFields}
      fileFields={fileFields}
    />
  );
}
