import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => setHasError(true);

  return (
    <div className="image-container">
      {!hasError ? (
        <img src={src} alt={alt} onError={handleError} />
      ) : (
        <div className="placeholder">Missing Image</div>
      )}
    </div>
  );
};

export default ImageWithFallback;

