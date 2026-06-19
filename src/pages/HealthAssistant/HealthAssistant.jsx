import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Heart, AlertTriangle, UserRound, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HealthAssistant.css';

const HealthAssistant = () => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleClear = () => {
    setSymptoms('');
    setResult(null);
    setError(false);
  };

  const parseResponse = (text) => {
    const sections = {
      causes: '',
      specialist: '',
      urgency: '',
      steps: '',
      attention: ''
    };

    const extractSection = (regex) => {
      const match = text.match(regex);
      return match ? match[1].trim() : '';
    };

    sections.causes = extractSection(/Possible Causes:\s*([\s\S]*?)(?=\n\n(?:Recommended Specialist|Urgency Level|Suggested Next Steps|When To Seek Medical Attention):|$)/i);
    sections.specialist = extractSection(/Recommended Specialist:\s*([\s\S]*?)(?=\n\n(?:Possible Causes|Urgency Level|Suggested Next Steps|When To Seek Medical Attention):|$)/i);
    sections.urgency = extractSection(/Urgency Level:\s*([\s\S]*?)(?=\n\n(?:Possible Causes|Recommended Specialist|Suggested Next Steps|When To Seek Medical Attention):|$)/i);
    sections.steps = extractSection(/Suggested Next Steps:\s*([\s\S]*?)(?=\n\n(?:Possible Causes|Recommended Specialist|Urgency Level|When To Seek Medical Attention):|$)/i);
    sections.attention = extractSection(/When To Seek Medical Attention:\s*([\s\S]*?)(?=\n\n(?:Possible Causes|Recommended Specialist|Urgency Level|Suggested Next Steps):|$)/i);

    // Fallback if the format wasn't strictly followed
    if (!sections.causes && !sections.specialist && !sections.urgency && !sections.steps && !sections.attention) {
      sections.causes = text;
    }

    return sections;
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    
    setLoading(true);
    setError(false);
    setResult(null);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    const systemPrompt = `You are DocCare Health Assistant.
You are NOT a doctor.
Provide healthcare guidance only.
Never provide definitive diagnosis.
Always recommend consulting a medical professional for serious symptoms.
If symptoms indicate emergency situations such as:
* Chest pain
* Difficulty breathing
* Stroke symptoms
* Severe bleeding
* Loss of consciousness
Immediately instruct the user to seek emergency medical care.

Respond exactly in this format:

Possible Causes:
[Your response]

Recommended Specialist:
[Your response]

Urgency Level:
[Low / Moderate / High]

Suggested Next Steps:
[Your response]

When To Seek Medical Attention:
[Your response]`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: [{
            parts: [{ text: symptoms }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('API Request Failed');
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      
      setResult(parseResponse(text));
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderSpecialistButton = (specialistText) => {
    if (!specialistText) return null;
    
    const textLower = specialistText.toLowerCase();
    let filter = null;
    let label = '';

    if (textLower.includes('cardiology') || textLower.includes('cardiologist')) {
      filter = 'Cardiology Specialist';
      label = 'Cardiologists';
    } else if (textLower.includes('neurology') || textLower.includes('neurologist')) {
      filter = 'Neurology';
      label = 'Neurologists';
    } else if (textLower.includes('dermatology') || textLower.includes('dermatologist')) {
      filter = 'Dermatology';
      label = 'Dermatologists';
    }

    if (!filter) return null;

    return (
      <button 
        className="specialist-action-btn"
        onClick={() => navigate(`/specialists?specialty=${encodeURIComponent(filter)}`)}
      >
        View {label}
      </button>
    );
  };

  return (
    <div className="health-assistant-page">
      <div className="container">
        
        {/* HERO SECTION */}
        <div className="ha-hero animate-fade-in-up stagger-1">
          <div className="badge badge-gold">AI Assistant</div>
          <h1 className="ha-title text-display-md">
            DocCare Health Assistant
          </h1>
          <p className="ha-subtitle text-subheading">
            Describe your symptoms and receive personalized healthcare guidance in seconds.
          </p>
        </div>

        {/* INPUT AREA */}
        <div className="ha-input-container animate-fade-in-up stagger-2">
          <textarea
            className="ha-textarea"
            placeholder="Example: I have a headache, fever, and sore throat for 2 days."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            disabled={loading}
          />
          <div className="ha-actions">
            <button 
              className="btn btn-outline" 
              onClick={handleClear}
              disabled={loading || !symptoms}
            >
              Clear
            </button>
            <button 
              className="btn btn-gold ha-analyze-btn" 
              onClick={analyzeSymptoms}
              disabled={loading || !symptoms.trim()}
            >
              Analyze Symptoms
            </button>
          </div>
        </div>

        {/* LOADING STATE */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              className="ha-loading"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="ha-pulse"></div>
              <p>Analyzing symptoms...<br/>Please wait.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ERROR STATE */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="ha-error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AlertTriangle size={24} color="#ef4444" />
              <p>We couldn't analyze your symptoms right now. Please try again.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULT UI */}
        <AnimatePresence>
          {result && !loading && !error && (
            <motion.div 
              className="ha-result-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              
              {/* Urgency Level */}
              {result.urgency && (
                <div className="ha-card ha-card-urgency">
                  <div className="ha-card-header">
                    <Activity size={20} className="ha-icon" />
                    <h3>Urgency Level</h3>
                  </div>
                  <div className="ha-card-body">
                    <p className={`ha-urgency-text ${result.urgency.toLowerCase().includes('high') ? 'ha-high' : ''}`}>
                      {result.urgency}
                    </p>
                  </div>
                </div>
              )}

              {/* Possible Causes */}
              {result.causes && (
                <div className="ha-card ha-card-causes">
                  <div className="ha-card-header">
                    <Heart size={20} className="ha-icon" />
                    <h3>Possible Causes</h3>
                  </div>
                  <div className="ha-card-body">
                    <p>{result.causes}</p>
                  </div>
                </div>
              )}

              {/* Recommended Specialist */}
              {result.specialist && (
                <div className="ha-card ha-card-specialist">
                  <div className="ha-card-header">
                    <UserRound size={20} className="ha-icon" />
                    <h3>Recommended Specialist</h3>
                  </div>
                  <div className="ha-card-body">
                    <p>{result.specialist}</p>
                    {renderSpecialistButton(result.specialist)}
                  </div>
                </div>
              )}

              {/* Suggested Next Steps */}
              {result.steps && (
                <div className="ha-card ha-card-steps">
                  <div className="ha-card-header">
                    <Calendar size={20} className="ha-icon" />
                    <h3>Suggested Next Steps</h3>
                  </div>
                  <div className="ha-card-body">
                    <p>{result.steps}</p>
                  </div>
                </div>
              )}

              {/* When To Seek Medical Attention */}
              {result.attention && (
                <div className="ha-card ha-card-attention">
                  <div className="ha-card-header">
                    <AlertTriangle size={20} className="ha-icon ha-icon-alert" />
                    <h3>When To Seek Medical Attention</h3>
                  </div>
                  <div className="ha-card-body">
                    <p>{result.attention}</p>
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default HealthAssistant;
