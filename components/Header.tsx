import React from 'react';

interface HeaderProps {
    username: string;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Cloud Barcode Scanner
        </h1>
        <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {username}</span>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            >
              Logout
            </button>
        </div>
      </div>
    </header>
  );
};
