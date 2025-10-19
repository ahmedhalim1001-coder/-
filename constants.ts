export const SHIPPING_COMPANIES = {
  Aramex: {
    regex: /^\d{9,12}$/, // Example: 9-12 digits
    color: 'bg-red-500',
  },
  DHL: {
    regex: /^(JD|JJD)?\d{10,}$/, // Example: Starts with JD/JJD or just 10+ digits
    color: 'bg-yellow-500',
  },
  SMSA: {
    regex: /^\d{12}$/, // Example: 12 digits
    color: 'bg-blue-500',
  },
};
