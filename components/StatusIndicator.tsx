import React from 'react';

interface StatusIndicatorProps {
  isOnline: boolean;
  isSyncing: boolean;
  offlineQueueCount: number;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isOnline,
  isSyncing,
  offlineQueueCount,
}) => {
  return (
    <div className="mb-4 p-3 rounded-lg flex items-center justify-between bg-gray-800">
      <div className="flex items-center">
        <span
          className={`w-3 h-3 rounded-full mr-2 ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
        <span className="font-semibold">{isOnline ? 'Online' : 'Offline'}</span>
      </div>
      {isSyncing && (
        <div className="text-sm text-blue-400">Syncing {offlineQueueCount} items...</div>
      )}
      {!isOnline && offlineQueueCount > 0 && (
        <div className="text-sm text-yellow-400">{offlineQueueCount} scan(s) waiting to sync.</div>
      )}
    </div>
  );
};
