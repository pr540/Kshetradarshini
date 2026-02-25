# Kshetradarshini - Divine Seva Booking App

Kshetradarshini is a premium, full-stack mobile application designed for devotees to book spiritual services (Sevas) at Hindu temples with ease. The app features a rich "Deep Temple Red" and "Auspicious Gold" aesthetic, reflecting true spiritual heritage.

---

## 🛠️ Tech Stack

### **Frontend (Mobile App)**
*   **Framework**: [Expo](https://expo.dev/) (React Native)
*   **Navigation**: React Navigation (Stack)
*   **Icons**: Lucide React Native
*   **Styling**: Vanilla StyleSheet with a custom Design System
*   **API Client**: Axios
*   **Icons & Assets**: Custom Logo & Branding

### **Backend (API Gateway)**
*   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
*   **Server**: Uvicorn
*   **Database**: MySQL
*   **Driver**: MySQL Connector Python (Raw SQL with Connection Pooling)
*   **Features**: Automated DB Initialization & Seeding, Mock Mode fallback.

---

## 🚀 Getting Started

### **1. Backend Setup**
Navigate to the backend directory and set up your environment:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python run.py
```
*The backend will automatically create the database and seed initial sevas.*

### **2. Frontend Setup**
Navigate to the app directory and install dependencies:
```powershell
cd Kshetradarshini
npm install
```

### **3. Running the App**
To run on your physical device or emulator:
```powershell
# For physical phone testing (recommended)
npx expo start --tunnel

# For general development
npx expo start
```

---

## 📁 Project Structure

```text
├── Kshetradarshini/         # Mobile Application (Frontend)
│   ├── assets/              # Logos and Images
│   ├── src/
│   │   ├── components/      # Reusable UI elements
│   │   ├── constants/       # Theme (Red & Gold) and SIZES
│   │   ├── navigation/      # AppNavigator & Stack
│   │   ├── screens/         # Login, Home, Booking, Profile, etc.
│   │   └── services/        # API calls (api.js)
│   └── App.js               # Root entry with SafeAreaProvider
│
└── backend/                 # Python API (Backend)
    ├── main.py              # FastAPI Endpoints
    ├── db.py                # Database Connection & Pooling
    ├── run.py               # Startup & DB Orchestration
    ├── create_db.py         # Table Schemas
    └── seed.py              # Initial Data Seeding
```

---

## ✨ Key Features
*   **Premium UI**: Custom Red and Gold theme with glassmorphism effects.
*   **Dynamic Booking**: Real-time fetching of Seva prices and details.
*   **Mock Mode**: Backend works even without a live DB using smart fallbacks.
*   **Social Integration**: One-tap access to WhatsApp, LinkedIn, GitHub, and Instagram.
*   **Smart Success Screen**: Dynamic receipts with Share and Download capabilities.
*   **User Profiles**: Dynamic avatars and account management.

---

## 📈 Development Milestones (Today's Progress)
1.  **Phase 1**: Backend API setup with FastAPI and MySQL.
2.  **Phase 2**: Premium Red & Gold theme implementation for Frontend.
3.  **Phase 3**: Booking & Payment flow integration with Mock API support.
4.  **Phase 4**: Profile Screen creation and Social Media deep-linking.
5.  **Phase 5**: Stability & Resilience (Fixed SafeAreaView issues and Property Errors).

---

## 🔱 Developed By
**Antigravity AI Assistant** for the Google DeepMind Team.
