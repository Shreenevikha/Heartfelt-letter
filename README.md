# 🌹 BEFORE I SAY FOREVER
### *A Luxury Digital Love Story dedicated to Raghav*

> **“The space between ‘I like you’ and ‘I love you.’”**

An intimate, cinematic, luxury editorial interactive experience designed from **Juliet** to **Raghav**. Built with golden hour warmth, midnight obsidian tones, champagne gold typography, sacred memories of **October 2 & 3**, interactive keepsake letters, and a promise of forever until the last breath.

---

## ✨ Features & Highlights

- **🌙 11 Luxury Story Chapters**: Seamless continuous vertical scroll from Dawn to Sanctuary with active scroll tracking (*ScrollSpy*).
- **💍 Sacred Milestone (October 2 & 3)**: The unforgettable turning point when Juliet confessed *"I love you"* and witnessed Raghav's radiant joy.
- **✨ The Answer to All Prayers**: Raghav celebrated as the sanctuary, safe home, and divine answer to Juliet's lifelong prayers.
- **💌 Kept & Studied Letters**: Tactile parchment reader featuring Raghav's handwritten notes that Juliet re-reads with devotion.
- **📱 Mobile-First & Device Simulation**:
  - Smooth vertical touch scrolling and thumb-friendly controls.
  - Native bottom-sheet memory drawers with tactile photo cards.
  - **Desktop Phone Simulator**: Toggle between *Fullscreen Desktop View* and an *iPhone 16 Pro Viewport* with dynamic island and frame.
- **🎵 Romantic Web Audio Engine**:
  - Ambient piano and synth chord progressions generated in-browser.
  - Heartbeat pulse, celestial chimes, and interactive music player.
- **🌌 Interactive Celestial Constellation**:
  - Star map where each memory connected lights up the celestial heart.
- **🎨 “Golden Hour × Midnight Noir” Aesthetic**:
  - Obsidian noir backgrounds (`#040407`), champagne gold highlights (`#e6ca85`), warm ivory calligraphy, and delicate sunlight rays.

---

## 🚀 Quick Start: How to Run the Project

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed.
```bash
node -v
npm -v
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Local Development Server
```bash
npm run dev
```

The terminal will display the local and network URLs:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://<your-ip-address>:5173/
```

Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 📱 Viewing on a Mobile Phone

### Method A: Network Sharing (Same Wi-Fi)
1. Run `npm run dev -- --host`.
2. Connect your phone to the same Wi-Fi network as your computer.
3. Open the **Network URL** shown in the terminal (e.g. `http://192.168.x.x:5173/`) on your phone’s browser (Safari/Chrome).

### Method B: Desktop Mobile Simulator
1. Open **`http://localhost:5173/`** on your desktop browser.
2. Click the **📱 "Phone View"** button in the top navigation bar to activate the iPhone 16 Pro simulation frame with touch scroll and dynamic island.

---

## 🛠️ Build & Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## ✍️ How to Customize the Story & Memories

All texts, dates, names, photos, songs, and secret messages are centralized in a single file for easy customization:

📍 **[`src/data/storyData.ts`](file:///e:/working/hello/src/data/storyData.ts)**

You can easily edit:
- **`STORY_META`**: Names, theme, titles, dedications.
- **`CHAPTER_01_DATA`**: Dating card bio, tags, and 5 journey milestones.
- **`CHAPTER_02_DATA`**: Flower memories, quotes, and botanical descriptions.
- **`CHAPTER_03_DATA`**: Cinema ticket details (*Avengers: Endgame*, date, showtime, seat) and 35mm film strip frames.
- **`CHAPTER_04_DATA`**: Digital gift titles, code snippets, and feature tags.
- **`CHAPTER_06_DATA`**: 8 personal reasons for *"I Like You"* with custom polaroid photos.
- **`CHAPTER_07_DATA`**: Midnight car playlist track names and romantic notes.
- **`CHAPTER_09_DATA`**: Star names and constellation memories.
- **`FINAL_CHAPTER_DATA`**: Signoff, rose tooltip, and the wax-sealed **P.S. Secret Letter**.

---

## 📂 Project Structure

```
├── public/                  # Static assets & icons
├── src/
│   ├── components/
│   │   ├── chapters/        # 11 Chapter Story Components
│   │   │   ├── IntroScene.tsx
│   │   │   ├── Chapter01Beginning.tsx
│   │   │   ├── Chapter02Flowers.tsx
│   │   │   ├── Chapter03Midnight.tsx
│   │   │   ├── Chapter04Gifts.tsx
│   │   │   ├── Chapter05LoveYou3000.tsx
│   │   │   ├── Chapter06LikeYou.tsx
│   │   │   ├── Chapter07Road.tsx
│   │   │   ├── Chapter08NoPromises.tsx
│   │   │   ├── Chapter09Constellation.tsx
│   │   │   └── FinalScene.tsx
│   │   ├── effects/         # Starfield, Custom Cursor, Petal Rain, Film Grain
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── StarfieldBackground.tsx
│   │   │   └── PetalRain.tsx
│   │   └── ui/              # Navigation, Memory Modal, Secret Drawer
│   │       ├── NavigationControls.tsx
│   │       ├── MemoryModal.tsx
│   │       └── SecretDrawer.tsx
│   ├── data/
│   │   └── storyData.ts     # Centralized Story Data & Content
│   ├── types/
│   │   └── story.ts         # TypeScript Interfaces
│   ├── utils/
│   │   └── audioEngine.ts   # Web Audio Synthesizer & Sound FX Engine
│   ├── App.tsx              # Main Scroll Layout & Intersection Observer
│   ├── index.css            # Tailwind CSS & Luxury Editorial Fonts
│   └── main.tsx             # Entry Point
├── package.json             # Project Dependencies & Scripts
├── vite.config.ts           # Vite Configuration
└── README.md                # Documentation
```

---

## 💻 Tech Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** (Cinematic transitions & scroll animations)
- **Lucide React** (Icons)
- **Canvas Confetti** (Finale celebration burst)
- **Web Audio API** (Procedural ambient romance soundtrack)
