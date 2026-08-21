import DataManagerWithFiles from '../components/DataManagerWithFiles.jsx';
import { toAssetUrl } from '../../utils/api.js';

export default function SecretariatAdmin() {
  const columns = [
    { key: 'sort_order', label: 'Order' },
    { key: 'name', label: 'Name' },
    { key: 'title', label: 'Position' },
    {
      key: 'image',
      label: 'Photo',
      render: (item) => item.image ? <img src={toAssetUrl(item.image)} alt={item.name} className="h-10 w-10 rounded-full object-cover" /> : '—',
    },
  ];

  return (
    <DataManagerWithFiles
      title="Secretariat"
      endpoint="secretariat_members"
      columns={columns}
      formFields={[
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'title', label: 'Position', type: 'text', required: true },
        { key: 'role', label: 'Responsibility', type: 'textarea' },
        { key: 'sort_order', label: 'Display order', type: 'number', required: true },
      ]}
      fileField={{ name: 'image', label: 'Profile photo', accept: 'image/*' }}
    />
  );
}
