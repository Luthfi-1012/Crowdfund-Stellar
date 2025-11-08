# 🚀 Quick Reference Card

## Layout Cheat Sheet untuk Developer

---

## 📏 Max-Width Guidelines

```typescript
// Hero Section
"w-full"                    // Full width

// Section Container
"max-w-7xl mx-auto"         // Main container (1280px)

// Create Campaign
"max-w-3xl mx-auto"         // 768px centered

// Campaign Dashboard
"max-w-4xl mx-auto"         // 896px centered

// Donation Section
"max-w-5xl mx-auto"         // 1024px centered
```

---

## 🎨 Color Quick Reference

### Primary Actions (Emerald)
```css
bg-emerald-600              /* Buttons */
hover:bg-emerald-700        /* Button hover */
text-emerald-400            /* Accent text */
border-emerald-500/20       /* Subtle border */
from-emerald-500/10         /* Gradient start */
```

### Warning/Info (Amber)
```css
bg-amber-500/10             /* Warning bg */
border-amber-500/20         /* Warning border */
text-amber-400              /* Warning text */
```

### Neutral (Zinc)
```css
bg-zinc-950                 /* Page background */
bg-zinc-900                 /* Card surface */
bg-zinc-800                 /* Input background */
border-zinc-800             /* Default border */
border-zinc-800/50          /* Subtle border */
text-zinc-100               /* Headings */
text-zinc-300               /* Labels */
text-zinc-400               /* Body text */
text-zinc-500               /* Helper text */
```

---

## 📐 Spacing Scale

```typescript
// Component internal
gap-2                       // 8px - tight
gap-4                       // 16px - normal
gap-6                       // 24px - comfortable

// Between sections
space-y-6                   // 24px - card elements
space-y-8                   // 32px - related sections
space-y-12                  // 48px - section gap
space-y-16                  // 64px - major sections

// Padding
p-4                         // 16px - compact card
p-6                         // 24px - standard card
py-6 px-8                   // 24px/32px - form card
```

---

## 🔤 Typography Scale

```typescript
// Headings
"text-4xl font-bold"                  // Hero (36px)
"text-2xl sm:text-3xl font-bold"      // Section title (24-30px)
"text-xl font-semibold"               // Card title (20px)

// Body
"text-base"                           // Body text (16px)
"text-sm"                             // Secondary text (14px)
"text-xs"                             // Helper text (12px)

// Special
"text-sm font-medium"                 // Labels
"text-lg font-medium"                 // Large buttons
```

---

## 🎯 Common Patterns

### Card Header
```tsx
<div className="flex items-center gap-3 pb-2 border-b border-zinc-800/50">
  <Icon className="size-6 text-emerald-400" />
  <h3 className="text-xl font-semibold text-zinc-100">Title</h3>
</div>
```

### Form Input
```tsx
<div className="flex flex-col gap-2">
  <label htmlFor="id" className="text-sm font-medium text-zinc-300">
    Label
  </label>
  <Input
    id="id"
    className="bg-zinc-900 border-zinc-800 text-zinc-100 py-6"
    placeholder="..."
  />
  <p className="text-xs text-zinc-500">Helper text</p>
</div>
```

### Primary Button
```tsx
<Button
  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 text-lg"
  disabled={!condition}
>
  {loading ? "Loading..." : "Action"}
</Button>
```

### Warning Card
```tsx
<div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
  <p className="text-sm text-amber-400">
    💡 Warning message
  </p>
</div>
```

### Stats Card
```tsx
<div className="p-6 rounded-lg bg-gradient-to-br from-emerald-500/10 to-lime-500/10 border border-emerald-500/20">
  <p className="text-sm text-zinc-400 mb-2">Label</p>
  <p className="text-4xl font-bold text-emerald-400">
    {value}
  </p>
  <p className="text-lg text-zinc-300 mt-1">Unit</p>
</div>
```

### Grid Layout (2-column, responsive)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <Card>{/* Left */}</Card>
  <Card>{/* Right */}</Card>
</div>
```

### Section Structure
```tsx
<section className="space-y-6">
  <div className="text-center space-y-2">
    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
      Title
    </h2>
    <p className="text-zinc-400 text-sm sm:text-base">
      Subtitle
    </p>
  </div>
  <div className="max-w-4xl mx-auto">
    {/* Content */}
  </div>
</section>
```

---

## 📱 Responsive Patterns

### Text Sizes
```typescript
"text-2xl sm:text-3xl"      // Section titles
"text-sm sm:text-base"      // Subtitles
"px-4 sm:px-6 lg:px-8"      // Padding
```

### Grid Breakpoints
```typescript
"grid-cols-1 sm:grid-cols-2"          // 1 → 2 columns
"grid-cols-1 lg:grid-cols-2"          // 1 → 2 columns (desktop)
"flex-col sm:flex-row"                // Stack → horizontal
```

### Visibility
```typescript
"hidden sm:inline"          // Hide on mobile
"sm:hidden"                 // Show only on mobile
```

---

## 🎬 Animation Classes

### Custom (from app.css)
```css
animate-gradient             /* Animated gradient bg */
glass-effect                 /* Backdrop blur */
shine-effect                 /* Hover shine */
animate-pulse                /* Pulse animation */
animate-spin                 /* Loading spinner */
```

### Transitions
```css
transition                   /* All properties */
transition-colors            /* Color changes only */
duration-200                 /* 200ms */
duration-500                 /* 500ms */
```

---

## 🔧 Utility Combos

### Emerald Button
```typescript
"bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-lg transition-colors"
```

### Card Base
```typescript
"rounded-xl border border-zinc-800 bg-zinc-950/70 p-6 shadow-lg backdrop-blur"
```

### Input Base
```typescript
"bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 py-6 rounded-lg"
```

### Subtle Border
```typescript
"border-b border-zinc-800/50"
"border border-zinc-800/50"
```

### Gradient Text
```typescript
"bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent"
```

---

## 🎯 Component Props Patterns

### CreateCampaignForm
```typescript
<CreateCampaignForm
  address={address}
  isConnected={isConnected}
  contract={contract}
  rpcUrl={RPC_URL}
  networkPassphrase={networkPassphrase}
  onSuccess={() => {}}
/>
```

### CampaignDashboard
```typescript
<CampaignDashboard
  getOverview={getCampaignOverviewLive}
  pollIntervalMs={5000}
  className=""
/>
```

---

## 🐛 Common Issues & Fixes

### Issue: Width overflow on mobile
```typescript
// ❌ Bad
className="w-1/3"

// ✅ Good
className="w-full max-w-md mx-auto"
```

### Issue: Text too small on mobile
```typescript
// ❌ Bad
className="text-xs"

// ✅ Good
className="text-sm sm:text-base"
```

### Issue: Button too small to tap
```typescript
// ❌ Bad
className="py-2"

// ✅ Good (44px min height)
className="py-3 sm:py-4"
```

### Issue: Grid not stacking on mobile
```typescript
// ❌ Bad
className="grid grid-cols-2"

// ✅ Good
className="grid grid-cols-1 lg:grid-cols-2"
```

---

## 📋 Testing Checklist

### Quick Visual Test
```bash
# Mobile
- [ ] Open DevTools → Toggle device (375px)
- [ ] Check all sections stack vertically
- [ ] Text is readable (min 14px)
- [ ] Buttons are tap-friendly (min 44px height)
- [ ] No horizontal scroll

# Tablet
- [ ] Check at 768px width
- [ ] Grids adapt properly
- [ ] Spacing looks balanced

# Desktop
- [ ] Check at 1280px+ width
- [ ] Content doesn't stretch too wide
- [ ] Hover effects work
- [ ] Layout is centered
```

### Accessibility Test
```bash
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Labels associated with inputs
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader reads logically
```

---

## 🎨 Design Tokens

```typescript
// Store these as constants if needed
const COLORS = {
  primary: 'emerald-600',
  primaryHover: 'emerald-700',
  accent: 'emerald-400',
  warning: 'amber-500',
  surface: 'zinc-900',
  border: 'zinc-800',
};

const SPACING = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
  xxl: 'gap-16',
};

const MAX_WIDTHS = {
  form: 'max-w-3xl',
  dashboard: 'max-w-4xl',
  grid: 'max-w-5xl',
  container: 'max-w-7xl',
};
```

---

## 🚀 Quick Copy-Paste Templates

### New Section
```tsx
<section className="space-y-6">
  <div className="text-center space-y-2">
    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
      Section Title
    </h2>
    <p className="text-zinc-400 text-sm sm:text-base">
      Section description
    </p>
  </div>
  <div className="max-w-4xl mx-auto">
    {/* Your content */}
  </div>
</section>
```

### New Card
```tsx
<Card className="flex flex-col gap-y-6 py-6 px-8">
  <div className="flex items-center gap-3 pb-2 border-b border-zinc-800/50">
    <Icon className="size-6 text-emerald-400" />
    <h3 className="text-xl font-semibold text-zinc-100">Card Title</h3>
  </div>
  {/* Card content */}
</Card>
```

### Loading State
```tsx
{isLoading ? (
  <span className="flex items-center gap-2">
    <span className="animate-spin">⏳</span>
    Loading...
  </span>
) : (
  <span>Content</span>
)}
```

---

## 💡 Pro Tips

1. **Consistency First**: Use existing patterns before creating new ones
2. **Mobile First**: Design for 375px, then enhance
3. **Spacing System**: Stick to 2-4-6-8-12-16 scale
4. **Color Palette**: Use predefined colors only
5. **Accessibility**: Always add labels, ARIA, and focus states
6. **Performance**: Minimize re-renders, use memo where needed

---

## 📚 Quick Links

- **Main Layout**: `crowdfund/app/routes/home.tsx`
- **Create Form**: `crowdfund/app/components/CreateCampaignForm.tsx`
- **Dashboard**: `crowdfund/app/components/CampaignDashboard.tsx`
- **Styles**: `crowdfund/app/app.css`
- **Docs**: `crowdfund/LAYOUT_IMPROVEMENTS.md`

---

**Keep this handy for quick reference during development!** 📌

