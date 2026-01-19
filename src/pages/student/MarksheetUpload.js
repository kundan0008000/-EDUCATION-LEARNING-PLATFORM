import { useState } from 'react';
import { Card, Breadcrumb } from '../../components/UI';
import { Button, Input, Textarea, Select } from '../../components/Form';
import { useAuthStore } from '../../stores/authStore';

export default function MarksheetUpload() {
  const { user } = useAuthStore();
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Student answers for personalized plan
  const [answers, setAnswers] = useState({
    learningStyle: '',
    hardSubject: '',
    difficultTopic: ''
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysis(null); // reset previous analysis
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a marksheet file.");
    if (!answers.learningStyle || !answers.hardSubject || !answers.difficultTopic) {
      return alert("Please answer all the questions.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("learningStyle", answers.learningStyle);
    formData.append("hardSubject", answers.hardSubject);
    formData.append("difficultTopic", answers.difficultTopic);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/marksheet-upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze marksheet.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Old Marksheet Upload' }]} />
      <h1 className="text-3xl font-bold text-gray-900">Old Marksheet Upload & Personalized Study Plan</h1>
      
      <Card title="Upload Marksheet">
        <div className="space-y-4">
          <Input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
        </div>
      </Card>

      <Card title="Answer Questions for Personalized Plan">
        <div className="space-y-4">
          <Select
            label="Aap kaise padhai karte ho?"
            name="learningStyle"
            value={answers.learningStyle}
            onChange={handleAnswerChange}
            options={[
              { value: 'video', label: 'Video Lectures' },
              { value: 'text', label: 'Reading/Notes' },
              { value: 'interactive', label: 'Interactive/Practice' }
            ]}
          />
          <Input
            label="Konsa subject aapko hard lagta hai?"
            name="hardSubject"
            value={answers.hardSubject}
            onChange={handleAnswerChange}
          />
          <Input
            label="Kis topic me zyada dikkat hoti hai?"
            name="difficultTopic"
            value={answers.difficultTopic}
            onChange={handleAnswerChange}
          />
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Generate Personalized Plan"}
          </Button>
        </div>
      </Card>

      {analysis && (
        <div className="space-y-6">
          <Card title="Weak Subjects">
            <ul className="list-disc ml-6">
              {analysis.weakSubjects?.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
          </Card>

          <Card title="Personalized Study Plan">
            <ul className="list-disc ml-6">
              {analysis.personalizedPlan &&
                Object.entries(analysis.personalizedPlan).map(([sub, plan]) => (
                  <li key={sub}>
                    <strong>{sub}:</strong> {plan}
                  </li>
                ))}
            </ul>
          </Card>

          <Card title="Recommended Resources">
            <ul className="list-disc ml-6">
              {analysis.resources &&
                Object.entries(analysis.resources).map(([sub, res]) => (
                  <li key={sub}>
                    <strong>{sub}:</strong> {res.join(', ')}
                  </li>
                ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
