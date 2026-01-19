import { useState, useEffect } from 'react';
import { Card, Breadcrumb } from '../../components/UI';
import { Textarea, Button } from '../../components/Form';
import { useAuthStore } from '../../stores/authStore';

export default function ProgressTracking() {
  const { user } = useAuthStore();
  const [weeklyReport, setWeeklyReport] = useState([]);
  const [improvementTips, setImprovementTips] = useState([]);
  const [doubt, setDoubt] = useState('');
  const [doubtAnswer, setDoubtAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch weekly performance report and improvement tips
    fetchWeeklyData();
  }, []);

  const fetchWeeklyData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/progress-report');
      const data = await res.json();
      setWeeklyReport(data.weeklyReport);
      setImprovementTips(data.improvementTips);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAskDoubt = async () => {
    if (!doubt) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doubt }),
      });
      const data = await res.json();
      setDoubtAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setDoubtAnswer('Failed to get answer.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Progress Tracking & Motivation' }]} />
      <h1 className="text-3xl font-bold text-gray-900">Progress Tracking & Motivation</h1>

      {/* Weekly Performance Report */}
      <Card title="Weekly Performance Report">
        <ul className="list-disc ml-6 space-y-2">
          {weeklyReport.length > 0 ? (
            weeklyReport.map((item, i) => (
              <li key={i}>
                Week {item.week}: {item.progress}%
              </li>
            ))
          ) : (
            <li>No data available yet.</li>
          )}
        </ul>
      </Card>

      {/* Improvement Tips */}
      <Card title="Improvement Tips">
        <ul className="list-disc ml-6 space-y-2">
          {improvementTips.length > 0 ? (
            improvementTips.map((tip, i) => <li key={i}>{tip}</li>)
          ) : (
            <li>No tips yet.</li>
          )}
        </ul>
      </Card>

      {/* AI-based Doubt Solving */}
      <Card title="AI-based Doubt Solving">
        <Textarea
          label="Ask a question or doubt"
          rows={3}
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
        />
        <Button variant="primary" onClick={handleAskDoubt} disabled={loading}>
          {loading ? 'Solving...' : 'Get Answer'}
        </Button>
        {doubtAnswer && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <strong>Answer:</strong>
            <p>{doubtAnswer}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
