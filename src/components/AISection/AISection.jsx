import { useState } from 'react';
import './AISection.css';

const insights = [
  {
    id: 'risk-analysis',
    label: 'Risk Analysis',
    title: 'Predictive Health Risk Assessment',
    description: 'Our AI analyzes 200+ biomarkers to predict potential health risks up to 5 years in advance — enabling preventive care before symptoms emerge.',
    metrics: [
      { label: 'Accuracy', value: '97.3%' },
      { label: 'Early Detection', value: '5 Years' },
      { label: 'Biomarkers', value: '200+' },
    ],
  },
  {
    id: 'diagnostics',
    label: 'Smart Diagnostics',
    title: 'AI-Powered Diagnostic Intelligence',
    description: 'Upload lab results, imaging, or symptom data. Our diagnostic AI provides instant, physician-reviewed interpretations with actionable insights.',
    metrics: [
      { label: 'Diagnoses', value: '1.2M+' },
      { label: 'Response', value: '<30s' },
      { label: 'Accuracy', value: '99.1%' },
    ],
  },
  {
    id: 'personalized',
    label: 'Personalized Plans',
    title: 'Adaptive Health Optimization',
    description: 'Receive a continuously updating health plan that adapts to your biometric data, lifestyle changes, and medical history in real-time.',
    metrics: [
      { label: 'Data Points', value: '50K+' },
      { label: 'Updates', value: 'Daily' },
      { label: 'Specialists', value: '500+' },
    ],
  },
];

const AISection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const active = insights[activeTab];

  return (
    <section className="ai-section section" id="ai">
      <div className="ai-bg-glow" />
      <div className="container">
        <div className="ai-layout">
          {/* Left — Content */}
          <div className="ai-content">
            <div className="badge badge-gold">AI Health Intelligence</div>

            <h2 className="ai-title text-display-md">
              Healthcare Powered<br />
              by <span className="gradient-text-gold">Artificial Intelligence</span>
            </h2>

            <p className="ai-description text-body">
              DOCCARE's proprietary AI engine processes millions of data points to deliver insights that are personalized, precise, and predictive.
            </p>

            {/* Tabs */}
            <div className="ai-tabs" role="tablist">
              {insights.map((ins, i) => (
                <button
                  key={ins.id}
                  className={`ai-tab ${activeTab === i ? 'ai-tab--active' : ''}`}
                  onClick={() => setActiveTab(i)}
                  role="tab"
                  id={`ai-tab-${ins.id}`}
                  aria-selected={activeTab === i}
                >
                  {ins.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="ai-tab-content" key={activeTab}>
              <h3 className="ai-insight-title">{active.title}</h3>
              <p className="ai-insight-desc">{active.description}</p>
              <div className="ai-insight-metrics">
                {active.metrics.map((m, i) => (
                  <div key={i} className="ai-metric">
                    <span className="ai-metric-value">{m.value}</span>
                    <span className="ai-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-gold" id={`ai-learn-${active.id}`}>
                Learn More
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right — Visual panel */}
          <div className="ai-visual">
            <div className="ai-visual-card">
              {/* Header */}
              <div className="ai-visual-header">
                <div className="ai-visual-dot" />
                <div className="ai-visual-dot" />
                <div className="ai-visual-dot" />
                <span className="ai-visual-title">DOCCARE AI Engine</span>
              </div>

              {/* Live analysis */}
              <div className="ai-analysis">
                <div className="ai-analysis-label">Analyzing Health Profile</div>

                {/* Progress bars */}
                {[
                  { label: 'Cardiovascular', value: 94, color: '#D4AF37' },
                  { label: 'Metabolic', value: 87, color: '#E6C56A' },
                  { label: 'Neurological', value: 91, color: '#D4AF37' },
                  { label: 'Immunological', value: 78, color: '#E6C56A' },
                ].map((item, i) => (
                  <div key={i} className="ai-progress-item" style={{ '--delay': `${i * 0.15}s` }}>
                    <div className="ai-progress-header">
                      <span className="ai-progress-label">{item.label}</span>
                      <span className="ai-progress-value" style={{ color: item.color }}>{item.value}%</span>
                    </div>
                    <div className="ai-progress-bar">
                      <div
                        className="ai-progress-fill"
                        style={{
                          width: `${item.value}%`,
                          background: `linear-gradient(90deg, ${item.color}80, ${item.color})`,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI insight output */}
              <div className="ai-output">
                <div className="ai-output-header">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5.5-4 6.8V17h-6v-1.2C6.5 14.5 5 12 5 9a7 7 0 0 1 7-7z" stroke="#D4AF37" strokeWidth="1.5" />
                    <rect x="9" y="17" width="6" height="2" rx="1" stroke="#D4AF37" strokeWidth="1.5" />
                  </svg>
                  <span>AI Insight</span>
                </div>
                <p className="ai-output-text">
                  Your cardiovascular indicators show a 12% improvement from last month. Maintaining current exercise regimen is recommended.
                </p>
              </div>

              {/* Floating stat */}
              <div className="ai-float-stat">
                <span className="ai-float-val">99.1%</span>
                <span className="ai-float-label">Diagnostic Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
