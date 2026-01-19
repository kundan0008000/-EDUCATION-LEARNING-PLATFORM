import { Card, Breadcrumb } from '../../components/UI';
import { Button, Input } from '../../components/Form';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';

/**
 * Admin Profile Page Component
 */
export default function AdminProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: 'Administrator',
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Profile' }]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Administrator Profile</h1>
        <Button
          variant={isEditing ? 'secondary' : 'primary'}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="flex items-center gap-6">
          <div className="text-6xl">⚙️</div>
          <div>
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-primary-100">System Administrator</p>
          </div>
        </div>
      </Card>

      <Card title="Account Information">
        <div className="space-y-4">
          <Input
            label="Full Name"
            disabled={!isEditing}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Email"
            disabled={!isEditing}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Role"
            disabled
            value={formData.role}
          />
          {isEditing && (
            <Button variant="primary" className="w-full">
              Save Changes
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
