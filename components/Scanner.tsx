import React, { useState, useRef } from 'react';

interface ScannerProps {
  onScan: (trackingNumber: string) => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScan }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onScan(inputValue.trim());
      setInputValue('');
    }
  };
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
      onScan(text.trim());
      setInputValue('');
    } catch(err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="barcode-input" className="block text-sm font-medium text-gray-400 mb-2">
          Scan or Enter Barcode
        </label>
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            id="barcode-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tracking Number..."
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Log Scan
          </button>
          {navigator.clipboard && (
            <button
                type="button"
                onClick={handlePaste}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            >
                Paste
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
