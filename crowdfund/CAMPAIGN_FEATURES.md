# Fitur Campaign Crowdfunding

## ✨ Fitur yang Sudah Dibuat

### 1. **Form Buat Campaign Baru** (`CreateCampaignForm.tsx`)

Form untuk membuat campaign crowdfunding baru dengan tampilan yang mirip dengan campaign "Lumen Impact Drive" yang sudah ada.

#### Field Input:
- **Nama Campaign**: Nama deskriptif untuk campaign (contoh: "Lumen Impact Drive", "Clean Water Initiative", dll)
- **Target Goal (XLM)**: Jumlah XLM yang ingin dikumpulkan (akan dikonversi ke stroops secara otomatis)
- **Durasi Campaign (Hari)**: Berapa hari campaign akan berjalan (akan dikonversi ke Unix timestamp)

#### Fitur Keamanan:
- ✅ Validasi semua field harus diisi
- ✅ Membutuhkan wallet connection
- ✅ Transaction signing melalui wallet
- ✅ Error handling yang comprehensive
- ✅ Loading state saat submit

#### Design:
- 🎨 Dark mode dengan zinc color palette (konsisten dengan design system)
- 🎨 Glass morphism effect dengan backdrop blur
- 🎨 Icon PlusCircle dari Lucide React
- 🎨 Emerald green untuk primary button (match dengan progress bar)
- 🎨 Responsive layout dengan max-width

---

## 🔧 Integrasi Smart Contract

### Smart Contract Function: `initialize`

```rust
pub fn initialize(
    env: Env,
    owner: Address,      // Address creator campaign
    goal: i128,          // Target amount (stroops)
    deadline: u64,       // Unix timestamp
    xlm_token: Address,  // Native XLM token address
)
```

### Konversi Otomatis:
1. **XLM → Stroops**: `goalStroops = goalXLM × 10,000,000`
2. **Days → Unix Timestamp**: `deadline = currentTime + (days × 24 × 60 × 60)`

### XLM Token Address (Testnet):
```
CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC
```

---

## 📋 Cara Menggunakan

### Step 1: Connect Wallet
Pastikan wallet Stellar sudah terconnect (Freighter, Albedo, atau wallet lain yang support Testnet)

### Step 2: Isi Form
1. Masukkan nama campaign yang menarik
2. Tentukan target goal dalam XLM (contoh: 1000)
3. Tentukan durasi dalam hari (contoh: 30)

### Step 3: Submit
Klik tombol "Buat Campaign" dan approve transaction di wallet

### Step 4: Monitor
Setelah berhasil, campaign akan tersimpan di blockchain dan bisa mulai menerima donations

---

## 🎯 Use Cases

### Campaign Sosial
- Penggalangan dana untuk bencana alam
- Bantuan pendidikan
- Program kesehatan masyarakat

### Campaign Bisnis
- Crowdfunding untuk startup
- Pembiayaan proyek kreatif
- Pengembangan produk baru

### Campaign Teknologi
- Open source project funding
- Infrastructure development
- Research & development

---

## 🚀 Arsitektur

```
User Input (CreateCampaignForm)
    ↓
Validasi & Konversi
    ↓
Smart Contract Call (initialize)
    ↓
Transaction Signing (Wallet)
    ↓
Submit ke Stellar Testnet
    ↓
Campaign Live & Siap Menerima Donasi
```

---

## 📱 Komponen UI

### CreateCampaignForm.tsx
- Props:
  - `address`: Wallet address pengguna
  - `isConnected`: Status koneksi wallet
  - `contract`: Instance dari Crowdfund.Client
  - `rpcUrl`: RPC endpoint Stellar
  - `networkPassphrase`: Network identifier
  - `onSuccess`: Callback setelah berhasil create

### Integrasi di home.tsx
Form ditampilkan di halaman home sebelum donation form dengan layout:
- Max width: 2xl (768px)
- Padding horizontal: px-4
- Full width responsive

---

## 🎨 Design System

### Colors (Zinc Palette):
- Background: `zinc-900`, `zinc-950/70`
- Border: `zinc-800`
- Text: `zinc-100`, `zinc-300`, `zinc-500`
- Primary (CTA): `emerald-600`, `emerald-700`

### Typography:
- Heading: `text-xl font-semibold`
- Label: `text-sm font-medium`
- Helper text: `text-xs text-zinc-500`

### Interactive States:
- Disabled: opacity reduced, cursor not-allowed
- Loading: animated spinner (⏳)
- Hover: color transition

---

## 💡 Tips Pengembangan Lanjutan

### Multi-Campaign Support
Saat ini contract ini single instance. Untuk support multiple campaigns:
1. Deploy multiple contract instances
2. Atau refactor contract untuk support campaign IDs
3. Tambah campaign registry/list

### Campaign Management
Fitur tambahan yang bisa dikembangkan:
- Edit campaign (owner only)
- Cancel campaign (owner only)
- Withdraw funds setelah goal tercapai
- Refund donors jika goal tidak tercapai

### Analytics Dashboard
- Total campaigns created
- Success rate
- Total funds raised
- Most successful campaigns

---

## 🔐 Security Notes

1. **Owner Verification**: `owner.require_auth()` memastikan hanya creator yang bisa initialize
2. **Input Validation**: Smart contract akan panic jika parameter invalid
3. **Transaction Signing**: Semua transaction harus di-approve oleh user wallet
4. **Immutable Data**: Setelah initialize, campaign parameters tidak bisa diubah

---

## 📝 Testing Checklist

- [ ] Connect wallet testnet
- [ ] Isi semua field dengan data valid
- [ ] Submit dan approve transaction
- [ ] Verify campaign data tersimpan di blockchain
- [ ] Test dengan berbagai nilai (XLM kecil/besar, durasi pendek/panjang)
- [ ] Test error cases (tanpa connection, field kosong, dll)

---

## 🎓 Educational Value

Proyek ini mendemonstrasikan:
- ✅ Stellar smart contract (Soroban) integration
- ✅ React/TypeScript frontend development
- ✅ Wallet integration (Freighter)
- ✅ Transaction signing & submission
- ✅ Type-safe contract bindings
- ✅ Modern UI/UX dengan Tailwind CSS
- ✅ Animation dengan Motion (Framer Motion)
- ✅ State management dengan React hooks

Perfect untuk learning blockchain development! 🚀

