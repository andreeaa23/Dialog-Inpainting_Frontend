import React from 'react';
import '../LoadingDots.css'; // Ensure you have the CSS file imported


const LoadingDots = () => {
  return (
    <div className="loading-dots">
      Predicting<span>.</span><span>.</span><span>.</span>
    </div>
  );
};

export default LoadingDots;
