import { useState } from 'react';
import { Card, Breadcrumb } from '../../components/UI';
import { Button, Input, Textarea, Select } from '../../components/Form';
import { useNavigate } from 'react-router-dom';
import { useCourseStore } from '../../stores/courseStore';
import toast from 'react-hot-toast';
import { Plus, Trash2, Download } from 'lucide-react';

/**
 * Create Course Page Component
 * Form for creating new courses with video lectures and materials
 */
export default function CreateCourse() {
  const navigate = useNavigate();
  const { createCourse } = useCourseStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    duration: '',
    capacity: '',
    thumbnail: '📚',
  });

  const [lectures, setLectures] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [lectureForm, setLectureForm] = useState({ 
    title: '', 
    url: '', 
    file: null,
    duration: '',
    uploadType: 'url' // 'url' or 'file'
  });
  const [materialForm, setMaterialForm] = useState({ 
    title: '', 
    url: '',
    file: null,
    uploadType: 'url' // 'url' or 'file'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.duration || parseInt(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }
    if (!formData.capacity || parseInt(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const addLecture = async () => {
    if (!lectureForm.title.trim()) {
      toast.error('Please fill in lecture title');
      return;
    }

    if (lectureForm.uploadType === 'url') {
      if (!lectureForm.url.trim()) {
        toast.error('Please fill in video URL');
        return;
      }
    } else {
      if (!lectureForm.file) {
        toast.error('Please select a video file');
        return;
      }
      if (!lectureForm.file.type.startsWith('video/')) {
        toast.error('Please select a valid video file');
        return;
      }
    }

    let lectureData = {
      id: Date.now(),
      title: lectureForm.title,
      duration: lectureForm.duration || 0,
      uploadType: lectureForm.uploadType,
    };

    if (lectureForm.uploadType === 'url') {
      lectureData.url = lectureForm.url;
      lectureData.fileName = null;
    } else {
      // Convert file to base64 for storage
      try {
        const base64 = await convertFileToBase64(lectureForm.file);
        lectureData.fileData = base64;
        lectureData.fileName = lectureForm.file.name;
        lectureData.fileSize = lectureForm.file.size;
        lectureData.url = null;
      } catch (error) {
        toast.error('Failed to process video file');
        return;
      }
    }

    setLectures([...lectures, lectureData]);
    setLectureForm({ title: '', url: '', file: null, duration: '', uploadType: 'url' });
    toast.success('Lecture added');
  };

  const removeLecture = (id) => {
    setLectures(lectures.filter((l) => l.id !== id));
  };

  const addMaterial = async () => {
    if (!materialForm.title.trim()) {
      toast.error('Please fill in material name');
      return;
    }

    if (materialForm.uploadType === 'url') {
      if (!materialForm.url.trim()) {
        toast.error('Please fill in file URL');
        return;
      }
    } else {
      if (!materialForm.file) {
        toast.error('Please select a file');
        return;
      }
      if (!materialForm.file.type.includes('pdf') && !materialForm.file.type.includes('document')) {
        toast.error('Please select a PDF or document file');
        return;
      }
    }

    let materialData = {
      id: Date.now(),
      title: materialForm.title,
      uploadType: materialForm.uploadType,
      type: materialForm.uploadType === 'url' 
        ? (materialForm.url.endsWith('.pdf') ? 'pdf' : 'notes')
        : (materialForm.file.type.includes('pdf') ? 'pdf' : 'document'),
    };

    if (materialForm.uploadType === 'url') {
      materialData.url = materialForm.url;
      materialData.fileName = null;
    } else {
      // Convert file to base64 for storage
      try {
        const base64 = await convertFileToBase64(materialForm.file);
        materialData.fileData = base64;
        materialData.fileName = materialForm.file.name;
        materialData.fileSize = materialForm.file.size;
        materialData.url = null;
      } catch (error) {
        toast.error('Failed to process file');
        return;
      }
    }

    setMaterials([...materials, materialData]);
    setMaterialForm({ title: '', url: '', file: null, uploadType: 'url' });
    toast.success('Material added');
  };

  const removeMaterial = (id) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    try {
      await createCourse({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        level: formData.level,
        duration: parseInt(formData.duration),
        capacity: parseInt(formData.capacity),
        thumbnail: formData.thumbnail,
        instructor: 'Current Instructor',
        lectures,
        materials,
      });

      toast.success('Course created successfully!');
      navigate('/instructor/courses');
    } catch (error) {
      toast.error('Failed to create course');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Courses', href: '/instructor/courses' },
          { label: 'Create Course' },
        ]}
      />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
        <p className="text-gray-600">Share your expertise with students around the world</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {/* Basic Info Tab */}
        <Card title="Course Information">
          <div className="space-y-4">
            <Input
              label="Course Title"
              placeholder="Enter course title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
            />

            <Textarea
              label="Description"
              placeholder="Describe your course..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={errors.description}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                options={[
                  { value: '', label: 'Select a category' },
                  { value: 'Frontend', label: 'Frontend Development' },
                  { value: 'Backend', label: 'Backend Development' },
                  { value: 'Design', label: 'Design' },
                  { value: 'Full Stack', label: 'Full Stack' },
                ]}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                error={errors.category}
              />

              <Select
                label="Level"
                options={[
                  { value: 'Beginner', label: 'Beginner' },
                  { value: 'Intermediate', label: 'Intermediate' },
                  { value: 'Advanced', label: 'Advanced' },
                ]}
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Duration (weeks)"
                type="number"
                placeholder="e.g., 12"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                error={errors.duration}
              />

              <Input
                label="Student Capacity"
                type="number"
                placeholder="e.g., 100"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                error={errors.capacity}
              />
            </div>
          </div>
        </Card>

        {/* Video Lectures */}
        <Card title="Video Lectures" subtitle="Add video lectures for your course">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <Input
                label="Lecture Title"
                placeholder="e.g., Introduction to React"
                value={lectureForm.title}
                onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
              />

              {/* Upload Type Toggle */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="lectureType"
                    value="url"
                    checked={lectureForm.uploadType === 'url'}
                    onChange={(e) => setLectureForm({ ...lectureForm, uploadType: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Video URL</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="lectureType"
                    value="file"
                    checked={lectureForm.uploadType === 'file'}
                    onChange={(e) => setLectureForm({ ...lectureForm, uploadType: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Upload Video</span>
                </label>
              </div>

              {lectureForm.uploadType === 'url' ? (
                <Input
                  label="Video URL"
                  placeholder="e.g., https://youtube.com/watch?v=..."
                  value={lectureForm.url}
                  onChange={(e) => setLectureForm({ ...lectureForm, url: e.target.value })}
                />
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Video File
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setLectureForm({ ...lectureForm, file: e.target.files?.[0] || null })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {lectureForm.file && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {lectureForm.file.name}
                    </p>
                  )}
                </div>
              )}

              <Input
                label="Duration (minutes)"
                type="number"
                placeholder="e.g., 45"
                value={lectureForm.duration}
                onChange={(e) => setLectureForm({ ...lectureForm, duration: e.target.value })}
              />
              <Button
                type="button"
                variant="primary"
                onClick={addLecture}
                className="gap-2 w-full"
              >
                <Plus size={18} />
                Add Lecture
              </Button>
            </div>

            {lectures.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Lectures Added ({lectures.length})</h4>
                {lectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{lecture.title}</p>
                      <p className="text-sm text-gray-600">
                        {lecture.duration} minutes • {lecture.uploadType === 'url' ? 'URL' : 'Uploaded'}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeLecture(lecture.id)}
                      className="text-danger-600 hover:bg-danger-50"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Study Materials */}
        <Card title="Study Materials" subtitle="Add PDFs and notes for students">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <Input
                label="Material Title"
                placeholder="e.g., React Cheat Sheet"
                value={materialForm.title}
                onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
              />

              {/* Upload Type Toggle */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="materialType"
                    value="url"
                    checked={materialForm.uploadType === 'url'}
                    onChange={(e) => setMaterialForm({ ...materialForm, uploadType: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">File URL</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="materialType"
                    value="file"
                    checked={materialForm.uploadType === 'file'}
                    onChange={(e) => setMaterialForm({ ...materialForm, uploadType: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Upload File</span>
                </label>
              </div>

              {materialForm.uploadType === 'url' ? (
                <Input
                  label="File URL"
                  placeholder="e.g., https://example.com/pdf-file.pdf"
                  value={materialForm.url}
                  onChange={(e) => setMaterialForm({ ...materialForm, url: e.target.value })}
                />
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select PDF or Document File
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setMaterialForm({ ...materialForm, file: e.target.files?.[0] || null })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {materialForm.file && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {materialForm.file.name}
                    </p>
                  )}
                </div>
              )}

              <Button
                type="button"
                variant="primary"
                onClick={addMaterial}
                className="gap-2 w-full"
              >
                <Plus size={18} />
                Add Material
              </Button>
            </div>

            {materials.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Materials Added ({materials.length})</h4>
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Download size={18} className="text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900">{material.title}</p>
                        <p className="text-xs text-gray-600">
                          {material.type?.toUpperCase()} • {material.uploadType === 'url' ? 'URL' : 'Uploaded'}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeMaterial(material.id)}
                      className="text-danger-600 hover:bg-danger-50"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-2">
          <Button 
            type="submit" 
            variant="primary" 
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Course'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => navigate('/instructor/courses')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
