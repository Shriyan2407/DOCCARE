import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, DollarSign, ChevronRight } from 'lucide-react';

const DoctorCard = ({ doctor, index = 0 }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(6px)`;
    card.style.transition = 'transform 0.15s ease';
    card.style.boxShadow = `0 0 60px rgba(59,130,246,0.12), ${-x * 15}px ${-y * 15}px 30px rgba(0,0,0,0.4)`;
    card.style.borderColor = 'rgba(59,130,246,0.28)';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    card.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s ease, border-color 0.5s ease';
    card.style.boxShadow = '0 0 50px rgba(59,130,246,0.08)';
    card.style.borderColor = 'rgba(59,130,246,0.15)';
  };

  const color = '#3B82F6';

  return (
    <div
      ref={cardRef}
      className="doctor-card"
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(59,130,246,0.15)',
        boxShadow: '0 0 50px rgba(59,130,246,0.08)',
        borderRadius: '24px',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'default',
        willChange: 'transform',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header: Avatar + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {/* Avatar ring glow */}
          <div style={{
            position: 'absolute',
            inset: -3,
            borderRadius: '50%',
            background: `conic-gradient(${color}, transparent 60%)`,
            opacity: 0.6,
            animation: 'ring-spin 8s linear infinite',
          }} />
          <img
            src={doctor.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}&backgroundColor=b6e3f4`}
            alt={doctor.name}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(5,8,22,0.9)',
              position: 'relative',
              zIndex: 1,
              background: `${color}20`,
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback avatar */}
          <div style={{
            display: 'none',
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
            border: `2px solid ${color}40`,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            position: 'relative',
            zIndex: 1,
          }}>
            👨‍⚕️
          </div>
          {/* Online indicator */}
          <span style={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: 14,
            height: 14,
            background: '#10b981',
            borderRadius: '50%',
            border: '2px solid #020408',
            zIndex: 2,
            boxShadow: '0 0 8px #10b981',
            animation: 'online-pulse 2s ease-in-out infinite',
          }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#FFFFFF' }}>
            {doctor.name}
          </h3>
          <span className="badge badge-primary" style={{ fontSize: '0.68rem', background: `${color}15`, color: '#60A5FA', borderColor: `${color}30` }}>
            {doctor.specialization}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem', flex: 1 }}>
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: '0.875rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
            <Clock size={11} />
            Experience
          </div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: '#CBD5E1' }}>{doctor.experience}</div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: '0.875rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
            <DollarSign size={11} />
            Consultation
          </div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: '#22d3ee' }}>${doctor.fee}</div>
        </div>

        <div style={{
          gridColumn: 'span 2',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
              Patient Rating
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={14} fill="#fbbf24" color="#fbbf24" />
              <span style={{ fontWeight: 700, fontSize: '1rem', color: '#FFFFFF' }}>{doctor.rating}</span>
              <span style={{ color: '#64748B', fontSize: '0.78rem' }}>({doctor.reviews} reviews)</span>
            </div>
          </div>
          {/* Mini star bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
            {[100, 75, 40, 15, 5].map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: `${w * 0.5}px`, height: 4, background: `rgba(251,191,36,${w/100 * 0.7})`, borderRadius: 2 }} />
                <span style={{ fontSize: '0.55rem', color: '#475569' }}>{5-i}★</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        to={`/doctors/${doctor.id}`}
        className="btn btn-outline"
        style={{
          width: '100%',
          justifyContent: 'center',
          borderRadius: 12,
          marginTop: 'auto',
          gap: '0.5rem',
          fontSize: '0.875rem',
        }}
      >
        View Full Profile
        <ChevronRight size={15} />
      </Link>

      <style>{`
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes online-pulse {
          0%, 100% { box-shadow: 0 0 4px #10b981; }
          50%       { box-shadow: 0 0 12px #10b981; }
        }
      `}</style>
    </div>
  );
};

export default DoctorCard;
