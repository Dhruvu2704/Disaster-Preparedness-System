-- =============================================================================
-- RESQNET USEFUL BACKEND QUERIES
-- =============================================================================


-- =============================================================================
-- 1. AUTHENTICATION & USER PROFILE APIS
-- =============================================================================

-- Register a new user
INSERT INTO users
(name, email, password_hash, phone, blood_group, medical_conditions, address, city, district)
VALUES
('New User',
 'user@example.com',
 'hashed_pass',
 '9876543210',
 'O+',
 'None',
 'Main St',
 'Noida',
 'Gautam Buddha Nagar')
RETURNING id, name, email;


-- Get user by email (For Login)
SELECT id, email, password_hash
FROM users
WHERE email = 'aarav.sharma@gmail.com';


-- Get full user profile
SELECT id, name, email, phone, blood_group,
       medical_conditions, address, city, district, created_at
FROM users
WHERE id = 1;


-- Update user profile
UPDATE users
SET phone = '9998887770',
    blood_group = 'A+',
    medical_conditions = 'Asthma'
WHERE id = 1;


-- =============================================================================
-- 2. EMERGENCY CONTACTS APIS
-- =============================================================================

-- Get all emergency contacts for a specific user
SELECT id, name, phone, relationship
FROM emergency_contacts
WHERE user_id = 1;


-- Add a new emergency contact
INSERT INTO emergency_contacts
(user_id, name, phone, relationship)
VALUES
(1, 'Karan Sharma', '9811100099', 'Brother')
RETURNING id, name, phone, relationship;


-- Delete an emergency contact
DELETE FROM emergency_contacts
WHERE id = 1
  AND user_id = 1;


-- =============================================================================
-- 3. PREPAREDNESS & ALERTS APIS
-- =============================================================================

-- Get all disaster guides
SELECT id, disaster_type, title,
       before_text, during_text, after_text
FROM disaster_guides;


-- Get a specific disaster guide by type
SELECT id, disaster_type, title,
       before_text, during_text, after_text
FROM disaster_guides
WHERE LOWER(disaster_type) = LOWER('Flood');


-- Get preparedness checklist items
SELECT id, item_name, category, required
FROM preparedness_checklist
ORDER BY id;


-- Get latest active alerts for a district
SELECT id, title, description, severity,
       district, start_time, end_time, created_at
FROM alerts
WHERE district = 'Ghaziabad'
  AND start_time <= CURRENT_TIMESTAMP
  AND end_time > CURRENT_TIMESTAMP
ORDER BY created_at DESC;


-- Get all active alerts
SELECT id, title, description, severity,
       district, start_time, end_time, created_at
FROM alerts
WHERE start_time <= CURRENT_TIMESTAMP
  AND end_time > CURRENT_TIMESTAMP
ORDER BY created_at DESC;


-- =============================================================================
-- 4. MAPS & LOCATION APIS
-- =============================================================================

-- Get all active shelters
SELECT id, name, latitude, longitude,
       capacity, status, district
FROM shelters
WHERE status = 'Active';


-- Get all hospitals with available beds
SELECT id, name, latitude, longitude,
       phone, beds_available
FROM hospitals
WHERE beds_available > 0
ORDER BY beds_available DESC;


-- Get all police stations
SELECT id, name, latitude, longitude, phone
FROM police_stations;


-- Get all fire stations
SELECT id, name, latitude, longitude, phone
FROM fire_stations;


-- =============================================================================
-- 5. EMERGENCY SOS APIS
-- =============================================================================

-- Create a new SOS alert
INSERT INTO sos_requests
(user_id, latitude, longitude, battery_level, status, created_at)
VALUES
(1, 28.6285, 77.3715, 85, 'Pending', CURRENT_TIMESTAMP)
RETURNING id, status, created_at;


-- Get SOS history for a user
SELECT id, latitude, longitude,
       battery_level, status,
       created_at, received_at
FROM sos_requests
WHERE user_id = 1
ORDER BY created_at DESC;


-- Admin: Get all pending SOS requests with user details
SELECT s.id,
       u.name,
       u.phone,
       u.blood_group,
       s.latitude,
       s.longitude,
       s.battery_level,
       s.status,
       s.created_at
FROM sos_requests s
JOIN users u
  ON s.user_id = u.id
WHERE s.status = 'Pending'
ORDER BY s.created_at DESC;


-- Update SOS status
UPDATE sos_requests
SET status = 'Received',
    received_at = CURRENT_TIMESTAMP
WHERE id = 1;


-- =============================================================================
-- 6. RECOVERY MODULE APIS
-- =============================================================================

-- Report a missing person
INSERT INTO missing_persons
(reported_by, name, age, gender, photo,
 last_seen, latitude, longitude, status, created_at)
VALUES
(1,
 'Aman Verma',
 25,
 'Male',
 'https://example.com/photo.jpg',
 'Near Sector 62 Market',
 28.6280,
 77.3700,
 'Missing',
 CURRENT_TIMESTAMP)
RETURNING id, name, status, created_at;


-- Get all missing person reports
SELECT m.id,
       m.name,
       m.age,
       m.gender,
       m.photo,
       m.last_seen,
       m.latitude,
       m.longitude,
       m.status,
       m.created_at,
       u.name AS reported_by_user
FROM missing_persons m
LEFT JOIN users u
  ON m.reported_by = u.id
ORDER BY m.created_at DESC;


-- Submit a damage report
INSERT INTO damage_reports
(user_id, type, description, photo,
 latitude, longitude, severity, status, created_at)
VALUES
(1,
 'Fallen Tree',
 'Large tree blocking main road',
 'https://example.com/tree.jpg',
 28.6300,
 77.3710,
 'Medium',
 'Reported',
 CURRENT_TIMESTAMP)
RETURNING id, type, severity, status, created_at;


-- Get damage reports for the heatmap
SELECT id,
       type,
       latitude,
       longitude,
       severity,
       status,
       created_at
FROM damage_reports
ORDER BY created_at DESC;


-- Submit a help request
INSERT INTO help_requests
(user_id, food, medicine, water, shelter,
 priority, status, created_at)
VALUES
(1,
 TRUE,
 FALSE,
 TRUE,
 FALSE,
 'High',
 'Pending',
 CURRENT_TIMESTAMP)
RETURNING id, priority, status, created_at;


-- =============================================================================
-- 7. HAZARD HOTSPOTS / HEATMAP APIS
-- =============================================================================

-- Get all generated hazard hotspots
SELECT id,
       district,
       latitude,
       longitude,
       risk_score,
       risk_level,
       generated_at
FROM hazard_hotspots
ORDER BY risk_score DESC;


-- Get high-risk hotspots
SELECT id,
       district,
       latitude,
       longitude,
       risk_score,
       risk_level,
       generated_at
FROM hazard_hotspots
WHERE risk_level = 'High'
ORDER BY risk_score DESC;


-- Get hotspot data for a specific district
SELECT id,
       district,
       latitude,
       longitude,
       risk_score,
       risk_level
FROM hazard_hotspots
WHERE district = 'Ghaziabad'
ORDER BY risk_score DESC;


-- Get SOS coordinates for heatmap generation
SELECT id,
       latitude,
       longitude,
       created_at
FROM sos_requests
ORDER BY created_at DESC;


-- Get damage-report coordinates for heatmap generation
SELECT id,
       latitude,
       longitude,
       severity,
       created_at
FROM damage_reports
ORDER BY created_at DESC;


-- =============================================================================
-- 8. OFFLINE SYNC API
-- =============================================================================

-- Example batch sync query used by FastAPI
-- when internet connectivity is restored

INSERT INTO sos_requests
(user_id, latitude, longitude, battery_level, status, created_at)
VALUES
(1,
 28.6285,
 77.3715,
 40,
 'Pending',
 '2026-08-08 20:00:00')
RETURNING id, status, created_at;
