# Traffic Management Command Center

A modern, real-time traffic management system designed for professional command center operations. Built with React, TypeScript, and Tailwind CSS.

## 🚦 System Overview

This application implements a sophisticated "Launcher Dashboard" architecture, allowing operators to open dedicated monitoring windows across multiple displays - perfect for command center setups.

### Key Features

- **🎯 Launcher Dashboard**: Central control panel with system metrics and module launchers
- **🗺️ Live Traffic Map**: Real-time traffic signals and incident monitoring
- **📹 Camera Grid**: 16-feed video monitoring system with status indicators  
- **🚨 Alerts Console**: AI-powered incident management with automated response planning
- **📋 Violation Logs**: Traffic infringement tracking with evidence management
- **📊 Multi-Monitor Support**: Each module opens in dedicated windows for optimal operator workflow

## 🎨 Design System

Professional dark-theme command center interface featuring:
- **Color-coded severity levels** (Green/Yellow/Red for traffic signals)
- **Real-time status indicators** with smooth animations
- **Professional gradients and shadows** optimized for 24/7 operations
- **Semantic design tokens** ensuring consistent styling across all components

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:8080`

## 🏗️ Architecture

### Frontend Structure
- **Launcher (`/`)**: Main dashboard with stats and module launchers
- **Map View (`/map`)**: Traffic signals and alerts visualization
- **Camera Grid (`/cameras`)**: Video monitoring interface
- **Alerts Console (`/alerts`)**: Incident management system
- **Violations View (`/violations`)**: Traffic enforcement tracking

### Multi-Window Operation
Click "Launch" buttons on the main dashboard to open dedicated windows:
```javascript
window.open('/map', 'MapViewWindow', 'width=1200,height=800...')
```

Perfect for spreading across multiple monitors in a command center setup.

## 🔧 Backend Integration Required

This is currently a **frontend-only prototype** with mock data. For full functionality, you need to connect to Supabase:

### 🎯 Why Supabase?
- **Real-time WebSocket connections** for live traffic updates
- **PostgreSQL with PostGIS** for geospatial traffic signal coordinates  
- **Secure API endpoints** for alert management and violation tracking
- **Edge Functions** for AI integration (Gemini API) and external services

### 🚀 Connect to Supabase

1. **Click the green Supabase button** in the top-right of your Lovable interface
2. **Connect your Supabase project** or create a new one
3. **Supabase will automatically provision**:
   - Real-time database tables for traffic data
   - WebSocket subscriptions for live updates
   - Edge functions for AI response generation
   - Secure secret management for API keys

[📖 Supabase Integration Guide](https://docs.lovable.dev/integrations/supabase/)

## 🎯 Required Backend Features

Once Supabase is connected, the system will need:

### Database Schema
```sql
-- Traffic signals with real-time status
CREATE TABLE traffic_signals (
  id TEXT PRIMARY KEY,
  location TEXT,
  coordinates POINT,
  status TEXT CHECK (status IN ('green', 'yellow', 'red')),
  last_update TIMESTAMP
);

-- Real-time alerts and incidents  
CREATE TABLE alerts (
  id TEXT PRIMARY KEY,
  type TEXT,
  severity TEXT CHECK (severity IN ('high', 'medium', 'low')),
  location TEXT,
  coordinates POINT,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'acknowledged', 'escalated', 'resolved')),
  created_at TIMESTAMP
);

-- Traffic violations with evidence
CREATE TABLE violations (
  id TEXT PRIMARY KEY,
  license_plate TEXT,
  violation_type TEXT,
  timestamp TIMESTAMP,
  location TEXT,
  camera_id TEXT,
  evidence_urls TEXT[],
  status TEXT
);
```

### WebSocket Channels
- `traffic_signals` - Real-time signal status updates
- `alerts` - Live incident notifications
- `violations` - New violation detections

### AI Integration
Edge function for Gemini API integration:
```javascript
// Supabase Edge Function: generate-action-plan
const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${GEMINI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: `Generate emergency response plan for: ${alertDetails}` }]
    }]
  })
});
```

## 🔒 Security Considerations

- **Row Level Security (RLS)** for operator access control
- **API key management** through Supabase secrets
- **Real-time data encryption** for sensitive traffic information
- **Audit logging** for all operator actions

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** with custom design system
- **Shadcn/ui** components (heavily customized)
- **Lucide React** icons
- **React Router** for multi-window navigation
- **TanStack Query** for data management
- **Supabase** for backend infrastructure


## 📊 Mock Data

Current implementation includes realistic mock data:
- **5 traffic signals** across Bhubaneshwar locations
- **14 active alerts** with varying severity levels
- **247 daily violations** with evidence tracking
- **16 camera feeds** with status monitoring

## 🔮 Future Enhancements

With Supabase backend connected:
- **Real-time traffic flow analysis**
- **Predictive congestion modeling** 
- **Integration with city IoT sensors**
- **Mobile app for field operators**
- **Advanced analytics dashboard**
- **Emergency services coordination**

---
