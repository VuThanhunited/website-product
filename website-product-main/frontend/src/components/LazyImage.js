import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, className, style, onError }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className={`lazy-image-wrapper ${className || ""}`}
      style={style}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? "loaded" : "loading"}`}
          onLoad={handleLoad}
          onError={onError}
          loading="lazy"
        />
      )}
      {!isLoaded && <div className="image-placeholder"></div>}
    </div>
  );
};

export default LazyImage;
