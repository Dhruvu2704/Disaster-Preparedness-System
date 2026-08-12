-- =============================================================================
-- RESQNET DATABASE SCHEMA (PostgreSQL)
-- SIH Problem Statement: SIH250008
-- Updated Database Team Guidelines
-- =============================================================================

-- =============================================================================
-- DROP TABLES
-- =============================================================================

DROP TABLE IF EXISTS hazard_hotspots CASCADE;
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS help_requests CASCADE;
DROP TABLE IF EXISTS damage_reports CASCADE;
DROP TABLE IF EXISTS missing_persons CASCADE;
DROP TABLE IF EXISTS sos_requests CASCADE;
DROP TABLE IF EXISTS fire_stations CASCADE;
DROP TABLE IF EXISTS police_stations CASCADE;
DROP TABLE IF EXISTS hospitals CASCADE;
DROP TABLE IF EXISTS shelters CASCADE;
DROP TABLE IF EXISTS preparedness_checklist CASCADE;
DROP TABLE IF EXISTS disaster_guides CASCADE;
DROP TABLE IF EXISTS emergency_contacts CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- =============================================================================
-- 6.1 USERS MODULE
-- =============================================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    blood_group VARCHAR(10),
    medical_conditions TEXT,
    address TEXT,
    city VARCHAR(100),
    district VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE emergency_contacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    relationship VARCHAR(50)
);


-- =============================================================================
-- 6.2 PREPAREDNESS MODULE
-- =============================================================================

CREATE TABLE disaster_guides (
    id SERIAL PRIMARY KEY,
    disaster_type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    before_text TEXT,
    during_text TEXT,
    after_text TEXT
);

CREATE TABLE preparedness_checklist (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(150) NOT NULL,
    category VARCHAR(50),
    required BOOLEAN DEFAULT FALSE
);


-- =============================================================================
-- 6.3 MAPS & LOCATION MODULE
-- =============================================================================

CREATE TABLE shelters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    capacity INTEGER DEFAULT 0 CHECK (capacity >= 0),
    status VARCHAR(50) DEFAULT 'Active',
    district VARCHAR(100)
);

CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    phone VARCHAR(20),
    beds_available INTEGER DEFAULT 0 CHECK (beds_available >= 0)
);

CREATE TABLE police_stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE fire_stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    phone VARCHAR(20)
);


-- =============================================================================
-- 6.4 EMERGENCY MODULE
-- =============================================================================

CREATE TABLE sos_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users(id)
        ON DELETE SET NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    battery_level INTEGER,
    status VARCHAR(30) DEFAULT 'Pending'
        CHECK (status IN (
            'Pending',
            'Received',
            'Assigned',
            'Resolved'
        )),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    received_at TIMESTAMP
);


-- =============================================================================
-- 6.5 RECOVERY MODULE
-- =============================================================================

CREATE TABLE missing_persons (
    id SERIAL PRIMARY KEY,
    reported_by INTEGER
        REFERENCES users(id)
        ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    age INTEGER,
    gender VARCHAR(20),
    photo TEXT,
    last_seen TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    status VARCHAR(30) DEFAULT 'Missing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE damage_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users(id)
        ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    photo TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    severity VARCHAR(30),
    status VARCHAR(30) DEFAULT 'Reported',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE help_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users(id)
        ON DELETE SET NULL,
    food BOOLEAN DEFAULT FALSE,
    medicine BOOLEAN DEFAULT FALSE,
    water BOOLEAN DEFAULT FALSE,
    shelter BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'Medium',
    status VARCHAR(30) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================================
-- 6.6 ALERTS MODULE
-- =============================================================================

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    severity VARCHAR(30),
    district VARCHAR(100),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================================
-- 6.7 HAZARD HOTSPOTS MODULE
-- =============================================================================

CREATE TABLE hazard_hotspots (
    id SERIAL PRIMARY KEY,
    district VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    risk_score DOUBLE PRECISION NOT NULL,
    risk_level VARCHAR(30) NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
