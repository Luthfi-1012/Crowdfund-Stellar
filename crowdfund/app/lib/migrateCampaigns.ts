// Migration utility untuk update campaign lama

import type { StoredCampaign } from "./campaignStorage";

const CAMPAIGNS_KEY = 'stellar_campaigns';

export function migrateCampaignsToV2(): void {
  try {
    const stored = localStorage.getItem(CAMPAIGNS_KEY);
    if (!stored) return;
    
    const campaigns = JSON.parse(stored) as any[];
    let needsUpdate = false;
    
    const migratedCampaigns = campaigns.map((campaign) => {
      // Check if campaign needs raisedXLM field
      if (campaign.raisedXLM === undefined) {
        needsUpdate = true;
        return {
          ...campaign,
          raisedXLM: 0, // Initialize dengan 0
        };
      }
      return campaign;
    });
    
    if (needsUpdate) {
      localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(migratedCampaigns));
      console.log('✅ Campaigns migrated to v2 (added raisedXLM field)');
    }
  } catch (e) {
    console.error('Failed to migrate campaigns:', e);
  }
}

export function clearAllCampaigns(): void {
  if (confirm('Hapus semua campaign? Data tidak dapat dikembalikan!')) {
    localStorage.removeItem(CAMPAIGNS_KEY);
    console.log('✅ All campaigns cleared');
    window.location.reload();
  }
}

