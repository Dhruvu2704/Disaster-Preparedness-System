# ResQNet

**Offline-First Disaster Preparedness & Response System**

**Smart India Hackathon 2025 | Problem Statement: SIH250008**

> **When infrastructure fails, the phone should not fail.**

---

## 📌 Project Overview

ResQNet is an **offline-first disaster preparedness, emergency response, and recovery platform** designed for situations where internet connectivity becomes unreliable or completely unavailable.

The system ensures that users can still access:

* Disaster preparedness guides
* Offline emergency maps
* Nearby shelters and hospitals
* Emergency contacts
* SOS functionality
* Recovery and relief reporting

The application follows a **Local-First, Sync-Later architecture**, where critical resources are available offline and synchronized with the server once connectivity is restored.

---

## 🎯 Problem Statement

During disasters such as floods, earthquakes, cyclones, and fires:

* Mobile networks become overloaded
* Internet services fail
* Online maps stop working
* Emergency websites become inaccessible
* Citizens lose access to survival information

Most existing emergency applications depend heavily on cloud connectivity and become ineffective during infrastructure failures.

---

## 💡 Proposed Solution

ResQNet provides a **Progressive Web Application (PWA)** that supports the complete disaster lifecycle.

### 1. Prepare

* Disaster safety guides
* Emergency preparedness checklist
* Emergency contact management
* Local resource download

### 2. Emergency Action

* Offline maps using Leaflet.js
* Shelter and hospital finder
* Offline SOS queue
* Cached emergency resources

### 3. Recovery

* Missing person reporting
* Damage reporting
* Relief assistance requests
* Post-disaster coordination

---

## 🏗️ System Architecture

```text
                  Government / Cloud Server
                  FastAPI + PostgreSQL
                           ▲
                           │ REST APIs
                           ▼

              HTML + CSS + JavaScript (PWA)

        ┌──────────────────────────────────┐
        │         Frontend Layer           │
        │                                  │
        │  • UI Screens                    │
        │  • IndexedDB                     │
        │  • Service Worker                │
        │  • Cache API                     │
        │  • Leaflet Offline Maps          │
        └──────────────────────────────────┘
```

### Architecture Principle

#### Online Flow

```text
Frontend → FastAPI → PostgreSQL → Response
```

#### Offline Flow

```text
Frontend → IndexedDB → Queue Data
                     ↓
              Internet Restored
                     ↓
IndexedDB → /api/sync → FastAPI → PostgreSQL
```

---

## 🛠️ Technology Stack

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **Leaflet.js**
* **Service Worker**
* **IndexedDB**

### Backend

* **FastAPI**
* **SQLAlchemy**
* **PostgreSQL**
* **Uvicorn**

---

## 📂 Project Structure

```text
ResQNet/
│
├── frontend/
│   ├── index.html
│   ├── shelters.html
│   ├── emergency.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js
│       ├── db.js
│       ├── shelters.js
│       └── emergency.js
│
├── backend/
│   ├── app/
│   ├── auth/
│   ├── users/
│   ├── preparedness/
│   ├── maps/
│   ├── emergency/
│   ├── recovery/
│   ├── sync/
│   ├── models/
│   ├── database/
│   ├── schemas/
│   ├── services/
│   ├── main.py
│   └── requirements.txt
│
└── database/
    └── ResQNet_schema.sql
```

---

## 🗄️ Database Architecture

### Core PostgreSQL Tables

#### User Management

* `users`
* `emergency_contacts`

#### Preparedness

* `disaster_guides`
* `preparedness_checklist`

#### Maps & Location

* `shelters`
* `hospitals`
* `police_stations`
* `fire_stations`

#### Emergency

* `sos_requests`

#### Recovery

* `missing_persons`
* `damage_reports`
* `help_requests`

#### Alerts

* `alerts`

---

## 📦 IndexedDB Design

IndexedDB is used only for **offline caching and queued synchronization**.

### Cached Data

```text
guides
shelters
hospitals
```

### Offline Queues

```text
sos_queue
damage_queue
```

This keeps the browser database lightweight while PostgreSQL remains the permanent source of truth.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint        |
| ------ | --------------- |
| POST   | `/api/register` |
| POST   | `/api/login`    |

### Preparedness

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | `/api/guides`        |
| GET    | `/api/guides/{type}` |
| GET    | `/api/checklist`     |

### Maps

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/api/shelters`     |
| GET    | `/api/hospitals`    |
| GET    | `/api/police`       |
| GET    | `/api/firestations` |

### Emergency

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/sos`         |
| GET    | `/api/sos/history` |

### Recovery

| Method | Endpoint       |
| ------ | -------------- |
| POST   | `/api/missing` |
| POST   | `/api/damage`  |
| POST   | `/api/help`    |

### Synchronization

| Method | Endpoint    |
| ------ | ----------- |
| POST   | `/api/sync` |

---

## ⚙️ Backend Setup

### 1. Clone Repository

```bash
git clone https://github.com/Dhruvu2704/Disaster-Preparedness-System.git
cd Disaster-Preparedness-System
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r backend/requirements.txt
```

### 5. Create PostgreSQL Database

```sql
CREATE DATABASE ResQNet;
```

### 6. Run Schema

```bash
psql -U postgres -d ResQNet -f database/ResQNet_schema.sql
```

### 7. Start FastAPI Server

```bash
uvicorn backend.main:app --reload
```

API documentation will be available at:

```text
http://127.0.0.1:8000/docs
```

---

## 🌐 Frontend Setup

Since the frontend is a PWA, it can be served using any static server.

### Option 1: VS Code Live Server

Open the `frontend` folder and run **Live Server**.

### Option 2: Python HTTP Server

```bash
cd frontend
python -m http.server 5500
```

Open:

```text
http://localhost:5500
```

---

## 🔄 Offline Workflow

### First Launch (Online)

1. User opens the application
2. Frontend downloads:

   * shelters
   * hospitals
   * disaster guides
   * alerts
3. Data is stored in **IndexedDB**
4. Service Worker caches static assets

### During Network Failure

* Maps load from cache
* Shelters load from IndexedDB
* Guides remain accessible
* SOS requests are stored locally in `sos_queue`

### When Internet Returns

The Sync Service automatically:

1. Reads pending records from IndexedDB
2. Sends them to `/api/sync`
3. Stores them in PostgreSQL
4. Marks local records as synchronized

---

## 📱 Key Features

### Offline Features

* ✅ Offline disaster guides
* ✅ Offline shelter finder
* ✅ Offline hospital finder
* ✅ Offline emergency contacts
* ✅ Offline SOS queue
* ✅ Automatic synchronization

### Online Features

* ✅ User authentication
* ✅ Centralized shelter database
* ✅ Real-time alerts
* ✅ Recovery reporting
* ✅ Administrative analytics

---

## 🚀 Future Scope

The architecture has been designed to support future enhancements such as:

* AI-based disaster guidance
* Multi-language support
* Voice-based emergency assistance
* Crowd-sourced hazard reporting
* Family safety tracking
* Bluetooth / Wi-Fi Direct mesh communication
* Predictive disaster analytics
* Government emergency dashboards

---

## 📊 Expected Impact

### Citizen Benefits

* Reliable emergency assistance without internet
* Faster access to shelters and hospitals
* Improved disaster preparedness
* Simplified recovery reporting

### Government Benefits

* Centralized SOS collection
* Damage heat-map generation
* Resource prioritization
* Data-driven relief planning

---

## 📖 Disaster Lifecycle Supported

```text
PREPARE
   ↓
EMERGENCY ACTION
   ↓
RECOVERY
```

ResQNet is designed to remain useful **before, during, and after a disaster**, making it more than just an SOS application.

---

## 📌 Final Statement

> **ResQNet transforms a smartphone into a disaster survival toolkit that continues functioning even when conventional digital infrastructure becomes unavailable.**

This project was developed for **Smart India Hackathon 2025** under **Problem Statement SIH250008** and follows an **offline-first, resilient emergency response architecture** using **HTML, CSS, JavaScript, IndexedDB, FastAPI, and PostgreSQL**.

---

## 📄 License

This project is developed for **educational and hackathon purposes** under the Smart India Hackathon initiative.

---

## 🙏 Acknowledgement

Developed as part of **Smart India Hackathon 2025** to build a resilient, accessible, and offline-capable disaster preparedness and response platform for citizens and emergency management authorities.

## Team Name
Recursive:- 

* Dhruvi Srivastava 
* Akshara Kamboj
* Saanvvii Jhhaa
* Anjali Mishra
* Aruni Mishra
* Bhavya Aggarwal 