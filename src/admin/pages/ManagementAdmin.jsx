import DataManagerWithFiles from '../components/DataManagerWithFiles.jsx';
import { toAssetUrl } from '../../utils/api.js';

export default function ManagementAdmin() {
  return (
    <DataManagerWithFiles
      title="Management Level"
      endpoint="management_members"
      columns={[
        { key: 'sort_order', label: 'Order' },
        { key: 'name', label: 'Name' },
        { key: 'title', label: 'Position' },
        { key: 'image', label: 'Photo', render: (item) => item.image ? <img src={toAssetUrl(item.image)} alt={item.name} className="h-10 w-10 rounded-full object-cover" /> : '—' },
      ]}
      formFields={[
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'title', label: 'Position', type: 'text', required: true },
        { key: 'bio', label: 'Biography', type: 'textarea' },
        { key: 'sort_order', label: 'Display order', type: 'number', required: true },
      ]}
      fileField={{ name: 'image', label: 'Profile photo', accept: 'image/*' }}
    />
  );
}
