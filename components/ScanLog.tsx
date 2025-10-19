import React from 'react';
import type { Scan } from '../types';
import { SHIPPING_COMPANIES } from '../constants';

interface ScanLogProps {
  scans: Scan[];
}

const getCompanyColor = (company: Scan['company']): string => {
  if (company === 'Unknown') {
    return 'bg-gray-500';
  }
  return SHIPPING_COMPANIES[company]?.color || 'bg-gray-500';
};

const StatusIcon: React.FC<{ status?: Scan['status'] }> = ({ status }) => {
  if (status === 'pending') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-label="Pending Sync"
      >
        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      </svg>
    );
  }
  return null;
};


export const ScanLog: React.FC<ScanLogProps> = ({ scans }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-3">Scan History</h2>
      {scans.length === 0 ? (
        <p className="text-gray-400">No scans yet. Start scanning to see the log.</p>
      ) : (
        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {scans.map((scan, index) => (
            <li
              key={`${scan.timestamp}-${scan.trackingNumber}-${index}`}
              className="bg-gray-700 p-3 rounded-md flex justify-between items-center"
            >
              <div className="flex items-center space-x-3">
                <StatusIcon status={scan.status} />
                <div>
                  <p className="font-mono text-lg">{scan.trackingNumber}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(scan.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full text-white ${getCompanyColor(
                  scan.company
                )}`}
              >
                {scan.company}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};