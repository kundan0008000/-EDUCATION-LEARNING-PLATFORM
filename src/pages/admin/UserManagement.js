import { useState } from 'react';
import { Card, Breadcrumb, Tabs, Badge } from '../../components/UI';
import { Button } from '../../components/Form';
import { Search, Edit, Trash2 } from 'lucide-react';

/**
 * User Management Page Component
 * Admin panel for managing all users
 */
export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState([
    {
      id: 1,
      name: 'Gautam Govind',
      email: 'gautam@example.com',
      role: 'Student',
      status: 'Active',
      joinDate: '2025-11-01',
    },
    {
      id: 2,
      name: 'kundan kumar',
      email: 'kundan@example.com',
      role: 'Instructor',
      status: 'Pending',
      joinDate: '2025-11-15',
    },
    {
      id: 3,
      name: 'Balwant singh',
      email: 'balwant@example.com',
      role: 'Student',
      status: 'Active',
      joinDate: '2025-10-20',
    },
  ]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeUsers = filteredUsers.filter((u) => u.status === 'Active');
  const pendingUsers = filteredUsers.filter((u) => u.status === 'Pending');

  const UserTable = ({ users }) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left px-4 py-3 font-semibold text-gray-900">Name</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-900">Email</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-900">Role</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-900">Status</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-900">Join Date</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-900">{user.name}</td>
              <td className="px-4 py-3 text-gray-600">{user.email}</td>
              <td className="px-4 py-3">
                <Badge label={user.role} variant="primary" />
              </td>
              <td className="px-4 py-3">
                <Badge
                  label={user.status}
                  variant={user.status === 'Active' ? 'success' : 'warning'}
                />
              </td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(user.joinDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 size={16} className="text-danger-600" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'User Management' }]} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">{filteredUsers.length} users total</p>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Tabs */}
      <Tabs
        tabs={[
          {
            label: `Active (${activeUsers.length})`,
            content: <UserTable users={activeUsers} />,
          },
          {
            label: `Pending Approval (${pendingUsers.length})`,
            content: <UserTable users={pendingUsers} />,
          },
        ]}
      />
    </div>
  );
}
