import { SpecialistHub3D } from './SpecialistHub3D';
import './SpecialistsSection.css';

const SpecialistsSection = () => {
  return (
    <section className="specialists-section section" id="specialists">
      {/* Absolute Header Overlay */}
      <div className="hub-overlay-header pointer-events-none">
        <div className="container">
          <div className="badge badge-gold">Intelligence Hub</div>
          <h2 className="specialists-title text-display-md">
            Specialist Discovery,<br />
            <span className="gradient-text-gold">Engineered for Precision</span>
          </h2>
          <p className="specialists-subtitle text-subheading">
            Interact with the spatial nodes to analyze departmental metrics and access world-class physicians in real-time.
          </p>
        </div>
      </div>

      {/* 3D WebGL Canvas spanning 100vh */}
      <SpecialistHub3D />
      
      {/* Gradient fade to blend into next section */}
      <div className="hub-fade-bottom pointer-events-none"></div>
    </section>
  );
};

export default SpecialistsSection;
