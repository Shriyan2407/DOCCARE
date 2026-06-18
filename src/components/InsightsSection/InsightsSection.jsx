import './InsightsSection.css';

const insights = [
  {
    id: 'preventive-care',
    category: 'Preventive Care',
    title: 'The Future of Preventive Medicine: How AI is Changing Early Detection',
    excerpt: 'Discover how machine learning models trained on millions of patient records are identifying disease markers years before traditional methods.',
    readTime: '5 min read',
    date: 'Jun 15, 2026',
    featured: true,
  },
  {
    id: 'mental-health-ai',
    category: 'Mental Health',
    title: 'AI-Assisted Therapy: Bridging Gaps in Mental Healthcare',
    excerpt: 'How intelligent emotional support systems are complementing human therapists to provide 24/7 mental wellness.',
    readTime: '4 min read',
    date: 'Jun 12, 2026',
    featured: false,
  },
  {
    id: 'genomics',
    category: 'Genomics',
    title: 'Personalized Medicine Through Genetic Analysis',
    excerpt: 'Your DNA holds the key to understanding exactly which treatments will be most effective for your unique biology.',
    readTime: '6 min read',
    date: 'Jun 10, 2026',
    featured: false,
  },
  {
    id: 'telehealth',
    category: 'Telehealth',
    title: 'Virtual Consultations Achieve Parity with In-Person Care',
    excerpt: 'New studies confirm that telemedicine outcomes match or exceed traditional consultations for 80% of conditions.',
    readTime: '3 min read',
    date: 'Jun 8, 2026',
    featured: false,
  },
];

const InsightsSection = () => {
  return (
    <section className="insights-section section" id="insights">
      <div className="container">
        {/* Header */}
        <div className="insights-header">
          <div className="badge badge-gold">Health Insights</div>
          <h2 className="insights-title text-display-md">
            Knowledge That<br />
            <span className="gradient-text-gold">Empowers Your Health</span>
          </h2>
          <p className="insights-subtitle text-subheading">
            Expert-authored articles, research, and insights from the forefront of modern medicine.
          </p>
        </div>

        {/* Featured + grid */}
        <div className="insights-layout">
          {/* Featured */}
          <div className="insights-featured card" id="insight-featured">
            <div className="insights-featured-image">
              <div className="insights-image-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5.5-4 6.8V17h-6v-1.2C6.5 14.5 5 12 5 9a7 7 0 0 1 7-7z" stroke="#D4AF37" strokeWidth="1.5" />
                  <rect x="9" y="17" width="6" height="4" rx="2" stroke="#D4AF37" strokeWidth="1.5" />
                </svg>
                <div className="insights-image-glow" />
              </div>
            </div>
            <div className="insights-featured-content">
              <div className="insights-meta">
                <span className="badge badge-gold">{insights[0].category}</span>
                <span className="insights-date">{insights[0].date}</span>
                <span className="insights-read-time">{insights[0].readTime}</span>
              </div>
              <h3 className="insights-featured-title">{insights[0].title}</h3>
              <p className="insights-excerpt">{insights[0].excerpt}</p>
              <button className="btn btn-outline btn-sm" id="read-insight-featured">
                Read Article
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Grid of smaller articles */}
          <div className="insights-grid">
            {insights.slice(1).map((ins, i) => (
              <div
                key={ins.id}
                className="insight-card card"
                id={`insight-${ins.id}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="insight-meta">
                  <span className="badge badge-gold">{ins.category}</span>
                  <span className="insights-read-time">{ins.readTime}</span>
                </div>
                <h3 className="insight-title">{ins.title}</h3>
                <p className="insight-excerpt">{ins.excerpt}</p>
                <div className="insight-footer">
                  <span className="insights-date">{ins.date}</span>
                  <button className="insight-read-btn" id={`read-insight-${ins.id}`}>
                    Read →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="insights-footer">
          <button className="btn btn-outline btn-lg" id="view-all-insights">
            Explore All Articles
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
