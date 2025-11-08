# 🚀 Getting Started - Quick Guide

## ⚡ Quick Start (5 Menit)

### Step 1: Install & Run (2 menit)
```bash
# Di folder crowdfund
npm install
npm run dev
```

✅ Browser otomatis buka di `http://localhost:5173`

---

### Step 2: Connect Wallet (1 menit)

1. **Install Freighter Extension** (jika belum punya)
   - Chrome: [Freighter Extension](https://chrome.google.com/webstore/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk)
   
2. **Switch ke Testnet**
   - Buka Freighter
   - Settings → Network
   - Pilih **"Testnet"**

3. **Connect di App**
   - Klik "Connect Wallet" di header
   - Approve connection
   - ✅ Address muncul di header

---

### Step 3: Get Testnet XLM (1 menit)

**Opsi A - Via Freighter:**
1. Buka Freighter wallet
2. Klik "Fund with Friendbot"
3. ✅ Dapat 10,000 XLM testnet

**Opsi B - Via Laboratory:**
1. Buka [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)
2. Generate keypair
3. Get testnet XLM
4. Import ke Freighter

---

### Step 4: Test Aplikasi (1 menit)

#### Test Create Campaign:
```
1. Scroll ke "Buat Campaign Baru"
2. Isi:
   - Nama: "Test Campaign"
   - Goal: 100
   - Durasi: 7
3. Klik "Buat Campaign"
4. Approve di wallet
5. ✅ Success!
```

#### Test Donation:
```
1. Scroll ke "Berikan Donasi"
2. Masukkan jumlah: 5
3. Klik "Kirim Donasi"
4. Approve di wallet
5. ✅ Dashboard update otomatis!
```

---

## 🎯 What You'll See

### Hero Section
```
┌──────────────────────────────────┐
│  Project [Stellar]               │
│  Platform crowdfunding           │
│  terdesentralisasi              │
└──────────────────────────────────┘
```

### Section 1: Buat Campaign
```
┌──────────────────────────────────┐
│ + Form Pembuatan Campaign        │
│                                  │
│ Nama: ________________           │
│ Goal: _____ Duration: ____       │
│                                  │
│ [Preview Card muncul otomatis]   │
│                                  │
│ [     Buat Campaign      ]       │
└──────────────────────────────────┘
```

### Section 2: Dashboard
```
┌──────────────────────────────────┐
│ Lumen Impact Drive   [Refresh]   │
│ Deadline: 3d 12h 45m 23s         │
│                                  │
│ ████████████░░░░░░░  62%         │
│                                  │
│ [✓ 50%]  [✓ 75%]  [⊗ 100%]     │
└──────────────────────────────────┘
```

### Section 3: Donasi
```
┌──────────────┬───────────────────┐
│ Form Donasi  │ Live Statistics   │
│              │                   │
│ Balance: XX  │  Total: 620.00    │
│ Amount: ___  │       XLM         │
│              │                   │
│ [Kirim]      │ ● Aktif  Testnet  │
└──────────────┴───────────────────┘
```

---

## 📱 Test Responsive

### Mobile View (< 640px)
```bash
# Di DevTools
1. F12 → Toggle Device Toolbar
2. Select iPhone/Android
3. Verify:
   ✓ Single column layout
   ✓ Text readable
   ✓ Buttons tap-friendly
   ✓ No horizontal scroll
```

### Tablet View (768px)
```bash
# Di DevTools
1. Set width: 768px
2. Verify:
   ✓ Adaptive grids
   ✓ Balanced spacing
   ✓ Comfortable reading
```

### Desktop View (> 1024px)
```bash
# Full browser window
Verify:
   ✓ 2-column grid
   ✓ Centered content
   ✓ Hover effects work
   ✓ Max-widths respected
```

---

## ✅ Feature Checklist

### Create Campaign
- [ ] Connect wallet berhasil
- [ ] Form bisa diisi semua field
- [ ] Preview card muncul otomatis
- [ ] Validation bekerja (empty fields)
- [ ] Button disabled jika invalid
- [ ] Loading state muncul saat submit
- [ ] Transaction di-approve
- [ ] Success confirmation
- [ ] Form reset setelah success

### Dashboard
- [ ] Campaign data load
- [ ] Progress bar animasi
- [ ] Milestone tracking bekerja
- [ ] Countdown timer live
- [ ] Refresh button works
- [ ] Auto-refresh setiap 5 detik

### Donation
- [ ] Balance display correct
- [ ] Input validation bekerja
- [ ] Button state correct
- [ ] Transaction successful
- [ ] Total update otomatis
- [ ] Delta display muncul
- [ ] Statistics update

---

## 🐛 Common Issues & Quick Fixes

### Issue: Wallet Tidak Connect
**Symptoms:** Button tidak respond, no address shown

**Fix:**
```bash
1. Check Freighter installed
2. Check network = Testnet
3. Refresh page (F5)
4. Try again
```

### Issue: Transaction Gagal
**Symptoms:** Error di console, transaction rejected

**Fix:**
```bash
1. Check balance cukup (min 1 XLM)
2. Check network connection
3. Check campaign belum expired
4. Try smaller amount
```

### Issue: Dashboard Tidak Update
**Symptoms:** Dashboard stuck, no live data

**Fix:**
```bash
1. Check console errors (F12)
2. Check RPC endpoint accessible
3. Click Refresh button
4. Hard refresh (Ctrl+F5)
```

### Issue: Preview Tidak Muncul
**Symptoms:** No preview card di create form

**Fix:**
```bash
1. Check semua field terisi
2. Check values valid (numbers)
3. Inspect console errors
```

---

## 🎓 Learning Path

### For Users (Non-Technical)
1. ✅ Connect wallet (2 min)
2. ✅ Get testnet XLM (1 min)
3. ✅ Create first campaign (3 min)
4. ✅ Make donation (2 min)
5. ✅ Monitor dashboard (ongoing)

### For Developers
1. ✅ Read `README.md` (10 min)
2. ✅ Read `CAMPAIGN_FEATURES.md` (15 min)
3. ✅ Read `LAYOUT_SUMMARY.md` (10 min)
4. ✅ Check `QUICK_REFERENCE.md` (5 min)
5. ✅ Explore code (30+ min)
6. ✅ Build features (ongoing)

---

## 📚 Documentation Index

### User Guides
- **README.md** - Main documentation, getting started
- **GETTING_STARTED.md** - This file, quick guide

### Technical Docs
- **CAMPAIGN_FEATURES.md** - Campaign features & smart contract
- **LAYOUT_IMPROVEMENTS.md** - Layout technical details
- **LAYOUT_SUMMARY.md** - Layout overview & comparison
- **VISUAL_GUIDE.md** - Visual comparisons & ASCII art
- **QUICK_REFERENCE.md** - Developer cheat sheet
- **COMPLETED_WORK.md** - Work summary & achievements

### Smart Contract
- **contracts/crowdfunding/src/lib.rs** - Rust smart contract
- **contracts/crowdfunding/src/test.rs** - Contract tests

---

## 🎯 Success Criteria

Anda berhasil jika:

✅ **Functional**
- [ ] Wallet connected
- [ ] Campaign created
- [ ] Donation sent
- [ ] Dashboard live

✅ **Visual**
- [ ] Layout terlihat rapi
- [ ] Responsive di mobile
- [ ] Animations smooth
- [ ] Colors consistent

✅ **UX**
- [ ] Form mudah diisi
- [ ] Preview helpful
- [ ] Feedback jelas
- [ ] No confusing errors

---

## 💡 Pro Tips

### For Best Experience:
1. 🌐 **Use Chrome/Brave** - Best wallet extension support
2. 📱 **Test Mobile** - Open on phone untuk real mobile experience
3. 🔄 **Auto-Refresh** - Dashboard update tiap 5 detik otomatis
4. 💾 **Save Address** - Bookmark campaign contract address
5. 📊 **Monitor Console** - F12 untuk debug info

### Development Tips:
1. 🔥 **Hot Reload** - Code changes auto-reload
2. 🎨 **Tailwind DevTools** - Install untuk inspect classes
3. 📝 **TypeScript** - Strict types untuk fewer bugs
4. 🧪 **Test Testnet** - Always test di testnet dulu
5. 📚 **Read Docs** - All answers ada di docs

---

## 🚀 Next Steps

### After Getting Started:

#### Learn More:
- [ ] Explore all documentation files
- [ ] Try different campaign scenarios
- [ ] Test edge cases
- [ ] Review smart contract code
- [ ] Check Stellar documentation

#### Customize:
- [ ] Change colors (edit Tailwind classes)
- [ ] Add more fields to form
- [ ] Customize dashboard layout
- [ ] Add new features
- [ ] Deploy to production

#### Share:
- [ ] Show to team
- [ ] Get feedback
- [ ] Iterate improvements
- [ ] Deploy to testnet/mainnet
- [ ] Launch! 🎉

---

## 🎊 Congratulations!

Jika sudah sampai sini, berarti Anda sudah:
1. ✅ Setup environment berhasil
2. ✅ Wallet connected
3. ✅ Test campaign created
4. ✅ Donation sent
5. ✅ Dashboard working

**You're ready to build amazing crowdfunding campaigns on Stellar!** 🌟

---

## 📞 Need Help?

### Quick Answers:
1. Check documentation files di repo
2. Check console (F12) untuk errors
3. Read Troubleshooting di README.md
4. Check Stellar Discord community

### Resources:
- [Stellar Docs](https://developers.stellar.org)
- [Soroban Docs](https://soroban.stellar.org)
- [React Router Docs](https://reactrouter.com)
- [Tailwind Docs](https://tailwindcss.com)

---

**Happy Building!** 🚀✨

_Last updated: 2025-10-23_

