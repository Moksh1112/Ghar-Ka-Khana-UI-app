# 🏠 GHAR KA KHANA

> **Planned homemade meals for students living away from home.**

---

## Overview

**GHAR KA KHANA** is a planned homemade-meal platform that connects students, hostel residents and PG residents with local home cooks and homemakers who prepare fresh, homemade meals.

The platform is built around a simple but powerful idea: **home cooks publish planned meals for upcoming dates, students reserve them in advance by paying a small booking amount, and meals are collected at a designated location or picked up directly.** The provider prepares based on confirmed demand rather than guesswork.

This is **not** an instant restaurant-delivery app. GHAR KA KHANA focuses on advance planning, partial booking payments, and batch-based collection — creating a practical model for both sides.

---

## Problem Statement

### The Student Side

Students moving away from home for education often struggle to consistently find food that feels:

- **Homemade** — cooked with care, not mass-produced
- **Fresh** — prepared the same day, not reheated
- **Tasty** — familiar flavours and regional variety
- **Hygienic** — made in a home kitchen with personal attention
- **Trustworthy** — from someone they can know and review

Canteens, mess halls and food delivery apps serve a purpose, but they rarely replicate the comfort and familiarity of home-cooked meals.

### The Home-Cook Side

Many moms, homemakers and skilled home cooks have excellent cooking abilities but lack a simple platform to:

- Showcase their cooking and present their meals
- Connect with nearby students and working professionals
- Build a reputation around their food
- Plan their preparation based on actual demand

---

## The Real-Life Problem

> A student named Moksh moves to another city for college and lives in a hostel.
>
> Tomorrow, he wants a homemade Gujarati thali for lunch.
>
> Nearby, a home cook named Seema Aunty is willing to prepare Gujarati Thali for tomorrow's lunch — but there is no convenient way for Moksh to discover and reserve it in advance.
>
> **GHAR KA KHANA connects these two sides.**

---

## The Gap We Identified

```
Students need homemade food
            +
Home cooks can prepare homemade food
            ↓
     No convenient connection
            ↓
       GHAR KA KHANA
```

The platform organises this connection around **planned future meals** — meals that are published in advance, reserved before a cutoff time, and prepared based on confirmed bookings.

---

## Our Solution

A provider publishes a planned meal:

```
Gujarati Thali
Tomorrow • Lunch
₹120 per serving
Reserve for ₹30 (booking amount)
Maximum 25 servings
Pickup window: 12:30 PM – 2:00 PM
Booking closes: Tonight 10:00 PM
```

A customer:

1. Discovers the meal on the Home or Discover screen
2. Views meal details, provider details, rating and reviews
3. Checks availability (booked servings vs. maximum)
4. Selects fulfillment method — Bulk Delivery or Self Pickup
5. Selects a collection location (for Bulk Delivery)
6. Pays the booking amount (₹30)
7. Receives a confirmed reservation with an OTP
8. Tracks preparation and status through a live timeline
9. Collects the meal at the designated location or provider's kitchen
10. Pays the remaining amount (₹90) at collection

---

## Why Planned Meals?

This model is fundamentally different from conventional food ordering:

### Conventional Ordering

```
Customer orders → Food is prepared → Food is delivered
```

### GHAR KA KHANA

```
Provider plans meal in advance
        ↓
Students reserve before cutoff
        ↓
Confirmed demand becomes visible
        ↓
Provider prepares accordingly
        ↓
Meals are collected at a common point
```

**The benefit:** The provider has better visibility into expected demand and can prepare based on confirmed reservations instead of relying entirely on guesswork. This model is designed to reduce uncertainty in preparation and support better quantity planning.

---

## How GHAR KA KHANA Works

```
┌───────────────────────────────────────────────┐
│              GHAR KA KHANA                    │
│                                               │
│     Home Cook ──── publishes ──── Planned Meal│
│                                               │
│     Student ────── reserves ─── Reservation   │
│                                               │
│     Confirmed demand → Provider prepares      │
│                                               │
│     Bulk Collection / Self Pickup             │
└───────────────────────────────────────────────┘
```

---

## Target Users

### Customers
- College students living in hostels
- PG (Paying Guest) residents
- People living away from home who want homemade food

### Providers
- Moms and homemakers
- Skilled home cooks
- Local individuals preparing homemade meals

### Admin
- Platform administrator responsible for monitoring and verification

---

## User Roles

### 🛒 Customer

| Capability | Description |
|---|---|
| Home | Personalised greeting, upcoming planned meals, trusted providers, search and filter chips |
| Discover | Browse all active planned meals and verified providers |
| Search | Search bar for meals, providers, cuisines |
| Filter Chips | Tomorrow, Lunch, Dinner, Vegetarian, Under ₹150, Top Rated |
| Meal Details | Full meal information — image, date, meal type, time window, price, booking amount, provider, rating, availability progress bar |
| Provider Profile | Provider information — name, speciality, rating, reviews, distance, meals served, reorder rate, menu |
| Reservation | Select fulfillment method, choose pickup location, confirm booking |
| Checkout | Order summary, booking amount breakdown, fulfillment selection, payment confirmation |
| My Reservations | List of all reservations with status badges and navigation to order status |
| Order Status | Live status timeline, collection OTP, meal summary, remaining payment info |
| Favorites | Placeholder tab (Coming Soon) |
| Profile | User info, hostel location, Appearance toggle (Light/Dark), menu items, logout |

### 👩‍🍳 Provider

| Capability | Description |
|---|---|
| Dashboard | Meals to prepare count, active reservations, booking earnings, preparation batches grouped by meal |
| Active Tasks | All reservations with status management — Start Preparing → Mark Ready → Send Batch / Ready for Pickup |
| My Planned Meals | View published meals with status, price, booked/max servings, cutoff time; Plan New Meal button |
| Earnings | Placeholder tab (Coming Soon) |
| Profile | Kitchen name, verified badge, stats (rating, meals served, reviews), about section, cuisine, Appearance toggle, menu items, logout |

### 🛡️ Admin

| Capability | Description |
|---|---|
| Dashboard | Platform metrics (active meals, providers, reservations, platform revenue), pending provider verification with approve action, active meals list, recent reservations |
| Users | All system users with role badges |
| Providers | Full provider list with verification status; approve unverified providers |
| Orders | All platform reservations with meal, provider, amount, fulfillment method, status |
| Logout | Available from dashboard header |

---

## Core Value Proposition

### For Students

- **Homemade** — Meals are centred around home-cooked food, not restaurant kitchens
- **Tasty** — Food is presented around the cooking style and regional specialities of home providers
- **Hygienic** — Hygiene is an important value of the home-food model
- **Trustworthy** — Provider information, ratings and reviews help customers make informed decisions
- **Planned** — Meals are available in advance rather than relying only on instant ordering

### For Home Cooks

- Showcase cooking skills and present homemade meals on a dedicated platform
- Reach relevant customers — students who specifically want homemade food
- Build visibility through ratings and reviews
- Plan preparation based on confirmed reservations
- Grow through their cooking

---

## Planned Meal Model

A Planned Meal represents a specific meal that a provider plans to prepare for a future date.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `pm1`) |
| `providerId` | `string` | Reference to the provider |
| `name` | `string` | Meal name (e.g. "Gujarati Thali") |
| `description` | `string` | Detailed description of the meal |
| `image` | `ImageSource` | Food photograph |
| `date` | `string` | Target date (e.g. "Tomorrow") |
| `mealType` | `string` | Meal period — Lunch, Dinner, Breakfast |
| `startTime` | `string` | Pickup window start (e.g. "12:30 PM") |
| `endTime` | `string` | Pickup window end (e.g. "2:00 PM") |
| `price` | `number` | Full meal price in ₹ |
| `bookingAmount` | `number` | Advance booking amount in ₹ |
| `maxServings` | `number` | Maximum available servings |
| `bookedServings` | `number` | Currently booked servings |
| `cutoffTime` | `string` | Reservation cutoff (e.g. "Tonight 10:00 PM") |
| `pickupLocations` | `string[]` | Available collection location IDs |
| `fulfillmentOptions` | `string[]` | `BULK_DELIVERY`, `SELF_PICKUP` or both |
| `status` | `string` | `ACTIVE`, `COMPLETED`, or `DRAFT` |
| `rating` | `number` | Average rating |
| `reviews` | `number` | Total review count |

---

## Reservation Model

Each customer reservation is an independent booking against a planned meal.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique reservation ID (e.g. `GK-RES-1234`) |
| `customerId` | `string` | Reference to the customer |
| `plannedMealId` | `string` | Reference to the planned meal |
| `providerId` | `string` | Reference to the provider |
| `quantity` | `number` | Number of servings reserved |
| `totalAmount` | `number` | Full price × quantity |
| `bookingAmountPaid` | `number` | Booking amount × quantity (paid at reservation) |
| `remainingAmount` | `number` | Amount payable at collection |
| `fulfillmentMethod` | `string` | `BULK_DELIVERY` or `SELF_PICKUP` |
| `pickupLocation` | `string?` | Collection location ID (for bulk delivery) |
| `status` | `string` | Current reservation status (see status flow below) |
| `createdAt` | `string` | ISO timestamp of reservation creation |
| `otp` | `string` | 4-digit collection OTP |

> A reservation belongs to a customer. Multiple compatible reservations for the same meal and collection location can be grouped operationally into a bulk fulfillment batch by the provider.

---

## Partial Payment Model

GHAR KA KHANA uses a split-payment approach:

```
Meal Price            ₹120
Booking Amount         ₹30   ← paid at reservation
Remaining Amount       ₹90   ← paid at collection
```

**Flow:**

```
Student reserves a planned meal
        ↓
Pays ₹30 booking amount
        ↓
Reservation confirmed (OTP generated)
        ↓
₹90 remains payable at collection
```

> **Note:** The current implementation uses simulated local payment. No real payment gateway is integrated. The booking amount is deducted from the application state upon reservation confirmation.

---

## Bulk Fulfillment Model

GHAR KA KHANA's "bulk" model does **not** mean one customer orders many meals. Instead:

> Multiple individual reservations for a compatible planned meal and collection location can be grouped into a single preparation and fulfillment batch.

### Example

```
Gujarati Thali — Tomorrow Lunch
Provider: Seema Aunty

Moksh     → 1 meal   → Hostel A Reception
Student B → 2 meals  → Hostel A Reception
Student C → 1 meal   → Hostel A Reception
Student D → 3 meals  → Hostel A Reception

Total = 7 meals → Hostel A Batch
```

The provider sees this on their dashboard as:

> **Gujarati Thali — 7 Items** (preparation batch)

### Grouping Logic

```
Same Provider
    +
Same Planned Meal
    +
Same Date & Meal Period
    +
Same Pickup Location
    =
One Fulfillment Batch
```

### Bulk Fulfillment Flow

```
Provider Plans Meal
        ↓
Students Reserve Individually
        ↓
Reservations Confirmed (booking amount paid)
        ↓
Compatible Reservations Grouped
        ↓
Provider Sees Required Quantity on Dashboard
        ↓
Meals Prepared
        ↓
Batch Sent to Designated Collection Point
        ↓
Students Collect Their Meals (present OTP)
        ↓
Remaining Amount Paid
        ↓
Reservation Completed
```

The system is designed around **common collection points** (hostel reception, PG gate, etc.) — not individual doorstep delivery. There is no delivery fleet.

---

## Self Pickup

The alternate fulfillment option:

```
Student selects Self Pickup at checkout
        ↓
Reservation confirmed
        ↓
Provider prepares meal
        ↓
Student goes to provider's location
        ↓
Presents OTP, pays remaining amount
        ↓
Meal collected
```

---

## Reservation Status Flow

The application tracks reservations through the following statuses:

### Bulk Delivery Flow

```
RESERVED → PREPARING → READY → AT PICKUP LOCATION → READY FOR COLLECTION → COLLECTED
```

### Self Pickup Flow

```
RESERVED → PREPARING → READY → READY FOR PICKUP → COLLECTED
```

| Status | Meaning |
|---|---|
| `RESERVED` | Booking amount paid, reservation confirmed |
| `PREPARING` | Provider has started preparing the meal |
| `READY` | Meal is prepared and packed |
| `AT PICKUP LOCATION` | Batch has been sent to the collection point (bulk only) |
| `READY FOR COLLECTION` | Available for student pickup at location (bulk only) |
| `READY FOR PICKUP` | Available for student pickup at provider's kitchen (self pickup) |
| `COLLECTED` | Student has collected the meal |

The provider advances the status through the **Active Tasks** screen using action buttons:

- **RESERVED** → "Start Preparing"
- **PREPARING** → "Mark Ready"
- **READY** → "Send Batch / Ready for Pickup"

---

## Complete End-to-End Example

> **This is an illustrative example based on the application's workflow, not a real transaction.**

1. **Seema Aunty** publishes a planned meal:
   - **Gujarati Thali** — Tomorrow, Lunch
   - Price: ₹120 | Booking: ₹30 | Capacity: 25 servings
   - Pickup: 12:30 PM – 2:00 PM
   - Booking closes: Tonight 10:00 PM

2. **Moksh** opens the app, sees the meal on the Home screen, taps to view details.

3. He selects **Bulk Delivery** → **Hostel A Reception** → confirms checkout.

4. ₹30 booking amount is paid. Reservation is confirmed with OTP `4821`.

5. Other students also reserve the same meal for Hostel A.

6. **Seema Aunty** opens her Provider Dashboard and sees:
   - **Gujarati Thali — 8 Items** (preparation batch)

7. She taps "Start Preparing" → status moves to **PREPARING**.

8. When food is ready, she taps "Mark Ready" → status moves to **READY**.

9. She sends the batch to Hostel A → status moves to **AT PICKUP LOCATION**.

10. **Moksh** checks his Orders screen, sees the live timeline tracking each step.

11. He goes to Hostel A Reception, shows his OTP, and pays the remaining ₹90.

12. Reservation status → **COLLECTED**.

---

## Customer Journey

```
Login (role selection)
        ↓
Home Screen (greeting, upcoming meals, providers)
        ↓
Discover / Search (browse all meals and providers)
        ↓
Meal Details (full info, availability, provider link)
        ↓
Provider Profile (rating, reviews, menu)
        ↓
Reserve (select fulfillment, choose location)
        ↓
Checkout (order summary, booking amount, confirm)
        ↓
Reservation Confirmed (OTP generated)
        ↓
My Reservations (list of bookings with status)
        ↓
Order Status (live timeline, OTP, remaining payment)
        ↓
Collection (present OTP, pay remaining)
```

## Provider Journey

```
Login (role selection)
        ↓
Provider Dashboard (metrics, preparation batches)
        ↓
My Planned Meals (view/manage published meals)
        ↓
Active Tasks (reservation list with status actions)
        ↓
Update Status (RESERVED → PREPARING → READY → Sent)
        ↓
Batch Fulfillment / Self Pickup
        ↓
Collection Complete
```

## Admin Journey

```
Login (role selection)
        ↓
Admin Dashboard (metrics, pending verification, meals, reservations)
        ↓
Users (view all system users and roles)
        ↓
Providers (manage providers, approve applications)
        ↓
Orders (view all platform reservations)
        ↓
Logout
```

---

## Why GHAR KA KHANA Is Different

GHAR KA KHANA focuses on **planned homemade meals** rather than conventional instant restaurant ordering:

```
Planned Meal (published in advance)
        ↓
Advance Reservation (booking amount paid)
        ↓
Confirmed Demand (provider sees quantity)
        ↓
Provider Preparation (based on actual bookings)
        ↓
Bulk Collection / Self Pickup (common points, not doorstep)
```

This approach differs from on-demand food delivery in three key ways:

1. **Meals are planned, not reactive** — providers publish what they will cook
2. **Demand is confirmed before preparation** — reducing uncertainty
3. **Collection is centralised** — no individual delivery fleet required

---

## UI/UX Design

The application follows a clean, mobile-first design language:

- **Orange + Black + White** brand identity throughout
- Food-focused imagery with real meal photographs
- Strong visual hierarchy with clear typography
- Reusable `MealCard` component showing meal image, date, type, provider, price, booking amount, and availability progress bar
- Reusable `ProviderCard` component showing provider image, name, speciality, rating and verification status
- Shared `Button` component with `primary`, `secondary`, `outline` and `ghost` variants in `sm`, `md`, `lg` sizes
- Status timeline with animated dots and connecting lines on the Order Status screen
- Reservation-focused CTAs ("Reserve for ₹30" instead of "Add to Cart")
- Safe-area-aware navigation bars and bottom tab bars
- Responsive layout adapting to different device sizes

---

## Light and Dark Theme

GHAR KA KHANA supports both **Light Mode** and **Dark Mode**:

- Controlled via a segmented **Appearance** toggle in the Profile screen (both Customer and Provider)
- Theme preference is persisted locally using `AsyncStorage`
- Applies application-wide — all screens, cards, navigation, and components respond instantly
- **Orange remains the primary brand accent in both themes**

### Light Theme
Light surfaces (`#F7F7F5`) + dark text (`#111111`) + orange accents (`#F97316`)

### Dark Theme
Dark surfaces (`#1A1A1A`) + white text (`#FFFFFF`) + orange accents (`#F97316`)

> The colour system changes the supporting surfaces and text while preserving the GHAR KA KHANA brand identity.

---

## Design System

| Token | Light | Dark |
|---|---|---|
| Primary Orange | `#F97316` | `#F97316` |
| Dark Orange | `#EA580C` | `#EA580C` |
| Text | `#111111` | `#FFFFFF` |
| Muted Text | `#6B6B6B` | `#B8B8B8` |
| Background | `#F7F7F5` | `#111111` |
| Surface | `#FFFFFF` | `#1A1A1A` |
| Border | `#E6E6E2` | `#303030` |
| Error | `#EF4444` | `#EF4444` |
| Success | `#10B981` | `#10B981` |

Additional design tokens:

| Token | Values |
|---|---|
| Spacing | `xs: 4` · `sm: 8` · `md: 16` · `lg: 24` · `xl: 32` · `xxl: 48` |
| Radius | `sm: 6` · `md: 12` · `lg: 18` · `xl: 24` · `round: 9999` |
| Fonts | System sans-serif (platform-specific) |

---

## Technology Stack

| Technology | Purpose |
|---|---|
| **React Native** `0.86.3` | Cross-platform mobile framework |
| **Expo** `^57.0.26` | Development platform and build tooling |
| **Expo Router** `~57.0.24` | File-based routing with typed routes |
| **TypeScript** `~6.0.3` | Type-safe development |
| **React** `19.2.3` | UI rendering library |
| **React Context** | Centralised application state management (`AppContext`) |
| **AsyncStorage** `2.2.0` | Local persistence (theme preference) |
| **Expo Image** `~57.0.5` | Optimised image rendering with transitions |
| **React Navigation** `^7.4.0` | Bottom tab navigation for all three roles |
| **React Native Safe Area Context** `~5.7.0` | Safe area insets for device-aware layouts |
| **React Native Gesture Handler** `~2.32.0` | Gesture management |
| **React Native Reanimated** `4.5.1` | Animation support |
| **React Native Screens** `~4.26.0` | Native screen optimisation |
| **Expo Vector Icons** `^15.0.3` | Ionicons icon set |
| **Expo Status Bar** `~57.0.1` | Status bar control (light/dark) |

---

## Application Architecture

```
┌──────────────────────────────────────────────┐
│               Expo Router                     │
│          (File-based routing)                 │
│                                               │
│   ┌──────────┬──────────┬──────────┐          │
│   │ Customer │ Provider │  Admin   │          │
│   │  (tabs)  │  (tabs)  │  (tabs)  │          │
│   └────┬─────┴────┬─────┴────┬─────┘          │
│        └──────────┼──────────┘                │
│                   ↓                           │
│        Reusable UI Components                 │
│   (MealCard, ProviderCard, Button)            │
│                   ↓                           │
│             AppContext                        │
│    (React Context + useState)                 │
│                   ↓                           │
│        Shared Application State               │
│  (users, meals, reservations, providers,      │
│   favorites, theme, cart)                     │
│                   ↓                           │
│       Local Mock Data + AsyncStorage          │
│   (mockData.ts + theme persistence)           │
└──────────────────────────────────────────────┘
```

All three roles (Customer, Provider, Admin) consume the same `AppContext`. When a customer places a reservation, the provider's dashboard and admin's orders screen reflect it immediately — because they share the same in-memory state.

---

## Project Structure

```
delivery-app/
├── app/                          # All screens (file-based routing)
│   ├── _layout.tsx               # Root layout — AppProvider + ThemeProvider
│   ├── index.tsx                 # Entry redirect
│   ├── modal.tsx                 # Modal screen
│   ├── (auth)/                   # Authentication screens
│   │   ├── _layout.tsx           # Auth stack layout
│   │   ├── login.tsx             # Role-based login (Customer/Provider/Admin)
│   │   └── register.tsx          # Registration form (prototype)
│   ├── (customer)/               # Customer experience
│   │   ├── _layout.tsx           # Customer stack layout
│   │   ├── (tabs)/               # Bottom tab navigation
│   │   │   ├── _layout.tsx       # Tab bar configuration (5 tabs)
│   │   │   ├── home.tsx          # Home — greeting, meals, providers
│   │   │   ├── discover.tsx      # Discover — search, browse all meals/providers
│   │   │   ├── orders.tsx        # My Reservations — reservation list
│   │   │   ├── favorites.tsx     # Favorites (Coming Soon placeholder)
│   │   │   └── profile.tsx       # Profile — user info, appearance, logout
│   │   ├── meal/
│   │   │   └── [id].tsx          # Meal Details — full meal info, reserve CTA
│   │   ├── provider/
│   │   │   └── [id].tsx          # Provider Profile — info, menu, order
│   │   ├── checkout.tsx          # Checkout — fulfillment, payment, confirm
│   │   └── order-status.tsx      # Order Status — live timeline, OTP
│   ├── (provider)/               # Provider experience (tab navigation)
│   │   ├── _layout.tsx           # Tab bar configuration (5 tabs)
│   │   ├── dashboard.tsx         # Dashboard — metrics, preparation batches
│   │   ├── orders.tsx            # Active Tasks — manage reservation statuses
│   │   ├── meals.tsx             # My Planned Meals — view published meals
│   │   ├── earnings.tsx          # Earnings (Coming Soon placeholder)
│   │   └── profile.tsx           # Profile — kitchen info, appearance, logout
│   └── (admin)/                  # Admin experience (tab navigation)
│       ├── _layout.tsx           # Tab bar configuration (4 tabs)
│       ├── dashboard.tsx         # Dashboard — metrics, verification, overview
│       ├── users.tsx             # System Users — all users with role badges
│       ├── providers.tsx         # Manage Providers — verification, approval
│       └── orders.tsx            # All Reservations — platform-wide view
├── components/                   # Reusable components
│   └── ui/
│       ├── Button.tsx            # Multi-variant button (primary/secondary/outline/ghost)
│       ├── MealCard.tsx          # Planned meal card with image, price, availability
│       └── ProviderCard.tsx      # Provider card with image, rating, speciality
├── constants/
│   └── theme.ts                  # Design tokens — Colors (light/dark), Fonts, Spacing, Radius, Shadows
├── store/
│   ├── AppContext.tsx             # Centralised state — users, meals, reservations, theme, actions
│   └── mockData.ts               # Sample data — users, providers, meals, locations, planned meals
├── assets/
│   └── images/                   # Food photographs and app icons
│       ├── food_gujarati_thali.jpg
│       ├── food_paneer_bhurji.jpg
│       ├── food_rajma_rice.jpg
│       ├── food_thepla.jpg
│       └── (app icons and splash)
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

---

## Screens

### Authentication

| Screen | File | Description |
|---|---|---|
| Login | `(auth)/login.tsx` | Role-based sign-in with three buttons: Customer, Provider, Admin |
| Register | `(auth)/register.tsx` | Registration form with role selection (prototype) |

### Customer (5 tabs + detail screens)

| Screen | File | Description |
|---|---|---|
| Home | `(tabs)/home.tsx` | Personalised greeting, upcoming meals, search bar, filter chips, trusted providers |
| Discover | `(tabs)/discover.tsx` | Browse all active planned meals and verified providers |
| My Reservations | `(tabs)/orders.tsx` | List of customer's reservations with status badges |
| Favorites | `(tabs)/favorites.tsx` | Coming Soon placeholder |
| Profile | `(tabs)/profile.tsx` | User info, hostel location, Appearance toggle, settings, logout |
| Meal Details | `meal/[id].tsx` | Full meal info, provider link, availability bar, reserve CTA |
| Provider Profile | `provider/[id].tsx` | Provider info, stats, menu, order buttons |
| Checkout | `checkout.tsx` | Order summary, fulfillment selection, location, payment confirmation |
| Order Status | `order-status.tsx` | Scrollable timeline, OTP display, meal summary |

### Provider (5 tabs)

| Screen | File | Description |
|---|---|---|
| Dashboard | `dashboard.tsx` | Meals to prepare, active reservations, earnings, preparation batches |
| Active Tasks | `orders.tsx` | Reservation management with status action buttons |
| My Planned Meals | `meals.tsx` | Published meals with stats, Plan New Meal button |
| Earnings | `earnings.tsx` | Coming Soon placeholder |
| Profile | `profile.tsx` | Kitchen info, verified badge, stats, about, Appearance toggle, logout |

### Admin (4 tabs)

| Screen | File | Description |
|---|---|---|
| Dashboard | `dashboard.tsx` | Platform metrics, pending verification, active meals, recent reservations |
| Users | `users.tsx` | All system users with role badges |
| Providers | `providers.tsx` | Provider list with verification status and approve action |
| Orders | `orders.tsx` | All platform reservations with full details |

---

## Installation

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (comes with Node.js)
- **Expo CLI** (installed automatically via `npx`)
- **Android device** with [Expo Go](https://expo.dev/go) app installed, **or** an Android emulator

### Clone and Install

```bash
git clone <repository-url>
cd delivery-app
npm install
```

---

## Running the Application

### Start the Expo development server

```bash
npx expo start
```

Or with cache cleared:

```bash
npx expo start --clear
```

### Open on Android

1. Install the **Expo Go** app on your Android device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

### Open on Emulator

Press `a` in the terminal to open on a connected Android emulator.

---

## User / Role Access

The current implementation uses **role-based login buttons** instead of traditional credentials.

On the Login screen, tap one of three buttons:

| Button | Role | Lands On |
|---|---|---|
| **Sign In as Customer** | Customer | Customer Home (tabs) |
| **Sign In as Provider** | Provider | Provider Dashboard (tabs) |
| **Sign In as Admin** | Admin | Admin Dashboard (tabs) |

### Test Users (from `mockData.ts`)

| Role | Name | Email | Phone |
|---|---|---|---|
| Customer | Moksh | customer@demo.com | 9876543210 |
| Provider | Seema Aunty | provider@demo.com | 9876543211 |
| Admin | Admin | admin@demo.com | 9876543212 |

No real authentication is required. Tapping a login button immediately sets the user role and navigates to the corresponding interface.

---

## End-to-End Testing

### Scenario 1: Customer Reservation Flow

```
1. Tap "Sign In as Customer"
2. Home screen → tap a planned meal card
3. View meal details → tap "Reserve for ₹30"
4. Checkout → select Bulk Delivery → select location → confirm
5. Navigate to My Reservations tab
6. Verify reservation appears with "RESERVED" status
7. Tap reservation → verify Order Status timeline shows "Meal Reserved" as active
8. Note the 4-digit OTP
```

### Scenario 2: Provider Status Management

```
1. Log out → "Sign In as Provider"
2. Dashboard → verify "To Prepare" count matches customer's reservation
3. Go to Active Tasks tab
4. Tap "Start Preparing" → status updates to PREPARING
5. Tap "Mark Ready" → status updates to READY
6. Tap "Send Batch / Ready for Pickup" → status updates to AT PICKUP LOCATION
```

### Scenario 3: Admin Monitoring

```
1. Log out → "Sign In as Admin"
2. Dashboard → verify reservation count reflects the placed reservation
3. Go to Orders tab → verify reservation details visible
4. Go to Providers tab → verify provider list and verification status
```

### Scenario 4: Cross-Role Verification

```
1. After Provider updates status, log out → "Sign In as Customer"
2. Go to My Reservations → tap the reservation
3. Verify the Order Status timeline reflects the provider's status updates
```

### Scenario 5: Provider Verification (Admin)

```
1. Sign In as Admin
2. Dashboard → "Pending Verification" section shows unverified provider
3. Tap "Approve" → provider becomes verified
4. Go to Providers tab → confirm status changed to "Verified"
```

---

## Current Implementation

The current implementation focuses on demonstrating the **complete product workflow and UI/UX** using local application state and sample data.

### What is fully functional

- Three-role application (Customer, Provider, Admin) with complete navigation
- Planned meal discovery, details, and provider profiles
- Reservation flow with fulfillment selection, checkout, and booking confirmation
- Reservation status tracking with live timeline and OTP
- Provider dashboard with preparation batch aggregation
- Provider status management (RESERVED → PREPARING → READY → dispatched)
- Admin dashboard with metrics, provider verification, and platform-wide reservation monitoring
- Light and Dark theme with persistent user preference
- Cross-role state sharing (reservations created by customers appear in provider and admin views)
- Safe-area-aware layouts for modern Android devices

### What is simulated

- **Payment** — Booking amount is deducted from application state; no real payment gateway
- **Data** — Sample providers, meals and users are loaded from `mockData.ts`
- **Authentication** — Role-based button login; no credential validation or token management
- **Persistence** — Application state (reservations, meals) resets on app restart; only theme preference persists via AsyncStorage

---

## Limitations

| Limitation | Details |
|---|---|
| Local/mock data | All data is stored in React state and resets on restart |
| Simulated payment | No real payment gateway integration |
| No production backend | No API server, no database, no cloud infrastructure |
| No multi-device sync | State exists only within the current app session |
| No push notifications | No notification infrastructure for reservation updates |
| No real authentication | Role buttons replace credential-based login |
| No image upload | Providers cannot upload custom meal images in the current version |
| Placeholder screens | Favorites (Customer) and Earnings (Provider) display "Coming Soon" |

---

## Future Scope

The following areas represent logical next steps for production development:

| Area | Description |
|---|---|
| **Production Backend** | REST or GraphQL API with Node.js/Express or similar |
| **Database** | PostgreSQL or MongoDB for persistent data storage |
| **Real Authentication** | Email/phone sign-up with OTP verification, JWT tokens |
| **Payment Gateway** | Integration with Razorpay, Stripe, or UPI for real transactions |
| **Real-time Sync** | WebSocket or Firebase for live status updates across devices |
| **Push Notifications** | FCM for reservation confirmations, status changes, reminders |
| **Image Upload** | Providers upload meal photos via cloud storage (S3, Cloudinary) |
| **Search & Filters** | Full-text search with cuisine, price range, dietary filters |
| **Provider Onboarding** | Document verification, FSSAI compliance, kitchen inspection flow |
| **Ratings & Reviews** | Post-collection review system with text and star ratings |
| **Subscription Plans** | Weekly/monthly meal subscriptions for regular customers |
| **Analytics Dashboard** | Provider and admin analytics — revenue trends, popular meals, customer retention |
| **Geolocation** | Location-based provider discovery and distance-based sorting |
| **Delivery Tracking** | Real-time tracking for bulk delivery batches |

---

## Security and Privacy

### Current State

The current prototype does not implement production-grade security:

- **No encrypted storage** — data is held in React state (volatile) and AsyncStorage (theme only)
- **No server-side authentication** — roles are selected via UI buttons without credential validation
- **No API security** — there is no backend API to secure
- **No payment security** — payment is simulated locally

### Production Recommendations

A production deployment would require:

- Secure authentication (OAuth 2.0 / JWT)
- HTTPS-only API communication
- Input validation and sanitisation
- Payment gateway PCI-DSS compliance
- User data encryption at rest and in transit
- Role-based access control on the backend
- Rate limiting and abuse prevention

---

## Development Notes

- The project uses **Expo SDK 57** with **React Native 0.86**
- **TypeScript** is enforced project-wide with `tsconfig.json`
- **File-based routing** via Expo Router — route groups `(auth)`, `(customer)`, `(provider)`, `(admin)`
- All screens use a `createStyles(colors)` pattern for dynamic theming
- The `AppContext` provides centralised state to all screens via React Context
- The codebase uses `useSafeAreaInsets()` from `react-native-safe-area-context` for device-aware layouts
- Platform-specific `StatusBar.currentHeight` is used for Android top padding
- `expo-image` is used for optimised image rendering with transition animations

---

## License

This project was developed as an academic / prototype application. License terms to be determined by the project owner.

---

<p align="center">
  <strong>GHAR KA KHANA</strong><br/>
  <em>Planned homemade meals for students living away from home.</em><br/><br/>
  🏠 Home Cook → 🍱 Planned Meal → 📋 Reservation → ✅ Confirmed Demand → 🧑‍🍳 Preparation → 📦 Collection
</p>
