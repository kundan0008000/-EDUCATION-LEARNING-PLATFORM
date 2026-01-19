import { Card, Breadcrumb } from '../../components/UI';
import { Button, Input, Textarea } from '../../components/Form';
import { useAuthStore } from '../../stores/authStore';
import { useState } from 'react';

/**
 * Instructor Profile Page Component
 */
export default function InstructorProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Expert instructor with years of experience',
    expertise: 'React, JavaScript, Web Development',
    qualifications: 'MS Computer Science',
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Profile' }]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Instructor Profile</h1>
        <Button
          variant={isEditing ? 'secondary' : 'primary'}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="flex items-center gap-6">
          <div className="text-6xl">👨‍🏫</div>
          <div>
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-primary-100">Verified Instructor • 245+ students</p>
          </div>
        </div>
      </Card>

      <Card title="Professional Information">
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
          <Textarea
            label="Professional Bio"
            disabled={!isEditing}
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
          <Input
            label="Areas of Expertise"
            disabled={!isEditing}
            value={formData.expertise}
            onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
          />
          <Input
            label="Qualifications"
            disabled={!isEditing}
            value={formData.qualifications}
            onChange={(e) =>
              setFormData({ ...formData, qualifications: e.target.value })
            }
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
