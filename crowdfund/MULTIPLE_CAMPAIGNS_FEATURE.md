# 🎯 Multiple Campaigns Feature

## ✨ Fitur Baru yang Diimplementasikan

### 1. **Multiple Campaigns Display** 📊
Campaign sekarang ditampilkan dalam **grid layout** yang rapi:
- Grid 3 kolom di desktop
- Grid 2 kolom di tablet
- Grid 1 kolom di mobile
- Card size lebih compact dan rapi

### 2. **Campaign Selector di Form Donasi** 🎯
Form donasi sekarang punya **dropdown selector**:
- Pilih campaign mana yang mau di-support
- Auto-select campaign pertama
- Disabled jika belum ada campaign
- Helper text yang informative

### 3. **Campaign Storage System** 💾
System localStorage untuk menyimpan multiple campaigns:
- Setiap campaign punya ID unik
- Semua campaign tersimpan persistent
- Easy to retrieve dan manage

---

## 🏗️ Arsitektur

### Component Structure

```
┌─────────────────────────────────────┐
│  campaignStorage.ts                 │
│  • getAllCampaigns()                │
│  • addCampaign()                    │
│  • getCampaign(id)                  │
│  • updateCampaign(id, data)         │
│  • deleteCampaign(id)               │
└─────────────────────────────────────┘
           │
           ├── Used by ──────────────┐
           │                         │
           ▼                         ▼
┌──────────────────────┐   ┌──────────────────────┐
│  CreateCampaignForm  │   │     home.tsx         │
│  • Save new campaign │   │  • Load campaigns    │
│  • addCampaign()     │   │  • Display grid      │
└──────────────────────┘   │  • Campaign selector │
                           └──────────────────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │   CampaignCard.tsx   │
                           │  • Compact display   │
                           │  • Progress bar      │
                           │  • Countdown timer   │
                           │  • Milestones        │
                           └──────────────────────┘
```

---

## 📁 Files Created/Modified

### New Files:
1. **`crowdfund/app/lib/campaignStorage.ts`** ✨
   - Campaign storage management
   - LocalStorage wrapper functions
   - CRUD operations untuk campaigns

2. **`crowdfund/app/components/CampaignCard.tsx`** ✨
   - Compact campaign card component
   - Progress bar dengan animasi
   - Countdown timer live
   - Milestone indicators

### Modified Files:
1. **`crowdfund/app/components/CreateCampaignForm.tsx`**
   - Import `addCampaign` function
   - Save campaign to storage on success
   - Calculate deadline in milliseconds

2. **`crowdfund/app/routes/home.tsx`**
   - Import campaign storage functions
   - State management untuk campaigns
   - Campaign selector di donation form
   - Grid display untuk campaigns
   - Auto-refresh campaigns after creation

---

## 💾 Campaign Storage

### Data Structure:

```typescript
type StoredCampaign = {
  id: string;              // Unique: "campaign_1698765432_abc123"
  title: string;           // "Solar Power Impact"
  goalXLM: number;         // 500
  deadlineMs: number;      // Unix timestamp in milliseconds
  createdAt: string;       // ISO timestamp
  contractId?: string;     // Optional: contract address
};
```

### Storage Key:
```typescript
localStorage.getItem('stellar_campaigns')
```

### Example Data:
```json
[
  {
    "id": "campaign_1698765432_abc123",
    "title": "Solar Power Impact",
    "goalXLM": 500,
    "deadlineMs": 1698876543000,
    "createdAt": "2024-10-23T10:30:00.000Z"
  },
  {
    "id": "campaign_1698766543_def456",
    "title": "Clean Water Initiative",
    "goalXLM": 1000,
    "deadlineMs": 1698987654000,
    "createdAt": "2024-10-23T11:00:00.000Z"
  }
]
```

---

## 🎨 Layout Structure

### Campaign Grid Section:

```
┌────────────────────────────────────────────────────┐
│         Campaign Aktif (Centered Header)           │
│    Semua campaign crowdfunding yang sedang         │
│              berjalan                              │
└────────────────────────────────────────────────────┘

Desktop (3 columns):
┌──────────┬──────────┬──────────┐
│ Campaign │ Campaign │ Campaign │
│    #1    │    #2    │    #3    │
│          │          │          │
│ Goal: XX │ Goal: XX │ Goal: XX │
│ ████ 50% │ ████ 75% │ ████ 30% │
│          │          │          │
│ [✓][✓][⊗]│[✓][✓][⊗]│[✓][⊗][⊗]│
└──────────┴──────────┴──────────┘

Tablet (2 columns):
┌──────────────┬──────────────┐
│  Campaign #1 │  Campaign #2 │
│              │              │
└──────────────┴──────────────┘

Mobile (1 column):
┌────────────────────────────┐
│       Campaign #1          │
└────────────────────────────┘
┌────────────────────────────┐
│       Campaign #2          │
└────────────────────────────┘
```

### Empty State:
```
┌────────────────────────────────────┐
│                                    │
│      Belum ada campaign            │
│                                    │
│  Buat campaign pertama Anda        │
│         di atas!                   │
│                                    │
└────────────────────────────────────┘
```

---

## 🎯 Campaign Card Component

### Features:

#### 1. **Compact Design**
```tsx
<CampaignCard
  id="campaign_123"
  title="Solar Power Impact"
  goalXLM={500}
  raisedXLM={250}
  deadlineMs={1698876543000}
  compact={true}  // ← Smaller padding, compact layout
/>
```

#### 2. **Live Countdown Timer**
```
✓ Updates every second
✓ Format: "3d 12h" or "5h 30m" or "45m"
✓ Shows "Berakhir" when expired
```

#### 3. **Progress Bar**
```
✓ Animated (spring animation)
✓ Gradient: emerald-500 → lime-400
✓ Percentage display
✓ Responsive to goal/raised changes
```

#### 4. **Milestone Indicators**
```
50%  75%  100%
[✓]  [✓]  [⊗]   ← Achieved / Not achieved
```

#### 5. **Status Badge**
```
┌─────────┐
│ Selesai │  ← Shown when expired
└─────────┘
```

---

## 🎯 Donation Form Selector

### Campaign Selector:

```tsx
<select id="campaignSelect">
  <option value="campaign_123">
    Solar Power Impact (Goal: 500 XLM)
  </option>
  <option value="campaign_456">
    Clean Water Initiative (Goal: 1,000 XLM)
  </option>
</select>
```

### Features:
- ✅ **Auto-select** first campaign
- ✅ **Disabled state** jika belum ada campaign
- ✅ **Helper text** yang kontekstual
- ✅ **Validation**: Button disabled jika tidak ada campaign selected

### States:

#### No Campaigns:
```
┌──────────────────────────────────┐
│ Pilih Campaign                   │
│ [Belum ada campaign]     ▼       │
│ ⚠️ Buat campaign terlebih dahulu │
│    untuk mulai menerima donasi   │
└──────────────────────────────────┘

[Kirim Donasi]  ← DISABLED
```

#### With Campaigns:
```
┌──────────────────────────────────┐
│ Pilih Campaign                   │
│ [Solar Power (500 XLM)]   ▼      │
│ ℹ️ Pilih campaign yang ingin     │
│    Anda dukung                   │
└──────────────────────────────────┘

[Kirim Donasi]  ← ENABLED
```

---

## 🔄 User Flow

### Creating Multiple Campaigns:

```
Step 1: Buat Campaign #1
┌────────────────────────────────┐
│ Nama: "Solar Power Impact"     │
│ Goal: 500 XLM                  │
│ Durasi: 30 hari                │
└────────────────────────────────┘
         [Buat Campaign]
              ↓
    ✓ Success notification
              ↓
    Auto-scroll to campaigns
              ↓
┌────────────────────────────────┐
│   Campaign #1                  │
│   Solar Power Impact           │
│   Goal: 500 XLM | 0%           │
│   ████░░░░░░░░                 │
└────────────────────────────────┘

Step 2: Buat Campaign #2
┌────────────────────────────────┐
│ Nama: "Clean Water Init"       │
│ Goal: 1000 XLM                 │
│ Durasi: 45 hari                │
└────────────────────────────────┘
         [Buat Campaign]
              ↓
┌──────────────┬─────────────────┐
│ Campaign #1  │  Campaign #2    │
│ Solar Power  │  Clean Water    │
└──────────────┴─────────────────┘

Step 3: Donasi
┌────────────────────────────────┐
│ Pilih Campaign:                │
│ [Solar Power (500 XLM)]   ▼    │
│                                │
│ Amount: 50 XLM                 │
│                                │
│     [Kirim Donasi]             │
└────────────────────────────────┘
              ↓
    Campaign #1 updated!
              ↓
┌────────────────────────────────┐
│   Campaign #1                  │
│   Solar Power Impact           │
│   Goal: 500 XLM | 10%          │
│   █░░░░░░░░░░                  │
│   Raised: 50 XLM               │
└────────────────────────────────┘
```

---

## 📊 Campaign Storage API

### Get All Campaigns:
```typescript
import { getAllCampaigns } from "~/lib/campaignStorage";

const campaigns = getAllCampaigns();
// Returns: StoredCampaign[]
```

### Add Campaign:
```typescript
import { addCampaign } from "~/lib/campaignStorage";

const newCampaign = addCampaign({
  title: "Solar Power Impact",
  goalXLM: 500,
  deadlineMs: Date.now() + (30 * 24 * 60 * 60 * 1000),
});
// Returns: StoredCampaign with auto-generated id
```

### Get Single Campaign:
```typescript
import { getCampaign } from "~/lib/campaignStorage";

const campaign = getCampaign("campaign_123");
// Returns: StoredCampaign | null
```

### Update Campaign:
```typescript
import { updateCampaign } from "~/lib/campaignStorage";

updateCampaign("campaign_123", {
  goalXLM: 600,  // Update goal
});
```

### Delete Campaign:
```typescript
import { deleteCampaign } from "~/lib/campaignStorage";

deleteCampaign("campaign_123");
```

### Get Active Campaigns:
```typescript
import { getActiveCampaigns } from "~/lib/campaignStorage";

const activeCampaigns = getActiveCampaigns();
// Returns campaigns where deadlineMs > now
```

### Get Expired Campaigns:
```typescript
import { getExpiredCampaigns } from "~/lib/campaignStorage";

const expiredCampaigns = getExpiredCampaigns();
// Returns campaigns where deadlineMs <= now
```

---

## 🎨 Responsive Design

### Breakpoints:

```css
/* Mobile: < 768px */
.grid {
  grid-template-columns: 1fr;
}

/* Tablet: 768px - 1024px */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: > 1024px */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Card Sizes:

```typescript
// Compact mode (for grid)
compact={true}
- padding: p-4 (16px)
- title: text-base (16px)
- Simplified milestone display

// Full mode (for dashboard)
compact={false}
- padding: p-5 (20px)
- title: text-lg (18px)
- Full milestone cards
```

---

## ⚡ Performance Considerations

### LocalStorage:
- ✅ Fast read/write
- ✅ Synchronous operations
- ✅ ~5-10MB storage limit (plenty for campaigns)
- ⚠️ Browser-specific (not synced across devices)

### Re-renders:
```typescript
// Optimized with useMemo
const percent = useMemo(() => {
  return Math.min(100, Math.round((raisedXLM / goalXLM) * 100));
}, [raisedXLM, goalXLM]);
```

### Timer Updates:
```typescript
// Efficient interval cleanup
useEffect(() => {
  const id = setInterval(() => setNow(Date.now()), 1000);
  return () => clearInterval(id);
}, []);
```

---

## 🚀 Future Enhancements

### 1. **Campaign Filtering**
```typescript
// Filter by status
const activeCampaigns = campaigns.filter(c => c.deadlineMs > Date.now());
const completedCampaigns = campaigns.filter(c => c.deadlineMs <= Date.now());

// Filter by goal reached
const successfulCampaigns = campaigns.filter(c => c.raised >= c.goal);
```

### 2. **Campaign Sorting**
```typescript
// Sort by deadline (ending soon first)
campaigns.sort((a, b) => a.deadlineMs - b.deadlineMs);

// Sort by progress (highest first)
campaigns.sort((a, b) => b.percent - a.percent);

// Sort by creation date (newest first)
campaigns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
```

### 3. **Campaign Search**
```tsx
<Input
  placeholder="Search campaigns..."
  onChange={(e) => setSearchQuery(e.target.value)}
/>

{campaigns
  .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  .map(campaign => <CampaignCard {...campaign} />)
}
```

### 4. **Campaign Categories**
```typescript
type StoredCampaign = {
  // ... existing fields
  category?: "social" | "tech" | "environment" | "education";
};
```

### 5. **Campaign Images**
```typescript
type StoredCampaign = {
  // ... existing fields
  imageUrl?: string;
  thumbnailUrl?: string;
};
```

---

## 🧪 Testing Checklist

### Create Multiple Campaigns:
- [ ] Create campaign #1
- [ ] Verify card appears in grid
- [ ] Create campaign #2
- [ ] Verify both cards appear side-by-side
- [ ] Create campaign #3
- [ ] Verify 3-column grid on desktop

### Campaign Selector:
- [ ] Verify dropdown shows all campaigns
- [ ] Verify first campaign auto-selected
- [ ] Change selection and verify state updates
- [ ] Verify helper text updates based on state

### Responsive Design:
- [ ] Test on mobile (< 768px) - 1 column
- [ ] Test on tablet (768px) - 2 columns
- [ ] Test on desktop (> 1024px) - 3 columns

### Empty State:
- [ ] Clear all campaigns
- [ ] Verify empty state message
- [ ] Verify donation form disabled

### Countdown Timer:
- [ ] Verify timer updates every second
- [ ] Verify format changes (days → hours → minutes)
- [ ] Create campaign with 1 day expiry
- [ ] Wait and verify "Berakhir" appears

---

## 📝 Migration Notes

### From Single Campaign to Multiple:

#### Before:
```typescript
// Single campaign in localStorage
localStorage.setItem('campaign_title', 'Solar Power');
localStorage.setItem('campaign_created_at', timestamp);
```

#### After:
```typescript
// Array of campaigns
const campaigns = [
  {
    id: 'campaign_123',
    title: 'Solar Power',
    goalXLM: 500,
    deadlineMs: 1234567890,
    createdAt: timestamp,
  },
  // ... more campaigns
];
localStorage.setItem('stellar_campaigns', JSON.stringify(campaigns));
```

**Migration Strategy:**
- New campaigns automatically use new system
- Old localStorage keys can be ignored (backward compatible)
- No data loss

---

## 🎯 Key Benefits

### For Users:
✅ **Multiple campaigns visible** - Tidak menimpa yang lama  
✅ **Easy campaign selection** - Dropdown yang clear  
✅ **Better organization** - Grid layout rapi  
✅ **Compact cards** - More campaigns fit on screen  
✅ **Live updates** - Countdown timer real-time  

### For Developers:
✅ **Clean architecture** - Separated storage logic  
✅ **Reusable components** - CampaignCard standalone  
✅ **Type-safe** - TypeScript interfaces  
✅ **Easy to extend** - Add features without breaking  
✅ **Well documented** - Clear API and examples  

---

## 🎉 Summary

**Implemented Features:**
1. ✅ Multiple campaigns storage system
2. ✅ Grid layout dengan 3 kolom responsive
3. ✅ Compact campaign cards
4. ✅ Campaign selector di donation form
5. ✅ Live countdown timers
6. ✅ Progress bars dengan animasi
7. ✅ Milestone indicators
8. ✅ Empty state handling
9. ✅ Auto-refresh after creation
10. ✅ Auto-scroll to campaigns section

**Technical Stack:**
- LocalStorage untuk persistence
- React hooks untuk state management
- Framer Motion untuk animations
- TypeScript untuk type safety
- Responsive grid dengan Tailwind CSS

**User Experience:**
- Campaign baru tidak menimpa yang lama ✓
- Card size lebih kecil dan rapi ✓
- Form donasi bisa pilih campaign ✓
- Visual feedback yang jelas ✓
- Smooth animations ✓

---

**Multiple Campaigns Feature is COMPLETE!** 🎊

_Last updated: 2025-10-23_

