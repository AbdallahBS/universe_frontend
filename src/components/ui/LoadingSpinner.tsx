import React from 'react';

interface LoadingSpinnerProps {
  loading: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  size = 'md',
  fullScreen = false
}) => {
  if (!loading) return null;

  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-2',
    lg: 'h-16 w-16 border-4'
  };

  const spinner = (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-teal-600 border-t-transparent border-l-transparent border-r-transparent`}></div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-20">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
