import DataManagerWithFiles from '../components/DataManagerWithFiles.jsx';
import { toAssetUrl } from '../../utils/api.js';

export default function ShariahAdvisoryAdmin() {
  return <DataManagerWithFiles title="Shariah Advisory Committee" endpoint="shariah_advisory_members"
    columns={[
      { key: 'sort_order', label: 'Order' },
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'image', label: 'Photo', render: (item) => item.image ? <img src={toAssetUrl(item.image)} alt={item.name} className="h-10 w-10 rounded-full object-cover" /> : '—' },
    ]}
    formFields={[
      { key: 'name', label: 'Full name', type: 'text', required: true },
      { key: 'role', label: 'Role', type: 'textarea' },
      { key: 'education', label: 'Education (one item per line)', type: 'textarea' },
      { key: 'sort_order', label: 'Display order', type: 'number', required: true },
    ]}
    fileField={{ name: 'image', label: 'Profile photo', accept: 'image/*' }}
  />;
}
