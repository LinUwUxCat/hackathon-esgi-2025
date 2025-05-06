import React, { useState, useEffect } from 'react';
import DoctorMap from './map'; 
import pegman from '../assets/Pegman.png';

export default function MapAndPegman() {
  const initialPosition = { x: 1500, y: 40 };
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [pegmanDropPosition, setPegmanDropPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({ x: e.clientX - 25, y: e.clientY - 25 });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setPegmanDropPosition({ x: position.x + 25, y: position.y + 25 });
        setPosition(initialPosition); 
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <DoctorMap pegmanDropPosition={pegmanDropPosition} />

      <img
        src={pegman}
        alt="Pegman"
        onMouseDown={() => setIsDragging(true)}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: '50px',
          height: '50px',
          cursor: 'grab',
          zIndex: 1000,
          userSelect: 'none',
        }}
      />
    </div>
  );
}
