import { useCallback, useEffect, useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import { api } from '../../utils/api.js';

const emptyForm = { name: '', email: '', password: '', password_confirmation: '' };

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setUsers(await api.get('/admin/users'));
    } catch (requestError) {
      setError(requestError.message || 'Unable to load users.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const createUser = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      await api.post('/admin/users', form);
      setForm(emptyForm);
      setSuccess('Admin user created. They can now sign in with their email and password.');
      await loadUsers();
    } catch (requestError) {
      setError(requestError.message || 'Unable to create user.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="mt-2 text-gray-500">Create content-admin accounts. They can sign in, but cannot manage users.</p>
      </div>

      <form onSubmit={createUser} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-700"><UserPlus size={22} /></div>
          <h2 className="text-lg font-semibold text-gray-900">Create admin user</h2>
        </div>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" value={form.name} onChange={updateField} autoComplete="name" />
          <Field label="Email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" />
          <Field label="Password" name="password" type="password" value={form.password} onChange={updateField} autoComplete="new-password" />
          <Field label="Confirm password" name="password_confirmation" type="password" value={form.password_confirmation} onChange={updateField} autoComplete="new-password" />
        </div>
        <button disabled={saving} className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          {saving ? 'Creating…' : 'Create admin user'}
        </button>
      </form>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4">
          <Users size={21} className="text-gray-600" />
          <h2 className="font-semibold text-gray-900">Accounts</h2>
        </div>
        {loading ? <p className="p-6 text-sm text-gray-500">Loading users…</p> : (
          <div className="overflow-x-auto"><table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600"><tr><th className="px-6 py-3 font-semibold">Name</th><th className="px-6 py-3 font-semibold">Email</th><th className="px-6 py-3 font-semibold">Role</th></tr></thead>
            <tbody>{users.map((user) => <tr key={user.id} className="border-t border-gray-100"><td className="px-6 py-4 font-medium text-gray-900">{user.name}</td><td className="px-6 py-4 text-gray-600">{user.email}</td><td className="px-6 py-4"><span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">{user.role === 'super_admin' ? 'Super admin' : 'Admin'}</span></td></tr>)}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
}

function Field({ label, type = 'text', ...props }) {
  return <label className="block text-sm font-medium text-gray-700">{label}<input required type={type} {...props} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></label>;
}
