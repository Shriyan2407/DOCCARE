import React, { useRef } from 'react';

/**
 * LuxuryMarquee — Infinite multi-row testimonial marquee.
 * 3 rows: row 1 goes left, row 2 goes right, row 3 goes left.
 * Hover pauses animation + lifts card + increases gold glow.
 */

const reviews = [
  { name: 'Alexandra Chen', role: 'CEO, Meridian Capital', text: 'The most sophisticated healthcare experience I\'ve ever encountered. This platform feels like it was built exclusively for discerning individuals.', rating: 5, avatar: 'AC', verified: true },
  { name: 'Sir Edmund Whitfield', role: 'Private Equity, London', text: 'Finally, a medical platform that matches the standards I expect in every other aspect of my life. Absolutely world-class.', rating: 5, avatar: 'EW', verified: true },
  { name: 'Isabella Laurent', role: 'Principal Architect', text: 'The UI alone made me trust this service completely. The attention to detail is extraordinary. My cardiologist appointment took 45 seconds.', rating: 5, avatar: 'IL', verified: true },
  { name: 'Marcus Thornton', role: 'Surgeon, NYU Langone', text: 'As a physician, I evaluate healthcare platforms critically. This one exceeds every benchmark I set. The AI diagnostics are remarkable.', rating: 5, avatar: 'MT', verified: true },
  { name: 'Priya Nair', role: 'Partner, Goldman Sachs', text: 'I\'ve used healthcare platforms on 4 continents. Nothing comes close to this. The response time, the doctors, the experience — flawless.', rating: 5, avatar: 'PN', verified: true },
  { name: 'James Harrington', role: 'Olympic Athlete', text: 'My performance relies on peak health. MediCare\'s predictive insights have given me an edge I never thought possible from a digital platform.', rating: 5, avatar: 'JH', verified: true },
  { name: 'Claudette Moreau', role: 'Fashion Director, Paris', text: 'Even the booking confirmation emails feel premium. Every touchpoint is considered. This is luxury healthcare as it should be.', rating: 5, avatar: 'CM', verified: true },
  { name: 'Dmitri Volkov', role: 'Tech Founder, Berlin', text: 'We vetted 20 platforms before choosing MediCare for our executive health plan. There was no contest. The quality delta is enormous.', rating: 5, avatar: 'DV', verified: true },
  { name: 'Amara Osei', role: 'Director, World Bank', text: 'Healthcare that respects your time and intelligence. No jargon, no waiting, no compromises. The gold standard — literally.', rating: 5, avatar: 'AO', verified: true },
];

const StarRating = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {Array.from({ length: rating }).map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review, onMouseEnter, onMouseLeave }) => (
  <div
    className="marquee-card"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{
      flexShrink: 0,
      width: '340px',
      padding: '1.75rem',
      background: 'rgba(255,255,255,0.02)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      border: '1px solid rgba(59,130,246,0.15)',
      borderRadius: '24px',
      boxShadow: '0 0 40px rgba(59,130,246,0.05)',
      cursor: 'default',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.5s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseOver={(e) => {
      const card = e.currentTarget;
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 0 60px rgba(59,130,246,0.25), 0 30px 60px rgba(0,0,0,0.5)';
      card.style.borderColor = 'rgba(59,130,246,0.4)';
    }}
    onMouseOut={(e) => {
      const card = e.currentTarget;
      card.style.transform = '';
      card.style.boxShadow = '0 0 40px rgba(59,130,246,0.05)';
      card.style.borderColor = 'rgba(59,130,246,0.15)';
    }}
  >
    {/* Gold shimmer on top */}
    <div style={{
      position: 'absolute',
      top: 0, left: '15%', right: '15%',
      height: '1px',
      background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.4), transparent)',
    }} />

    {/* Rating */}
    <div style={{ marginBottom: '1rem' }}>
      <StarRating rating={review.rating} />
    </div>

    {/* Text */}
    <p style={{
      fontFamily: "'Inter', sans-serif",
      color: '#A1A1AA',
      fontSize: '0.875rem',
      lineHeight: 1.7,
      marginBottom: '1.25rem',
      fontStyle: 'italic',
    }}>
      "{review.text}"
    </p>

    {/* Author */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{
        width: 38, height: 38,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(37,99,235,0.05))',
        border: '1px solid rgba(59,130,246,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#60A5FA',
        fontFamily: "'Inter', sans-serif",
        flexShrink: 0,
      }}>
        {review.avatar}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#fff',
          fontFamily: "'Inter', sans-serif",
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          marginBottom: '1px',
        }}>
          {review.name}
          {review.verified && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#3B82F6">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#71717A', fontFamily: "'Inter', sans-serif" }}>
          {review.role}
        </div>
      </div>
    </div>
  </div>
);

const MarqueeRow = ({ items, direction = 'left', speed = 40 }) => {
  const containerRef = useRef(null);
  const isPaused = useRef(false);

  const handleHover = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'running';
    }
  };

  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  const totalWidth = doubled.length * 356; // card width + gap
  const duration = totalWidth / speed;

  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '120px',
        background: `linear-gradient(to right, var(--bg), transparent)`,
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '120px',
        background: `linear-gradient(to left, var(--bg), transparent)`,
        zIndex: 2, pointerEvents: 'none',
      }} />

      <div
        ref={containerRef}
        style={{
          display: 'flex',
          gap: '1rem',
          width: 'max-content',
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: 'running',
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

const LuxuryMarquee = () => {
  // Split reviews into 3 rows
  const row1 = reviews.slice(0, 9);
  const row2 = reviews.slice(3, 9).concat(reviews.slice(0, 3));
  const row3 = reviews.slice(6, 9).concat(reviews.slice(0, 6));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <MarqueeRow items={row1} direction="left" speed={38} />
      <MarqueeRow items={row2} direction="right" speed={44} />
      <MarqueeRow items={row3} direction="left" speed={36} />
    </div>
  );
};

export default LuxuryMarquee;
