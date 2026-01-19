import { useState, useEffect } from 'react';
import { Card, Breadcrumb, Tabs } from '../../components/UI';
import { Button, Input, Textarea } from '../../components/Form';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Save, Trash2, Download } from 'lucide-react';
import { useCourseStore } from '../../stores/courseStore';
import toast from 'react-hot-toast';

/**
 * Course Edit Page Component
 * Edit course details, video lectures, and study materials
 */
export default function CourseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, updateCourse } = useCourseStore();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [lectures, setLectures] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [lectureForm, setLectureForm] = useState({ 
    title: '', 
    url: '', 
    file: null,
    duration: '',
    uploadType: 'url'
  });
  const [materialForm, setMaterialForm] = useState({ 
    title: '', 
    url: '',
    file: null,
    uploadType: 'url'
  });

  const [modules] = useState([
    { id: 1, title: 'Getting Started with React', lessons: 5 },
    { id: 2, title: 'Components and Props', lessons: 8 },
  ]);

  useEffect(() => {
    const course = courses.find((c) => c.id === parseInt(id));
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
      });
      setLectures(course.lectures || []);
      setMaterials(course.materials || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  const removeLecture = (lectureId) => {
    setLectures(lectures.filter((l) => l.id !== lectureId));
    toast.success('Lecture removed');
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

  const removeMaterial = (materialId) => {
    setMaterials(materials.filter((m) => m.id !== materialId));
    toast.success('Material removed');
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateCourse(parseInt(id), {
        title: formData.title,
        description: formData.description,
        lectures,
        materials,
      });
      toast.success('Course updated successfully!');
      navigate('/instructor/courses');
    } catch (error) {
      toast.error('Failed to update course');
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
          { label: formData.title },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>

      <Tabs
        tabs={[
          {
            label: 'Course Details',
            content: (
              <form className="max-w-2xl space-y-4">
                <Input
                  label="Course Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <Textarea
                  label="Description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <Button 
                  variant="primary" 
                  className="gap-2"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  <Save size={18} />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            ),
          },
          {
            label: 'Video Lectures',
            content: (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold text-gray-900">Add New Lecture</h3>
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
                    variant="primary"
                    onClick={addLecture}
                    className="gap-2 w-full"
                  >
                    <Plus size={18} />
                    Add Lecture
                  </Button>
                </div>

                {lectures.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Lectures ({lectures.length})</h3>
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
            ),
          },
          {
            label: 'Study Materials',
            content: (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold text-gray-900">Add New Material</h3>
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
                    variant="primary"
                    onClick={addMaterial}
                    className="gap-2 w-full"
                  >
                    <Plus size={18} />
                    Add Material
                  </Button>
                </div>

                {materials.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Materials ({materials.length})</h3>
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
            ),
          },
          {
            label: 'Modules & Lessons',
            content: (
              <div className="space-y-4">
                {modules.map((module) => (
                  <Card key={module.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.lessons} lessons</p>
                      </div>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </div>
                  </Card>
                ))}
                <Button variant="primary" className="gap-2">
                  <Plus size={18} />
                  Add Module
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
