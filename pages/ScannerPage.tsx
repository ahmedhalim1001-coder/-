import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Scanner } from '../components/Scanner';
import { ScanLog } from '../components/ScanLog';
import { StatusIndicator } from '../components/StatusIndicator';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Scan, ApiScan, User } from '../types';
import { SHIPPING_COMPANIES } from '../constants';
import { Toast } from '../components/Toast';

const audioBeep = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVO/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v-';

interface ScannerPageProps {
  user: User;
  onLogout: () => void;
}

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export const ScannerPage: React.FC<ScannerPageProps> = ({ user, onLogout }) => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [offlineQueue, setOfflineQueue] = useLocalStorage<ApiScan[]>(`offlineQueue_${user.username}`, []);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const mergeScans = (serverScans: Scan[], localScans: ApiScan[]): Scan[] => {
    const localUiScans: Scan[] = localScans.map(s => ({
        trackingNumber: s.barcode,
        company: s.shipping_company,
        timestamp: s.scanned_at,
        status: 'pending'
    }));
    
    const serverTrackingNumbers = new Set(serverScans.map(s => s.trackingNumber));
    const uniqueLocalScans = localUiScans.filter(s => !serverTrackingNumbers.has(s.trackingNumber));
    
    const combined = [...uniqueLocalScans, ...serverScans];
    combined.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return combined;
  };

  const fetchScans = useCallback(async () => {
    if (!navigator.onLine) {
        console.log('Offline: Cannot fetch scans.');
        setScans(mergeScans([], offlineQueue));
        return;
    };
    try {
      const response = await fetch('/api/get_scans.php');
      if (!response.ok) {
        if (response.status === 401) onLogout();
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data: Scan[] = await response.json();
      const serverScans = data.map(s => ({...s, status: 'synced' as const}));
      setScans(mergeScans(serverScans, offlineQueue));
    } catch (error) {
      console.error("Failed to fetch scans:", error);
      setScans(mergeScans([], offlineQueue));
    }
  }, [onLogout, offlineQueue]);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncQueue = useCallback(async () => {
    if (isOnline && offlineQueue.length > 0 && !isSyncing) {
        setIsSyncing(true);
        const queueCopy = [...offlineQueue];
        const failedScans: ApiScan[] = [];
        
        for (const scan of queueCopy) {
            try {
                const response = await fetch('/api/scan.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(scan),
                });
                if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
            } catch (error) {
                failedScans.push(scan);
                console.error(`Failed to sync scan ${scan.barcode}:`, error);
            }
        }
        
        setOfflineQueue(failedScans);

        if (failedScans.length === 0) {
            setToast({ message: 'Sync Complete!', type: 'success' });
        } else {
             setToast({ message: `${failedScans.length} scan(s) failed to sync.`, type: 'error' });
        }
        await fetchScans(); // Refetch all data to get a consistent state
        setIsSyncing(false);
    }
  }, [isOnline, offlineQueue, fetchScans, setOfflineQueue, isSyncing]);


  useEffect(() => {
    const syncInterval = setInterval(() => {
        syncQueue();
    }, 5000); // Attempt to sync every 5 seconds
    return () => clearInterval(syncInterval);
  }, [syncQueue]);

  const handleScan = useCallback((trackingNumber: string) => {
    if (!trackingNumber.trim()) return;

    const company = Object.keys(SHIPPING_COMPANIES).find(key => 
      SHIPPING_COMPANIES[key as keyof typeof SHIPPING_COMPANIES].regex.test(trackingNumber)
    ) || 'Unknown';

    const timestamp = new Date();
    const newScan: ApiScan = {
      api_key: user.apiKey,
      barcode: trackingNumber,
      shipping_company: company as Scan['company'],
      scanned_at: timestamp.toISOString().slice(0, 19).replace('T', ' '),
    };
    
    const uiScan: Scan = {
        trackingNumber: newScan.barcode,
        company: newScan.shipping_company,
        timestamp: timestamp.toISOString(),
        status: 'pending', // FIX: Always set to pending initially for accurate feedback
    };

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }

    setScans(prevScans => [uiScan, ...prevScans]);
    setOfflineQueue(prevQueue => [newScan, ...prevQueue]);
    
    // We add to offline queue regardless, and let the sync process handle it.
    // This simplifies logic and makes it more robust.

  }, [setOfflineQueue, user.apiKey]);


  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header username={user.username} onLogout={onLogout} />
      <main className="container mx-auto p-4">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <StatusIndicator 
          isOnline={isOnline} 
          isSyncing={isSyncing} 
          offlineQueueCount={offlineQueue.length} 
        />
        <Scanner onScan={handleScan} />
        <ScanLog scans={scans} />
      </main>
      <audio ref={audioRef} src={audioBeep} preload="auto" />
    </div>
  );
};