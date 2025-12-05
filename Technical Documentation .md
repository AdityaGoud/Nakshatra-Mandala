# Nakshatra-Raga Mandala

## Complete Technical Documentation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [File Organization & Responsibilities](#file-organization--responsibilities)
5. [Component Architecture](#component-architecture)
6. [Data Flow](#data-flow)
7. [Multi-Step Application Flow](#multi-step-application-flow)
8. [Key Design Patterns](#key-design-patterns)
9. [API Layer Design](#api-layer-design)
10. [Styling Strategy](#styling-strategy)
11. [Future Extensibility](#future-extensibility)
12. [Setup & Installation](#setup--installation)
13. [Development Guidelines](#development-guidelines)

---

## Executive Summary

**Nakshatra-Raga Mandala** is a sophisticated React web application that bridges ancient Vedic astrology with Carnatic
classical music. Users enter their birth details, and the application calculates and visualizes their natal chart as an
interactive three-ring circular mandala showing:

- **Outer Ring**: 12 Rashis (zodiac signs)
- **Middle Ring**: 27 Nakshatras (lunar mansions)
- **Inner Ring**: 72 Melakarta Ragas (parent musical modes)

The application features a **two-step wizard flow**:

1. **Onboarding Screen**: Collect birth data (date, time, place)
2. **Mandala Screen**: Interactive visualization with tabbed right panel (Details / Dasha / Navamsa)

### Key Technologies

- **Frontend**: React 18+ with React Hooks
- **Styling**: CSS3 with custom variables and animations
- **Canvas**: HTML5 Canvas for mandala visualization
- **State Management**: React local state (lifted to parent components)
- **Architecture**: Container/Presentational Pattern + Feature-based organization

---

## Architecture Overview

### High-Level Design Philosophy

The application follows **clean architecture principles**:

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    React App (App.jsx)              â”‚
â”‚            Global State & Screen Router              â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                   â”‚
        â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
        â–¼                     â–¼
   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
   â”‚ Onboarding  â”‚     â”‚ Mandala Screen   â”‚
   â”‚ Container   â”‚     â”‚ (if chart data)  â”‚
   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
        â”‚                     â”‚
        â”‚                     â”œâ”€â†’ MandalaContainer (layout)
        â”‚                     â”‚   â”œâ”€â†’ NakshatraRagaMandala (canvas)
        â”‚                     â”‚   â””â”€â†’ RightPanelContainer
        â”‚                     â”‚       â”œâ”€â†’ TabNavigation
        â”‚                     â”‚       â””â”€â†’ Views (Details/Dasha/Navamsa)
        â”‚                     â”‚
        â””â”€â†’ astrologyApi.js â†â”€â”˜
            (Backend calls)
                   â”‚
        â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
        â–¼                     â–¼
   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
   â”‚ mandalaData  â”‚   â”‚ dashaData.js   â”‚
   â”‚ .js (static) â”‚   â”‚ (static)       â”‚
   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Core Principles

1. **Separation of Concerns**: Smart containers handle logic; presentational components render UI
2. **Single Responsibility**: Each file/component has one clear purpose
3. **Data Down, Events Up**: Props flow from parent â†’ child; callbacks flow from child â†’ parent
4. **Reusability**: Shared data, mappings, and utilities centralized
5. **Scalability**: Feature-based folder structure allows easy expansion
6. **Testability**: Pure functions in services and utilities; mockable API layer

---

## Project Structure

```
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ App.jsx                 # Main app component (step router)
â”‚   â””â”€â”€ routes.js               # Route/step configuration
â”‚
â”œâ”€â”€ features/
â”‚   â”œâ”€â”€ onboarding/             # Step 1: Birth details input
â”‚   â”‚   â”œâ”€â”€ OnboardingContainer.jsx
â”‚   â”‚   â”œâ”€â”€ OnboardingForm.jsx
â”‚   â”‚   â””â”€â”€ onboarding.types.js
â”‚   â”‚
â”‚   â”œâ”€â”€ mandala/                # Step 2: Visualization + interaction
â”‚   â”‚   â”œâ”€â”€ MandalaContainer.jsx
â”‚   â”‚   â”œâ”€â”€ NakshatraRagaMandala.jsx
â”‚   â”‚   â””â”€â”€ mandala.types.js
â”‚   â”‚
â”‚   â””â”€â”€ rightPanel/             # Right-side tabbed panel
â”‚       â”œâ”€â”€ RightPanelContainer.jsx
â”‚       â”œâ”€â”€ TabNavigation.jsx
â”‚       â””â”€â”€ views/
â”‚           â”œâ”€â”€ DetailsView.jsx
â”‚           â”œâ”€â”€ DashaView.jsx
â”‚           â””â”€â”€ NavamsaView.jsx
â”‚
â”œâ”€â”€ services/
â”‚   â”œâ”€â”€ astrologyApi.js         # API layer (backend calls + mocking)
â”‚   â””â”€â”€ mappings.js             # Utility functions (degree â†” segment)
â”‚
â”œâ”€â”€ data/
â”‚   â”œâ”€â”€ mandalaData.js          # 12 Rashis, 27 Nakshatras, 72 Ragas
â”‚   â””â”€â”€ dashaData.js            # Vimshottari Dasha lords + details
â”‚
â”œâ”€â”€ styles/
â”‚   â”œâ”€â”€ App.css                 # Main styling + theme variables
â”‚   â”œâ”€â”€ Onboarding.css          # Onboarding-specific styles
â”‚   â””â”€â”€ RightPanel.css          # Right panel-specific styles
â”‚
â”œâ”€â”€ index.js                    # React entry point
â””â”€â”€ index.css                   # Global base styles
```

### Folder Naming Convention

- **`app/`**: Top-level application orchestration
- **`features/`**: Functional features (each feature is self-contained)
- **`services/`**: Reusable business logic, API calls, utilities
- **`data/`**: Static, centralized data (not code)
- **`styles/`**: CSS files organized by scope

---

## File Organization & Responsibilities

### Entry Point Layer

#### `index.js`

- Renders React root and mounts `<App />`
- Imports global CSS reset

#### `index.css`

- Base HTML/body reset
- Font-family declarations
- Global color scheme defaults

---

### App Layer

#### `App.jsx` (app/App.jsx)

**Type**: Smart/Container Component  
**Responsibilities**:

- Hold `currentStep` state ("onboarding" | "mandala")
- Hold `chartData` state (user's calculated birth chart)
- Render space background (3D animations) â€” shared across steps
- Route between OnboardingContainer and MandalaContainer
- Pass callbacks to manage step transitions

**Key Props Passed**:

- `onChartReady(chartData)` â†’ OnboardingContainer
- `onBack()` â†’ MandalaContainer
- `chartData` â†’ MandalaContainer

#### `routes.js` (app/routes.js)

**Type**: Configuration  
**Responsibilities**:

- Document available app steps/screens
- Define step metadata (labels, descriptions)
- Serve as a single source of truth for navigation

---

### Onboarding Feature

#### `OnboardingContainer.jsx`

**Type**: Smart/Container Component  
**Responsibilities**:

- Hold form state (`values`: date, time, place, timezone)
- Manage submission state (`isSubmitting`, `error`)
- Validate input before API call
- Call `astrologyApi.calculateNatalChart()`
- Transform raw API response into `chartData` shape
- Call `onChartReady(chartData)` callback on success
- Render `<OnboardingForm />` as presentational component

**State**:

```javascript
{
  values: { name, date, time, place, timezone },
  isSubmitting: boolean,
  error: string | null
}
```

#### `OnboardingForm.jsx`

**Type**: Presentational/Dumb Component  
**Responsibilities**:

- Render birth details form UI
- Display loading and error states
- Call `onChange` callback on field changes
- Call `onSubmit` callback when user clicks button

**Props**:

- `values`: current form values
- `isSubmitting`: disable button during API call
- `error`: error message to display
- `onChange(field, value)`: parent-controlled update
- `onSubmit()`: submit form

#### `onboarding.types.js`

**Type**: Type Definitions (Documentation)  
**Responsibilities**:

- Document expected shapes for `BirthInput`, `OnboardingState`
- Document API request/response formats
- Provide examples and future extensions

---

### Mandala Feature (Step 2)

#### `MandalaContainer.jsx`

**Type**: Smart/Container Component  
**Responsibilities**:

- Receive `chartData` prop from App
- Hold `activeChartType` state ("rasi" | "navamsa")
- Hold `hoverSelection` state (currently hovered segment)
- Hold `activeTab` state (right panel tab)
- Derive `planetPositions` and `ascendantDeg` based on active chart type
- Orchestrate layout: left canvas + right panel
- Route hover events and chart type changes

**Key Derived Data**:

```javascript
const { ascendantDeg, planetPositions } = useMemo(() => {
  const current = activeChartType === "navamsa" 
    ? chartData.navamsa || chartData.rasi 
    : chartData.rasi;
  return {
    ascendantDeg: current.ascendantDeg,
    planetPositions: current.planets
  };
}, [chartData, activeChartType]);
```

#### `NakshatraRagaMandala.jsx`

**Type**: Presentational Component (Canvas)  
**Responsibilities**:

- Render interactive circular mandala on `<canvas>`
- Draw three concentric rings using mandalaData (Rashis, Nakshatras, Ragas)
- Draw planet icons at specified degrees
- Detect mouse hover and calculate which segment is under cursor
- Highlight hovered segment with color overlay
- Call `onHoverChange(selection)` callback when hover changes
- Handle high-DPI rendering (`devicePixelRatio`)

**Props**:

- `ascendantDeg`: number (0â€“360)
- `planetPositions`: array of `{ name, degree }`
- `onHoverChange(selection | null)`: hover callback

**Canvas Features**:

- Three-ring visualization
- Real-time planet positioning
- Smooth hover highlighting
- Window resize responsiveness

#### `mandala.types.js`

**Type**: Type Definitions  
**Responsibilities**:

- Document `ChartData` shape
- Document `PlanetPosition` shape
- Document `HoverSelection` shape
- Document `ACTIVE_CHART_TYPES` enum
- Document `RIGHT_PANEL_TABS` enum

---

### Right Panel Feature

#### `RightPanelContainer.jsx`

**Type**: Smart/Container Component  
**Responsibilities**:

- Hold tabbed interface UI
- Conditionally render active tab view
- Pass down props to each view (hoverSelection, chartData, etc.)
- Handle back button click

**Tab Routing Logic**:

```javascript
if (activeTab === "details") â†’ <DetailsView />
if (activeTab === "dasha") â†’ <DashaView />
if (activeTab === "navamsa") â†’ <NavamsaView />
```

#### `TabNavigation.jsx`

**Type**: Presentational Component  
**Responsibilities**:

- Render tab button row
- Highlight active tab
- Call `onTabChange(tabKey)` on click
- No state management

---

#### `DetailsView.jsx`

**Type**: Presentational Component  
**Responsibilities**:

- Show contextual information based on `hoverSelection`
- If Rashi hovered: show Rashi name, index
- If Nakshatra hovered: show Nakshatra name, index
- If Raga hovered: show Melakarta name, Raga number
- Default view when nothing hovered: show instructions

**Future Enhancements**:

- Enrich with planet lists inside each segment
- Add traits/characteristics from dedicated data files
- Show planetary combinations

#### `DashaView.jsx`

**Type**: Presentational Component  
**Responsibilities**:

- Show Vimshottari Dasha information
- Resolve Dasha lord for hovered Nakshatra using `getDashaForNakshatra()`
- Display Dasha lord name, type, keywords, summary
- Only show relevant info if Nakshatra is hovered

**Logic Flow**:

```
No hover â†’ show instructions
Not nakshatra hover â†’ show instructions
Nakshatra hover â†’ show Dasha lord details
```

#### `NavamsaView.jsx`

**Type**: Presentational Component  
**Responsibilities**:

- Explain Navamsa (D9) concept
- Render toggle buttons to switch chart type
- Show whether Navamsa data is available
- Call `onChartTypeChange()` when user clicks toggle

---

### Services Layer

#### `astrologyApi.js` (services/)

**Type**: API Layer (Backend Integration)  
**Responsibilities**:

- Define all backend communication functions
- Handle request/response normalization
- Provide mock data for development
- Export main entry function: `calculateNatalChart(birthInput)`

**Key Function**:

```javascript
export async function calculateNatalChart(birthInput) {
  // Normalize birthInput to backend format
  // Call backend API (or return mock)
  // Normalize response to chartData shape
  // Return { meta, rasi, navamsa? }
}
```

**Mock Data Structure**:

```javascript
{
  meta: { dob, tob, place, timezone },
  rasi: {
    ascendantDeg: number,
    planets: [ { name, degree }, ... ]
  },
  navamsa?: {
    ascendantDeg: number,
    planets: [ ... ]
  }
}
```

#### `mappings.js` (services/)

**Type**: Utility Functions  
**Responsibilities**:

- Provide pure functions for degree â†” segment conversions
- Export helpers like:
    - `normalizeDegree(deg)` â†’ ensure 0â€“360 range
    - `degreeToRashiIndex(deg)` â†’ 0â€“11
    - `degreeToNakshatraIndex(deg)` â†’ 0â€“26
    - `degreeToMelakartaIndex(deg)` â†’ 0â€“71
    - `getRashiInfoFromDegree(deg)` â†’ `{ index, name, number }`
    - `planetToSegmentInfo(planet)` â†’ full breakdown

**Used By**: Right panel views, canvas calculations, future features

---

### Data Layer

#### `mandalaData.js` (data/)

**Type**: Static Data  
**Responsibilities**:

- Export arrays: `RASHIS`, `NAKSHATRAS`, `MELAKARTA_RAGAS`
- Export segment size constants:
    - `RASHI_SEGMENT_SIZE_DEG = 30`
    - `NAKSHATRA_SEGMENT_SIZE_DEG = 360/27 â‰ˆ 13.33`
    - `MELAKARTA_SEGMENT_SIZE_DEG = 5`
- Export helper functions:
    - `getMelakartaNumberFromIndex(index)` â†’ 1â€“72
    - `getNakshatraFromLongitude(deg)` â†’ `{ index, name }`

**Data Structure**:

```javascript
RASHIS = [
  "Aries", "Taurus", ..., "Pisces"  // 12 items
]

NAKSHATRAS = [
  "Ashwini", "Bharani", ..., "Revati"  // 27 items
]

MELAKARTA_RAGAS = [
  "Kanakangi", "Ratnangi", ..., "Rasikapriya"  // 72 items
]
```

#### `dashaData.js` (data/)

**Type**: Static Data  
**Responsibilities**:

- Export `VIMSHOTTARI_SEQUENCE` (planet order + durations)
- Export `DASHA_LORD_DETAILS` (rich info for each Dasha lord)
- Export `NAKSHATRA_DASHA_LORDS` (mapping of Nakshatra index â†’ lord name)
- Export helper: `getDashaForNakshatra(nakshatraIndex)`

**Data Structure**:

```javascript
VIMSHOTTARI_SEQUENCE = [
  { lord: "Ketu", durationYears: 7 },
  { lord: "Venus", durationYears: 20 },
  ...
]

DASHA_LORD_DETAILS = {
  "Ketu": { name, type, keywords, summary },
  "Venus": { ... },
  ...
}

NAKSHATRA_DASHA_LORDS = [
  "Ketu",    // Ashwini (index 0)
  "Venus",   // Bharani (index 1)
  ...
]
```

---

### Styling Layer

#### `App.css` (styles/)

**Responsibilities**:

- Define theme variables (colors, spacing, shadows)
- Base component styles (space-container, main-layout, info-panel)
- Canvas styles (mandala-breathing animation)
- Tag and button styles
- Tab navigation styles
- Form input styles
- Responsive breakpoints (1200px, 768px)
- Background animations (stars, nebula, particles)

**Theme Variables** (CSS Custom Properties):

```css
:root {
  --page-bg: #020617;
  --card-bg: #111827;
  --card-text: #ffffff;
  --accent: #7dd3fc;
  /* ... more colors ... */
}
```

#### `Onboarding.css` (styles/)

**Responsibilities**:

- Onboarding-specific visual tweaks (if any)
- Helper text styles
- Form-specific animations (optional)

#### `RightPanel.css` (styles/)

**Responsibilities**:

- Right panel-specific spacing adjustments
- Per-view styling tweaks
- Tab-specific visual variations

#### `index.css`

**Responsibilities**:

- Global HTML/body reset
- Font declarations
- Default color scheme

---

## Component Architecture

### Design Patterns Used

#### 1. **Container/Presentational Pattern**

**Containers** (Smart Components):

- Hold state
- Make API calls
- Handle business logic
- Manage callbacks
- Example: `OnboardingContainer`, `MandalaContainer`, `RightPanelContainer`

**Presentational** (Dumb Components):

- Render UI only
- Receive all data via props
- Call callbacks for user interactions
- No state (except UI state like form fields)
- Example: `OnboardingForm`, `DetailsView`, `NakshatraRagaMandala`

**Benefits**:

- Clear separation of concerns
- Easy to test (presentational components are pure)
- Reusability (same presentational component in multiple contexts)
- Maintainability (logic isolated in containers)

#### 2. **Lifting State Up**

When multiple siblings need to share state (canvas hover + right panel content), state moves to parent:

```
MandalaContainer (holds hoverSelection state)
â”œâ”€â”€ NakshatraRagaMandala (reports hover)
â””â”€â”€ RightPanelContainer (reads hover)
```

**Benefits**:

- Single source of truth
- Predictable data flow
- Siblings can coordinate via parent

#### 3. **Feature-Based Folder Organization**

Each feature (onboarding, mandala, rightPanel) is self-contained:

- Contains its own components
- May have its own types file
- May have its own styles
- Easy to move, copy, or extend

**Benefits**:

- Scalability (add new features without affecting old ones)
- Clarity (file location reflects purpose)
- Parallelization (team members work on different features)

#### 4. **Service Layer Abstraction**

API calls isolated in `services/astrologyApi.js`:

- Components call functions, not fetch directly
- Easy to mock for testing
- Easy to swap backend later
- Normalized request/response formats

**Benefits**:

- Testability (mock API without mocking fetch)
- Flexibility (change backend URL in one place)
- Consistency (all API responses normalized)

---

### Component Dependency Graph

```
App.jsx (root)
â”œâ”€â”€ [Step 1] OnboardingContainer
â”‚   â””â”€â”€ OnboardingForm (presentational)
â”‚       â””â”€â”€ astrologyApi.js (calculateNatalChart)
â”‚
â””â”€â”€ [Step 2] MandalaContainer
    â”œâ”€â”€ NakshatraRagaMandala (canvas)
    â”‚   â”œâ”€â”€ mandalaData.js (Rashis, Nakshatras, Ragas)
    â”‚   â””â”€â”€ planetImages (preloaded)
    â”‚
    â””â”€â”€ RightPanelContainer
        â”œâ”€â”€ TabNavigation
        â”‚
        â”œâ”€â”€ DetailsView (when tab = "details")
        â”‚   â””â”€â”€ mandalaData.js
        â”‚
        â”œâ”€â”€ DashaView (when tab = "dasha")
        â”‚   â””â”€â”€ dashaData.js
        â”‚
        â””â”€â”€ NavamsaView (when tab = "navamsa")
            â””â”€â”€ mandalaData.types.js (chart types)
```

---

## Data Flow

### Unidirectional Data Flow

All data flows in one direction: **Parent â†’ Child (via props)**, **Child â†’ Parent (via callbacks)**

```
App.jsx (holds chartData, currentStep)
    â”‚
    â”œâ”€ [Props] chartData â†’ MandalaContainer
    â”‚                        â”‚
    â”‚                        â”œâ”€ [Props] ascendantDeg, planetPositions â†’ NakshatraRagaMandala
    â”‚                        â”‚   â””â”€ [Callback] onHoverChange â† NakshatraRagaMandala
    â”‚                        â”‚
    â”‚                        â””â”€ [Props] hoverSelection, chartData â†’ RightPanelContainer
    â”‚                            â””â”€ [Props] â†’ DetailsView / DashaView / NavamsaView
    â”‚
    â””â”€ [Callback] onChartReady â† OnboardingContainer
```

### Props Flow Example: Hover Detection

```
User hovers Nakshatra segment in canvas
    â†“
NakshatraRagaMandala detects mouse position
    â†“
Calculates segment index from polar coordinates
    â†“
Calls onHoverChange({ type: "nakshatra", index: 5 })
    â†“
MandalaContainer receives, updates hoverSelection state
    â†“
MandalaContainer re-renders with new prop to RightPanelContainer
    â†“
RightPanelContainer passes hoverSelection to active view (DashaView, etc.)
    â†“
DashaView shows details for Nakshatra #6 (1-based: index 5 + 1)
```

### State Management Strategy

**Global State** (held in App.jsx):

- `currentStep` ("onboarding" | "mandala")
- `chartData` (user's birth chart data)

**Local State** (MandalaContainer):

- `activeChartType` ("rasi" | "navamsa")
- `hoverSelection` (currently hovered segment)
- `activeTab` (right panel tab)

**Form State** (OnboardingContainer):

- `values` (DOB, time, place, timezone)
- `isSubmitting` (API call in progress)
- `error` (validation or API error)

**Derived State** (useMemo in MandalaContainer):

- `ascendantDeg` (computed from chartData + activeChartType)
- `planetPositions` (computed from chartData + activeChartType)

**Benefits of This Approach**:

- Global state only holds what's truly global
- Local state co-located with where it's needed
- Derived state computed only when dependencies change
- Easy to add middleware/persistence later

---

## Multi-Step Application Flow

### User Journey: Step-by-Step

#### **STEP 1: App Initialization**

```
User opens app
  â†“
index.js loads
  â†“
App.jsx renders with:
  - currentStep = "onboarding"
  - chartData = null
  - Space background displayed
  â†“
OnboardingContainer rendered (left side can be empty or show intro)
OnboardingForm rendered (right side shows form card)
```

#### **STEP 2: Birth Details Entry**

```
User fills form:
  - Name (optional)
  - Date of Birth (required)
  - Time of Birth (required)
  - Place of Birth (required)
  - Timezone (has default "Asia/Kolkata")
  â†“
User clicks "Generate Mandala" button
  â†“
OnboardingContainer validates input
  â†“
onSubmit called, isSubmitting = true (button disabled)
```

#### **STEP 3: API Call**

```
OnboardingContainer calls astrologyApi.calculateNatalChart(values)
  â†“
astrologyApi constructs request:
  {
    date: "1990-04-15",
    time: "14:37",
    place: "Hyderabad, India",
    timezone: "Asia/Kolkata"
  }
  â†“
[Currently mocked] Returns chartData:
  {
    meta: { dob, tob, place, timezone },
    rasi: {
      ascendantDeg: 96,
      planets: [ { name: "Jupiter", degree: 120 }, ... ]
    },
    navamsa: { ... }  // optional
  }
  â†“
OnboardingContainer sets chartData state
  â†“
Calls onChartReady(chartData) callback
```

#### **STEP 4: Transition to Mandala Screen**

```
App.jsx receives chartData via onChartReady
  â†“
App sets chartData state
  â†“
App changes currentStep to "mandala"
  â†“
MandalaContainer now rendered
  - Receives chartData prop
  - Initializes activeChartType = "rasi"
  - Initializes hoverSelection = null
  - Initializes activeTab = "details"
```

#### **STEP 5: Mandala Rendering**

```
MandalaContainer derives planetPositions and ascendantDeg
  (using useMemo for efficiency)
  â†“
NakshatraRagaMandala rendered with props:
  - ascendantDeg: 96
  - planetPositions: array of planets
  - onHoverChange: callback function
  â†“
Canvas draws:
  1. Background gradient
  2. Rashi ring (12 segments, 30Â° each)
  3. Nakshatra ring (27 segments, 13.33Â° each)
  4. Raga ring (72 segments, 5Â° each)
  5. Planet icons at their degrees
  6. Center title and ascendant display
```

#### **STEP 6: User Interaction - Hover**

```
User moves mouse over mandala
  â†“
Canvas mousemove listener fires
  â†“
NakshatraRagaMandala calculates:
  - Distance from center (radius)
  - Angle from center (polar coordinate)
  â†“
Determines which ring and segment:
  if (radius in Rashi bounds) â†’ rashiIndex = angle / 30
  else if (radius in Nakshatra bounds) â†’ nakIndex = angle / 13.33
  else if (radius in Raga bounds) â†’ ragaIndex = angle / 5
  â†“
Creates HoverSelection object:
  { type: "nakshatra", index: 5 }
  â†“
Calls onHoverChange(selection)
```

#### **STEP 7: Right Panel Update**

```
MandalaContainer receives hoverSelection prop update
  â†“
Updates hoverSelection state
  â†“
Re-renders with new props to RightPanelContainer
  â†“
RightPanelContainer passes to active view:
  - DetailsView: shows Nakshatra name + index
  - DashaView: shows Dasha lord for this Nakshatra
  - NavamsaView: shows toggle controls
  â†“
View renders new content
```

#### **STEP 8: Tab Switching**

```
User clicks "Dasha" tab
  â†“
TabNavigation calls onTabChange("dasha")
  â†“
RightPanelContainer updates activeTab state
  â†“
Conditional render switches from DetailsView to DashaView
  â†“
DashaView receives same hoverSelection
  â†“
Shows Dasha lord info for currently hovered Nakshatra
```

#### **STEP 9: Chart Type Switching (Rasi â†” Navamsa)**

```
User clicks "Navamsa (D9)" button in Navamsa tab
  â†“
NavamsaView calls onChartTypeChange("navamsa")
  â†“
MandalaContainer updates activeChartType state
  â†“
useMemo re-runs because activeChartType changed
  â†“
Derives new planetPositions from chartData.navamsa instead of chartData.rasi
  â†“
NakshatraRagaMandala re-renders with new planets and ascendant
  â†“
Canvas redraws with D9 planetary positions
  â†“
User sees mandala with different layout
```

#### **STEP 10: Return to Onboarding**

```
User clicks "â† Back to birth details"
  â†“
RightPanelContainer calls onBack()
  â†“
App.jsx receives callback
  â†“
App resets:
  - currentStep = "onboarding"
  - chartData = null
  â†“
Screen returns to birth details form
```

---

## Key Design Patterns

### 1. **Props Drilling Prevention**

Instead of passing data through many levels, we:

- Keep state at the minimum necessary level
- Use callbacks for child-to-parent communication
- Use context API in the future if needed

**Example**: Canvas hover event

```javascript
// âœ… GOOD: Direct callback
<NakshatraRagaMandala onHoverChange={setHoverSelection} />

// âŒ AVOID: Drilling through multiple levels
<Component1>
  <Component2>
    <Component3>
      <Component4 onHover={props.onHover} />
    </Component3>
  </Component2>
</Component1>
```

### 2. **Controlled Components**

All form inputs and interactive elements are "controlled" by React state:

```javascript
// âœ… GOOD: Controlled input
<input 
  value={values.date} 
  onChange={(e) => handleChange("date", e.target.value)}
/>

// âŒ AVOID: Uncontrolled input
<input ref={dateRef} /> // value managed by DOM
```

**Benefits**:

- Consistent state
- Easy validation
- Can easily reset form

### 3. **Memoization for Performance**

Using `useMemo` to prevent unnecessary recalculations:

```javascript
const { ascendantDeg, planetPositions } = useMemo(() => {
  // Only recompute when activeChartType or chartData changes
  return computePositions(chartData, activeChartType);
}, [chartData, activeChartType]);
```

### 4. **Single Responsibility Principle**

Each component/file has one job:

- `NakshatraRagaMandala`: Draw and detect hover
- `DashaView`: Show Dasha information
- `mappings.js`: Convert degrees to segments
- `astrologyApi.js`: Handle backend communication

### 5. **Dependency Injection**

Functions receive dependencies as parameters instead of importing directly:

```javascript
// âœ… GOOD: Dependencies passed as props
<DetailsView hoverSelection={hoverSelection} chartData={chartData} />

// Slightly worse: Component imports data directly
// But acceptable for static data:
import { RASHIS } from "../data/mandalaData";
```

---

## API Layer Design

### Purpose

The API layer (`services/astrologyApi.js`) is the **single point of contact** between React components and backend
services. This provides:

1. **Abstraction**: Components don't know about fetch/axios details
2. **Consistency**: All backend responses normalized to same shape
3. **Mockability**: Easy to mock for development and testing
4. **Maintainability**: Change backend URL/auth in one place

### Current Implementation

Currently **mocked** to allow development without backend:

```javascript
export async function calculateNatalChart(birthInput) {
  // Mock delay to simulate network
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock chartData
  return {
    meta: { dob, tob, place, timezone },
    rasi: { ascendantDeg, planets: [...] },
    navamsa: { ... }
  };
}
```

### Future Implementation (when backend ready)

```javascript
const BASE_URL = "https://api.astrology.example.com";

export async function calculateNatalChart(birthInput) {
  const response = await fetch(`${BASE_URL}/api/chart/natal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(birthInput)
  });
  
  if (!response.ok) throw new Error("Chart calculation failed");
  
  const apiData = await response.json();
  return normalizeChartResponse(apiData);
}

function normalizeChartResponse(apiData) {
  // Transform backend response to chartData shape
  return {
    meta: { ... },
    rasi: { ... },
    navamsa: { ... }
  };
}
```

### Expandable Functions

Template for future API calls:

```javascript
// For Divisional Charts (D9, D10, D7, etc.)
export async function calculateDivisionalChart(birthInput, divisionalType) {
  // Call backend with divisionalType parameter
}

// For Transit data (future feature)
export async function getTransitData(birthInput, currentDateTime) {
  // Get current planetary positions
}

// For Timezone lookup (future feature)
export async function lookupTimezoneByPlace(place) {
  // Convert place string to coordinates + timezone
}
```

---

## Styling Strategy

### CSS Architecture

#### Theme Variables (CSS Custom Properties)

Centralized in `App.css`:

```css
:root {
  /* Background colors */
  --page-bg: #020617;
  --space-inner: #1a1a3e;
  --space-mid: #0f0f23;
  --space-outer: #000000;
  
  /* Card & text */
  --card-bg: #111827;
  --card-text: #ffffff;
  --card-text-muted: #e5e7eb;
  
  /* Interactive */
  --accent: #7dd3fc;
  --danger: #f97373;
  
  /* Borders & accents */
  --card-border: #4b5563;
  --button-border-soft: #374151;
  --button-border-strong: #4b5563;
  --tag-hover-bg: #273549;
}
```

**Benefits**:

- Change theme by updating one file
- Consistent colors across app
- Easy to support dark/light modes

#### Animations

**Background Animations** (looping):

- `star-twinkle` (25s): Stars opacity pulse
- `nebula-drift` (40s): Nebula slow movement
- `light-streaks` (15s): Particle diagonal movement

**Component Animations**:

- `mandala-breathing` (6s): Canvas glow pulse

#### Responsive Design

Mobile-first approach with breakpoints:

```css
/* Base styles: mobile */
.main-layout {
  flex-direction: column;
  padding: 1rem;
}

/* Tablet and larger */
@media (max-width: 1200px) {
  .main-layout {
    flex-direction: row;
    padding: 2rem;
  }
}

/* Desktop and larger */
@media (max-width: 1600px) {
  .main-layout {
    max-width: 1600px;
  }
}
```

### CSS File Organization

| File             | Purpose                                |
|------------------|----------------------------------------|
| `App.css`        | Main styles + theme vars + animations  |
| `Onboarding.css` | Onboarding-specific tweaks (optional)  |
| `RightPanel.css` | Right panel-specific tweaks (optional) |
| `index.css`      | Global reset                           |

### Component-Specific Classes

- `.space-container`: Root wrapper
- `.space-bg`, `.stars-layer`, `.nebula-layer`: Background
- `.main-layout`: Flex container (mandala + panel)
- `.mandala-container`, `.mandala-wrapper`: Canvas wrapper
- `.info-panel`: Right side card
- `.panel-header`, `.panel-content`: Panel sections
- `.tab-nav`, `.tab-btn`: Tab navigation
- `.space-tag`: Styled tags/buttons
- `.form-*`: Form inputs and labels

---

## Future Extensibility

### Planned Features

#### 1. **More Divisional Charts**

Currently supports: Rasi (D1), Navamsa (D9)

Future: D10 (Dasamsa), D7 (Saptamsa), D20 (Vimsamsa), etc.

**Implementation**:

```javascript
// Add to chartData response shape:
{
  meta: { ... },
  rasi: { ... },
  navamsa: { ... },
  dasamsa: { ... },      // D10
  saptamsa: { ... },     // D7
  // etc.
}

// In MandalaContainer, extend activeChartType:
const [activeChartType, setActiveChartType] = useState("rasi");
// Could be "rasi", "navamsa", "dasamsa", "saptamsa", etc.

// In NavamsaView, add more toggle buttons:
<button onClick={() => onChartTypeChange("dasamsa")}>D10</button>
<button onClick={() => onChartTypeChange("saptamsa")}>D7</button>
```

#### 2. **Dasha Timeline**

Currently: Show Dasha lord for hovered Nakshatra

Future: Show full Dasha timeline with:

- Current Mahadasha period
- Antardasha breakdown
- Exact dates
- Timeline visualization

**Implementation**:

```javascript
// Add to DashaView:
// - Calculate current Dasha from Moon longitude
// - Show start/end dates
// - Display remaining time
// - Interactive timeline slider

// Could be new tab or expanded DashaView
```

#### 3. **Transit Overlays**

Future: Show current planetary positions overlaid on natal chart

**Implementation**:

```javascript
// Add transit API call:
const transitPlanets = await getTransitData(currentDateTime, place);

// Render transit planets differently in canvas:
// - Different color (e.g., light blue)
// - Different marker style (e.g., hollow circle)

// Or: Separate transit mandala view
```

#### 4. **Ashtakavarga & Planetary Strength**

Future: Show which segments are strong/weak based on Ashtakavarga

**Implementation**:

```javascript
// API response includes ashtakavarga data:
{
  rasi: { ... },
  ashtakavarga: {
    rashiStrengths: [5, 7, 4, ...],  // per Rashi
    nakStrengths: [6, 8, 5, ...],    // per Nakshatra
  }
}

// Canvas could color segments based on strength:
// - Bright for high strength
// - Dim for low strength
```

#### 5. **Multi-User Comparisons**

Future: Compare two or more charts side-by-side

**Implementation**:

```javascript
// Store multiple chartData objects
// Render multiple MandalaContainer side-by-side
// Highlight compatible/conflicting segments
```

#### 6. **Data Persistence**

Future: Save user's charts, revisit them later

**Implementation**:

```javascript
// localStorage for quick saves:
localStorage.setItem("myCharts", JSON.stringify([...]))

// Or backend database:
// User auth â†’ store charts on server
// Retrieve charts on login
```

#### 7. **Export & Sharing**

Future: Export chart as image/PDF or share link

**Implementation**:

```javascript
// Canvas to Image:
canvas.toBlob(blob => {
  const url = URL.createObjectURL(blob);
  // Trigger download or share
})

// Share URL:
// ?chart={base64EncodedChartData}
// Restore chart from URL parameter
```

### Code Expansion Areas

#### Adding a New Tab View

1. Create new file: `features/rightPanel/views/NewView.jsx`
2. Add to `mandala.types.js`: `RIGHT_PANEL_TABS.NEW_TAB = "new_tab"`
3. In `RightPanelContainer.jsx`, add case:
   ```javascript
   if (activeTab === "new_tab") return <NewView ... />
   ```
4. In `TabNavigation.jsx`, add button:
   ```javascript
   { key: RIGHT_PANEL_TABS.NEW_TAB, label: "New Tab" }
   ```

#### Adding a New Data Source

1. Create `data/newFeatureData.js`
2. Export arrays/objects needed
3. Import in component that uses it
4. No changes to architecture needed

#### Adding Backend Integration

1. Add function to `services/astrologyApi.js`
2. Optionally update `services/mappings.js` if transformation needed
3. Call from appropriate container component
4. Rest of app unchanged

---

## Setup & Installation

### Prerequisites

- Node.js 16+
- npm or yarn

### Initial Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd nakshatra-mandala

# 2. Install dependencies
npm install

# 3. Fix folder case (if needed)
# Ensure src/app/App.jsx exists (not src/App/App.jsx)

# 4. Start development server
npm start
```

### File Structure After Setup

```
nakshatra-mandala/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ App.jsx
â”‚   â”‚   â””â”€â”€ routes.js
â”‚   â”œâ”€â”€ features/
â”‚   â”‚   â”œâ”€â”€ onboarding/
â”‚   â”‚   â”œâ”€â”€ mandala/
â”‚   â”‚   â””â”€â”€ rightPanel/
â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”œâ”€â”€ astrologyApi.js
â”‚   â”‚   â””â”€â”€ mappings.js
â”‚   â”œâ”€â”€ data/
â”‚   â”‚   â”œâ”€â”€ mandalaData.js
â”‚   â”‚   â””â”€â”€ dashaData.js
â”‚   â”œâ”€â”€ styles/
â”‚   â”‚   â”œâ”€â”€ App.css
â”‚   â”‚   â”œâ”€â”€ Onboarding.css
â”‚   â”‚   â””â”€â”€ RightPanel.css
â”‚   â”œâ”€â”€ index.js
â”‚   â””â”€â”€ index.css
â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ index.html
â”‚   â”œâ”€â”€ jupiter.ico
â”‚   â”œâ”€â”€ mars.png
â”‚   â”œâ”€â”€ sun.png
â”‚   â”œâ”€â”€ moon.png
â”‚   â”œâ”€â”€ mercury.png
â”‚   â”œâ”€â”€ saturn.png
â”‚   â”œâ”€â”€ venus.png
â”‚   â”œâ”€â”€ rahu.png
â”‚   â””â”€â”€ ketu.png
â””â”€â”€ package.json
```

### Environment Variables

When backend is ready, add `.env`:

```
REACT_APP_API_URL=https://api.astrology.example.com
REACT_APP_TIMEZONE_API=https://timezone-api.example.com
```

Then update `astrologyApi.js`:

```javascript
const BASE_URL = process.env.REACT_APP_API_URL;
```

---

## Development Guidelines

### Naming Conventions

**Files & Folders**:

- Components: PascalCase (e.g., `OnboardingForm.jsx`)
- Services/Data: camelCase (e.g., `astrologyApi.js`)
- Folders: lowercase (e.g., `onboarding/`, `services/`)
- CSS: lowercase with hyphens (e.g., `App.css`)

**Variables & Functions**:

- Variables: camelCase (`chartData`, `isSubmitting`)
- Constants: UPPER_SNAKE_CASE (`RASHIS`, `MAX_SIZE`)
- Functions: camelCase (`calculateNatalChart`)
- React Components: PascalCase (`OnboardingContainer`)

**CSS Classes**:

- BEM-inspired: `.component-name`, `.component-name__element`, `.component-name--modifier`
- Examples: `.info-panel`, `.tab-nav`, `.space-tag`, `.tab-btn-active`

### Code Style

**React Hooks**:

```javascript
// âœ… Good: Dependencies explicit
const { data, loading } = useMemo(() => {
  return computeData(input);
}, [input]);

// âœ… Good: Cleanup functions
useEffect(() => {
  const listener = () => console.log("resize");
  window.addEventListener("resize", listener);
  return () => window.removeEventListener("resize", listener);
}, []);

// âŒ Avoid: Missing dependencies
useEffect(() => {
  handleEffect(prop); // Missing prop in dependencies!
}, []);
```

**Props Destructuring**:

```javascript
// âœ… Good: Clear prop list
function MyComponent({ name, value, onChange }) {
  // ...
}

// âœ… Also good: Explicit props object for complex components
function ComplexComponent(props) {
  const { large, nested: { value } } = props;
  // ...
}
```

**Comments**:

```javascript
// âœ… Good: Why, not what
// Normalize degree to 0-360 range because canvas uses polar coords
export function normalizeDegree(deg) { ... }

// âŒ Avoid: Stating what code does
// Multiply by 2
const double = num * 2;
```

### Git Workflow

```bash
# Feature branch
git checkout -b feature/new-divisional-charts

# Make changes
git add .
git commit -m "feat: add D10 Dasamsa chart support"

# Push and create PR
git push origin feature/new-divisional-charts
```

### Testing Strategy (Future)

```javascript
// Unit test example
import { getDashaForNakshatra } from "../services/mappings.js";

describe("getDashaForNakshatra", () => {
  it("should return Ketu for Ashwini (index 0)", () => {
    const result = getDashaForNakshatra(0);
    expect(result.lord).toBe("Ketu");
  });
});
```

### Performance Optimization Tips

1. **Memoize expensive calculations**:
   ```javascript
   const derived = useMemo(() => expensive(data), [data]);
   ```

2. **Prevent unnecessary re-renders**:
   ```javascript
   const MemoizedComponent = React.memo(Component);
   ```

3. **Use Canvas efficiently**:
    - Avoid redrawing if nothing changed
    - Use `requestAnimationFrame` for smooth animations

4. **Lazy load divisional chart data**:
    - Don't load D9, D10, etc. until user requests them

---

## Conclusion

This architecture provides:

âœ… **Scalability**: Easy to add features without breaking existing code  
âœ… **Maintainability**: Clear organization and responsibility  
âœ… **Testability**: Isolated services and pure functions  
âœ… **Flexibility**: API layer abstraction allows backend changes  
âœ… **Performance**: Memoization and canvas optimization  
âœ… **User Experience**: Smooth animations and responsive design

The two-step wizard flow, tabbed right panel, and interactive mandala create an intuitive experience for exploring Vedic
astrology and Carnatic music connections.

---

### Document Version

- **Version**: 1.0
- **Last Updated**: December 3, 2025
- **Status**: Complete Restructure Documentation
- **Next Review**: When divisional charts added
