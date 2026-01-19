import { useState } from 'react';
import { Card, Breadcrumb } from '../../components/UI';
import { Button, Input, Textarea, Select } from '../../components/Form';
import { useAuthStore } from '../../stores/authStore';


export default function StudentProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA',
    bio: 'Passionate learner exploring web development',
    interests: 'React, JavaScript, Web Design',
  });

  const [certificates] = useState([
    { id: 1, title: 'Web Design Fundamentals', date: '2025-11-15', icon: '📜' },
    { id: 2, title: 'JavaScript Basics', date: '2025-10-20', icon: '📜' },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // API call would happen here
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Profile' }]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <Button
          variant={isEditing ? 'secondary' : 'primary'}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="flex items-center gap-6">
          <div className="text-6xl">👤</div>
          <div>
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-primary-100">Student • Member since Nov 2025</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Personal Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  label="Email"
                  type="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone"
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <Input
                  label="Location"
                  disabled={!isEditing}
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              <Textarea
                label="Bio"
                disabled={!isEditing}
                rows={4}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />

              <Input
                label="Interests"
                disabled={!isEditing}
                value={formData.interests}
                onChange={(e) =>
                  setFormData({ ...formData, interests: e.target.value })
                }
              />

              {isEditing && (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              )}
            </div>
          </Card>

          {/* Learning Preferences */}
          <Card title="Learning Preferences">
            <div className="space-y-4">
              <Select
                label="Preferred Learning Style"
                options={[
                  { value: 'video', label: 'Video Lectures' },
                  { value: 'text', label: 'Text & Reading' },
                  { value: 'interactive', label: 'Interactive' },
                ]}
                disabled={!isEditing}
              />
              <Select
                label="Notification Frequency"
                options={[
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                ]}
                disabled={!isEditing}
              />
            </div>
          </Card>

          {/* Security */}
          <Card title="Security Settings">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Password</h4>
                  <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                </div>
                <Button variant="secondary" size="sm">
                  Change Password
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Not enabled</p>
                </div>
                <Button variant="secondary" size="sm">
                  Enable
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Stats */}
          <Card title="Learning Stats">
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-gray-200">
                <p className="text-3xl font-bold text-primary-600">65%</p>
                <p className="text-sm text-gray-600">Overall Progress</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Hours Learned</p>
                <p className="text-2xl font-bold text-gray-900">24.5</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Certificates</p>
                <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
              </div>
            </div>
          </Card>

          {/* Certificates */}
          <Card title="Certificates">
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-2xl">{cert.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {cert.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(cert.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    ↓
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card title="Achievements">
            <div className="grid grid-cols-3 gap-2 text-center">
              {['🌟', '🔥', '⭐', '💪', '🎯', '🚀'].map((emoji, i) => (
                <div
                  key={i}
                  className="text-2xl p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                  title={`Achievement ${i + 1}`}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
