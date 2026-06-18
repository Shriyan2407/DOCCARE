import { SpatialServiceCard } from './SpatialServiceCard';
import './ServicesSection.css';

const services = [
  {
    id: 'primary-care',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M12 8v8M8 12h8" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Primary Care',
    description: 'Comprehensive health checkups, preventive care, chronic disease management, and routine consultations with experienced physicians.',
    tags: ['General Health', 'Preventive Care', 'Wellness'],
    successRate: '99.8%',
    specialistsCount: '30+ Active',
    waitTime: 'Instant',
    featured: true,
  },
  {
    id: 'cardiology',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 21C12 21 3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 13-9 13z" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M5 12h2l2-3 2 6 2-3h2" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Cardiology',
    description: 'Specialized heart care including cardiac assessments, ECG monitoring, cardiovascular consultations, and long-term heart health management.',
    tags: ['Heart Health', 'ECG', 'Cardiac Care'],
    successRate: '98.5%',
    specialistsCount: '12 Active',
    waitTime: '< 5 mins',
  },
  {
    id: 'neurology',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.5 2 6 4 6 7c0 2 1 3.5 2.5 4.5C7 12.5 6 14 6 16c0 3.5 3 5 6 5s6-1.5 6-5c0-2-1-3.5-2.5-4.5C17 10.5 18 9 18 7c0-3-2.5-5-6-5z" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M9 9c0 0 3 2 6 0" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M10 16c0 0 2 1.5 4 0" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Neurology',
    description: 'Expert neurological evaluations, cognitive assessments, migraine treatment, and nervous system health monitoring.',
    tags: ['Brain Health', 'Neurology', 'Cognitive Care'],
    successRate: '97.2%',
    specialistsCount: '8 Active',
    waitTime: '< 10 mins',
  },
  {
    id: 'pediatrics',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Pediatrics',
    description: 'Dedicated healthcare services for infants, children, and adolescents, including vaccinations, growth monitoring, and developmental care.',
    tags: ['Children', 'Vaccination', 'Growth Care'],
    successRate: '99.5%',
    specialistsCount: '15 Active',
    waitTime: '< 5 mins',
  },
  {
    id: 'mental-wellness',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5.5-4 6.8V17h-6v-1.2C6.5 14.5 5 12 5 9a7 7 0 0 1 7-7z" stroke="#D4AF37" strokeWidth="1.5" />
        <rect x="9" y="17" width="6" height="4" rx="2" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M9 11c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Mental Wellness',
    description: 'Confidential counseling, stress management programs, therapy sessions, and emotional well-being support.',
    tags: ['Therapy', 'Wellness', 'Support'],
    successRate: '96.8%',
    specialistsCount: '18 Active',
    waitTime: '< 15 mins',
  },
  {
    id: 'telemedicine',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="15" rx="2" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M8 21h8M12 18v3" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="10" r="3" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M17 13l2-2.5L17 8" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Telemedicine',
    description: 'Secure online consultations, digital prescriptions, virtual follow-ups, and remote healthcare access from anywhere.',
    tags: ['Virtual Care', 'Online Consultation', 'Remote Access'],
    successRate: '99.9%',
    specialistsCount: '50+ Active',
    waitTime: 'Instant',
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section section" id="services">
      <div className="container">
        {/* Header */}
        <div className="services-header">
          <div className="badge badge-gold">Platform Modules</div>
          <h2 className="services-title text-display-md">
            Healthcare OS,<br />
            <span className="gradient-text-gold">Running at 60FPS</span>
          </h2>
          <p className="services-subtitle text-subheading">
            Interact with our premium clinical modules. Each subsystem is engineered for sub-second precision.
          </p>
        </div>

        {/* Spatial Grid */}
        <div className="spatial-services-grid">
          {services.map((service, i) => (
            <SpatialServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
