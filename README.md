# ResQNet

### Online & Offline Disaster Preparedness, Emergency Response & Recovery System

> **When infrastructure fails, the phone should not.**

ResQNet is a disaster management platform designed to help citizens, shelters, and authorities prepare for, respond to, and recover from emergencies.

The system combines a web-based frontend with a FastAPI backend and a database-driven architecture. It follows an **offline-first approach**, allowing important emergency information and selected user actions to remain available when internet connectivity is unstable.

---

## 🎯 Problem Statement

During disasters such as floods, earthquakes, cyclones, fires, and other emergencies:

* Mobile networks can become overloaded or unavailable.
* Internet-dependent services may stop working.
* People may lose access to emergency information.
* Finding shelters and medical facilities can become difficult.
* Emergency and damage reports may not reach authorities immediately.

ResQNet addresses these challenges by bringing preparedness information, emergency resources, SOS assistance, reporting, and recovery support into one platform.

---

## 💡 Our Solution

ResQNet supports the major stages of disaster management:

### 1. Prepare

* Disaster-specific safety guides
* Emergency preparedness checklist
* Emergency contacts
* Essential emergency information

### 2. Respond

* SOS emergency assistance
* Emergency map
* Shelter and hospital information
* Location-based emergency support
* Offline-ready emergency data

### 3. Recover

* Damage reporting
* Missing-person reporting
* Help and relief requests
* Emergency alerts
* Authority coordination

---

## ⭐ Key Features

### 👤 Citizen

* User registration and login
* Citizen dashboard
* Disaster preparedness guides
* Emergency checklist
* Emergency contacts
* Emergency map
* Shelter finder
* Hospital finder
* SOS emergency request
* Damage reporting
* Missing-person reporting
* Help and support requests

### 🏠 Shelter Representative

* Shelter dashboard
* Shelter information
* Emergency map
* Government assistance requests
* Emergency contacts
* Hospital information
* Help and support

### 🏛️ Government / Authority

* Command center
* Shelter monitoring
* Emergency alerts
* Citizen reports
* Resource requests
* Missing-person information
* Emergency map
* Hospital and emergency contact information

---

## 📴 Offline & Resilient Operation

A major goal of ResQNet is to remain useful when connectivity becomes unreliable.

The project follows a **Local-First, Sync-Later** approach.

### IndexedDB

The frontend uses IndexedDB to store important information locally, such as:

* Disaster guides
* Shelters
* Hospitals
* Pending SOS requests
* Pending damage reports

When internet connectivity is unavailable, selected actions can be stored locally. Once the connection is restored, the pending information can be synchronized with the backend.

### Offline Navigation

ResQNet also includes an **offline navigation concept** for emergency situations.

Essential location information such as nearby shelters and hospitals can be made available locally so users can still identify important emergency resources when internet connectivity is unavailable.

The offline navigation system is intentionally lightweight and focused on **critical emergency locations and routes**, rather than providing a complete replacement for commercial navigation applications.

---

## 🗺️ Emergency Map

The Emergency Map provides a visual representation of important disaster-response resources.

It focuses on:

* Shelters
* Hospitals
* Medical facilities
* Emergency resources
* User location
* Emergency destinations

The project uses **Leaflet.js** for map visualization.

The system is designed so that important emergency resource information can remain accessible through locally stored data when live connectivity is unavailable.

---

## 🏗️ System Architecture

```text
                         ResQNet
                            │
             ┌──────────────┴──────────────┐
             │                             │
        Frontend                       Backend
     HTML/CSS/JS                    FastAPI + SQLAlchemy
             │                             │
       IndexedDB                    PostgreSQL
             │                             │
       Offline Queue  ───────────►  Sync API
             │                             │
             └──────────────┬──────────────┘
                            │
                     Disaster Response
```

### Online Flow

```text
User
  ↓
Frontend
  ↓
FastAPI API
  ↓
PostgreSQL
  ↓
Response
```

### Offline Flow

```text
User
  ↓
Frontend
  ↓
IndexedDB
  ↓
Local Cache / Offline Queue
  ↓
Internet Restored
  ↓
Sync API
  ↓
FastAPI
  ↓
PostgreSQL
```

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Leaflet.js
* IndexedDB
* Lucide Icons
* Tailwind CSS utilities

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn
* JWT Authentication
* Passlib / bcrypt

### Database

* PostgreSQL

### Development Tools

* Git
* GitHub
* VS Code
* Live Server

---

## 📂 Project Structure

```text
Disaster-Preparedness-System/
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── indexeddb/
│       └── indexedDB.js
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── database/
│   │   ├── emergency/
│   │   ├── maps/
│   │   ├── models/
│   │   ├── preparedness/
│   │   ├── recovery/
│   │   ├── schemas/
│   │   └── sync/
│   │
│   └── requirements.txt
│
└── README.md
```

---

## 🔐 Authentication

ResQNet provides secure backend authentication using:

* User registration
* Password hashing
* Login
* JWT access tokens
* Authenticated API requests

Example endpoints:

```text
POST /api/register
POST /api/login
POST /api/login/oauth2
GET  /api/me
```

---

## 🔌 Important API Endpoints

### Authentication

```text
POST /api/register
POST /api/login
GET  /api/me
```

### Preparedness

```text
GET /api/preparedness/guides/
GET /api/preparedness/checklist
```

### Emergency Resources

```text
GET /api/shelters/
GET /api/emergency/hospitals/
GET /api/recovery/alerts/
```

### SOS

```text
POST /api/sos/
```

The SOS service can use the user's location to assist with nearby emergency resources such as hospitals and shelters.

### Recovery

```text
POST /api/damage
GET  /api/damage

POST /api/missing
GET  /api/missing
```

### Synchronization

```text
POST /api/sync
```

The synchronization endpoint handles information that was stored locally while the user was offline.

---

## 🗄️ Data Management

The backend manages important disaster-response entities including:

* Users
* Shelters
* Hospitals
* SOS requests
* Disaster guides
* Preparedness checklists
* Alerts
* Damage reports
* Missing persons
* Help requests

The central database acts as the primary source of truth, while IndexedDB provides local storage for offline-capable frontend functionality.

---

## ⚙️ Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/Dhruvu2704/Disaster-Preparedness-System.git

cd Disaster-Preparedness-System
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 5. Configure PostgreSQL

Create a PostgreSQL database and configure the database connection in the backend environment.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/ResQNet
```

> **Important:** Never commit `.env` files, passwords, API keys, or database credentials to GitHub.

### 6. Start the backend

From the project directory:

```bash
uvicorn app.main:app --reload --app-dir backend
```

The backend will run at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🌐 Frontend Setup

The frontend can be run using VS Code Live Server or another static web server.

### Using VS Code Live Server

1. Open the `frontend` folder in VS Code.
2. Open `index.html`.
3. Start **Live Server**.
4. Open the generated local URL.

Make sure the backend is running before testing features that require API communication.

---

## 🔄 Offline Workflow

The basic offline workflow is:

```text
First Online Visit
       ↓
Fetch Emergency Data
       ↓
Store Important Data Locally
       ↓
Internet Connection Lost
       ↓
Use Cached Information
       ↓
Queue Important Actions
       ↓
Internet Restored
       ↓
Synchronize With Backend
```

This approach is particularly useful during disasters because temporary network failure should not immediately result in the loss of important emergency information or user submissions.

---

## 🚨 Disaster Management Lifecycle

```text
             PREPARE
                │
                ▼
        EMERGENCY RESPONSE
                │
                ▼
             RECOVERY
                │
                ▼
        COMMUNITY RESILIENCE
```

ResQNet is designed to support users **before, during, and after a disaster**.

---

## 🔮 Future Scope

Future improvements can include:

* More complete offline map support
* Improved offline route calculation
* Multi-language support
* Voice-based emergency assistance
* AI-assisted disaster guidance
* Crowd-sourced hazard reporting
* Family safety tracking
* Bluetooth / Wi-Fi Direct communication
* Advanced government dashboards
* Disaster prediction and analytics
* Push notifications for emergency alerts

---

## 🎯 Expected Impact

### For Citizens

* Faster access to emergency information
* Better disaster preparedness
* Easier access to shelters and hospitals
* Emergency reporting during connectivity problems
* Simple access to SOS assistance

### For Authorities

* Centralized emergency information
* Faster access to citizen reports
* Shelter and resource monitoring
* Better coordination during disaster recovery
* Data-driven disaster-response planning

---

## 📌 Project Status

ResQNet is being developed as an **online and offline-capable disaster preparedness and emergency response platform**.

The project includes:

* Frontend interface
* FastAPI backend
* User authentication
* Emergency resource APIs
* SOS functionality
* Recovery reporting
* IndexedDB local storage
* Synchronization infrastructure
* Emergency map
* Offline-capable emergency information

The offline navigation functionality can be progressively expanded with more advanced offline mapping and routing capabilities.

---

## 👥 Team

### Team Name: Recursive:-

* Dhruvi Srivastava
* Akshara Kamboj
* Saanvvii Jhhaa
* Anjali Mishra
* Aruni Mishra
* Bhavya Aggarwal

---

## 🏆 Hackathon

Developed for:

**Smart India Hackathon 2025**

**Problem Statement:** SIH250008

---

## 📄 License

This project is developed for educational and hackathon purposes.

---

## ❤️ Our Goal

ResQNet aims to build a more resilient disaster-response ecosystem where people can **prepare before a disaster, get help during an emergency, and recover afterward**, even when normal digital infrastructure is disrupted.

### **ResQNet: Prepare. Respond. Recover.**
