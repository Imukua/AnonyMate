import React from 'react';

interface ErrorBannerProps {
  error: ErrorObject;
  onClose: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ error, onClose }) => {
  return (
    <div className="error-banner">
      <p>{error.message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ErrorBanner;
