import DataManagerWithFiles from '../components/DataManagerWithFiles.jsx';
import { toAssetUrl } from '../../utils/api.js';

export default function PartnersAdmin() {
  return (
    <DataManagerWithFiles
      title="Partners"
      endpoint="partners"
      columns={[
        { key: 'sort_order', label: 'Order' },
        { key: 'name', label: 'Name' },
        {
          key: 'type',
          label: 'Type',
          render: (item) => {
            const labels = {
              organization: 'Organization',
              company: 'Company',
              international: 'International',
            };
            return labels[item.type] ?? item.type;
          },
        },
        {
          key: 'logo',
          label: 'Logo',
          render: (item) =>
            item.logo ? (
              <img
                src={toAssetUrl(item.logo)}
                alt={item.name}
                className="h-10 w-auto rounded object-contain"
                onError={(e) => (e.target.style.display = 'none')}
              />
            ) : (
              '—'
            ),
        },
      ]}
      formFields={[
        { key: 'name', label: 'Partner Name', type: 'text', required: true },
        {
          key: 'type',
          label: 'Partner Type',
          type: 'select',
          required: true,
          options: [
            { value: 'organization', label: 'Organization (Local)' },
            { value: 'company', label: 'Company (Local)' },
            { value: 'international', label: 'International' },
          ],
        },
        { key: 'sort_order', label: 'Display Order', type: 'number', required: true },
      ]}
      fileField={{ name: 'logo', label: 'Partner Logo', accept: 'image/*' }}
    />
  );
}
