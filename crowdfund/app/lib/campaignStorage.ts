// Campaign storage management with localStorage

export type StoredCampaign = {
  id: string;
  title: string;
  goalXLM: number;
  raisedXLM: number;  // Track donasi untuk campaign ini
  deadlineMs: number;
  createdAt: string;
  contractId?: string;
};

const CAMPAIGNS_KEY = 'stellar_campaigns';

export function getAllCampaigns(): StoredCampaign[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CAMPAIGNS_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to load campaigns:', e);
    return [];
  }
}

export function addCampaign(campaign: Omit<StoredCampaign, 'id' | 'createdAt' | 'raisedXLM'>): StoredCampaign {
  const campaigns = getAllCampaigns();
  
  const newCampaign: StoredCampaign = {
    ...campaign,
    id: `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    raisedXLM: 0, // Start dengan 0
    createdAt: new Date().toISOString(),
  };
  
  campaigns.push(newCampaign);
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
  
  return newCampaign;
}

export function getCampaign(id: string): StoredCampaign | null {
  const campaigns = getAllCampaigns();
  return campaigns.find(c => c.id === id) || null;
}

export function updateCampaign(id: string, updates: Partial<StoredCampaign>): void {
  const campaigns = getAllCampaigns();
  const index = campaigns.findIndex(c => c.id === id);
  
  if (index !== -1) {
    campaigns[index] = { ...campaigns[index], ...updates };
    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
  }
}

export function deleteCampaign(id: string): void {
  const campaigns = getAllCampaigns();
  const filtered = campaigns.filter(c => c.id !== id);
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(filtered));
}

export function getActiveCampaigns(): StoredCampaign[] {
  const campaigns = getAllCampaigns();
  const now = Date.now();
  
  // Filter campaigns that haven't expired
  return campaigns.filter(c => c.deadlineMs > now);
}

export function getExpiredCampaigns(): StoredCampaign[] {
  const campaigns = getAllCampaigns();
  const now = Date.now();
  
  return campaigns.filter(c => c.deadlineMs <= now);
}

// Add donation to specific campaign
export function addDonationToCampaign(campaignId: string, amountXLM: number): void {
  const campaigns = getAllCampaigns();
  const index = campaigns.findIndex(c => c.id === campaignId);
  
  if (index !== -1) {
    campaigns[index].raisedXLM = (campaigns[index].raisedXLM || 0) + amountXLM;
    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
  }
}

// Get total raised across all campaigns
export function getTotalRaisedAllCampaigns(): number {
  const campaigns = getAllCampaigns();
  return campaigns.reduce((total, campaign) => total + (campaign.raisedXLM || 0), 0);
}

