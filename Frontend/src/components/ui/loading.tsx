import React from 'react';

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

export const LoadingButton = ({ children, loading, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => (
  <button
    {...props}
    disabled={loading || props.disabled}
    className={`relative ${props.className || ''}`}
  >
    {loading && (
      <span className="absolute inset-0 flex items-center justify-center bg-inherit">
        <LoadingSpinner />
      </span>
    )}
    <span className={loading ? 'invisible' : ''}>{children}</span>
  </button>
); 