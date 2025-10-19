export type ShippingCompany = 'Aramex' | 'DHL' | 'SMSA' | 'Unknown';

export interface Scan {
  trackingNumber: string;
  timestamp: string;
  company: ShippingCompany;
  status?: 'synced' | 'pending';
}

// FIX: Added ApiScan type for objects sent to the server API.
export interface ApiScan {
  api_key: string;
  barcode: string;
  shipping_company: ShippingCompany;
  scanned_at: string;
}

export interface User {
    username: string;
    role: 'user' | 'admin';
    apiKey: string;
}