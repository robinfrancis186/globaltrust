import React from 'react';
import Parallax3D from '../components/Parallax3D';
import '../styles/parallax-3d.css';

const Parallax3DPage: React.FC = () => {
  return (
    <div className="parallax-3d-page">
      <Parallax3D />
      
      {/* Additional content to enable scrolling */}
      <div style={{ height: '200vh', background: 'linear-gradient(180deg, #000 0%, #111 50%, #222 100%)' }}>
        <div style={{ 
          padding: '4rem 2rem', 
          color: 'white', 
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
            Scroll to Experience the 3D Parallax Effect
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.8 }}>
            Watch as the layers move at different speeds and depths, creating a cinematic 3D scrolling experience. 
            The effect is responsive and optimized for all devices.
          </p>
          
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Features</h3>
            <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
              <li style={{ marginBottom: '0.5rem' }}>Responsive depth scaling (reduced on mobile)</li>
              <li style={{ marginBottom: '0.5rem' }}>Smooth fade-in/out effects</li>
              <li style={{ marginBottom: '0.5rem' }}>3D transforms with perspective</li>
              <li style={{ marginBottom: '0.5rem' }}>Performance optimized with will-change</li>
              <li style={{ marginBottom: '0.5rem' }}>Accessibility support for reduced motion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parallax3DPage;











