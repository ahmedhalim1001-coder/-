import React, { useEffect } from 'react';
import { SuccessIcon } from './icons/SuccessIcon';
import { ErrorIcon } from './icons/ErrorIcon';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = 'fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white font-semibold flex items-center z-50 animate-fade-in-down';
  const typeClasses = {
    success: 'bg-green-600',
    error: 'bg-red-600',
  };

  const Icon = type === 'success' ? SuccessIcon : ErrorIcon;

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <Icon className="w-6 h-6 mr-3" />
      {message}
    </div>
  );
};