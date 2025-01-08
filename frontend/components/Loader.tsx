import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
  thickness?: number;
  className?: string;
  duration?: number;
}

const Loader = ({
  size = 32,
  color = "#3B82F6",
  thickness = 3,
  className = "",
  duration = 0.8,
}: LoaderProps) => {
  return (
    <div className={`inline-block ${className}`}>
      <div
        className="animate-spin rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${thickness}px`,
          borderColor: color,
          borderTopColor: "transparent",
          animationDuration: `${duration}s`,
        }}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};
export default Loader