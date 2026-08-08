-- =============================================================================
-- RESCUENET USEFUL BACKEND QUERIES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. AUTHENTICATION & USER PROFILE APIS (7.1 & 7.2)
-- -----------------------------------------------------------------------------

-- Register a new user
INSERT INTO users (name, email, password, phone, blood_group, medical_conditions, address, city, district)
VALUES ('New User', 'user@example.com', 'hashed_pass', '9876543210', 'O+', 'None', 'Main St', 'Noida', 'Gautam Buddha Nagar')
RETURNING id, name, email;

-- Get user by email (For Login)
SELECT id, email, password FROM users WHERE email = 'aarav.sharma@gmail.com';

-- Get full user profile
SELECT id, name, email, phone, blood_group, medical_conditions, address, city, district 
FROM users 
WHERE id = 1;

-- Update user profile
UPDATE users 
SET phone = '9998887770', blood_group = 'A+', medical_conditions = 'Asthma' 
WHERE id = 1;


-- -----------------------------------------------------------------------------
-- 2. EMERGENCY CONTACTS APIS (7.3)
-- -----------------------------------------------------------------------------

-- Get all emergency contacts for a specific user
SELECT id, name, phone, relationship 
FROM emergency_contacts 
WHERE user_id = 1;

-- Add a new emergency contact
INSERT INTO emergency_contacts (user_id, name, phone, relationship)
VALUES (1, 'Karan Sharma', '9811100099', 'Brother');

-- Delete an emergency contact
DELETE FROM emergency_contacts WHERE id = 1 AND user_id = 1;


-- -----------------------------------------------------------------------------
-- 3. PREPAREDNESS & ALERTS APIS (7.4 & 7.5)
-- -----------------------------------------------------------------------------

-- Get all disaster guides
SELECT id, disaster_type, title, before_text, during_text, after_text 
FROM disaster_guides;

-- Get a specific disaster guide by type (e.g., Flood)
SELECT * FROM disaster_guides WHERE LOWER(disaster_type) = LOWER('Flood');

-- Get preparedness checklist items
SELECT id, item_name, category, required FROM preparedness_checklist;

-- Get latest active alerts for a district
SELECT id, title, description, severity, district, start_time, end_time 
FROM alerts 
WHERE district = 'Ghaziabad' AND end_time > CURRENT_TIMESTAMP;


-- -----------------------------------------------------------------------------
-- 4. MAPS & LOCATION APIS (7.6)
-- -----------------------------------------------------------------------------

-- Get all active shelters
SELECT id, name, latitude, longitude, capacity, status, district 
FROM shelters 
WHERE status = 'Active';

-- Get all hospitals with available beds
SELECT id, name, latitude, longitude, phone, beds_available 
FROM hospitals 
ORDER BY beds_available DESC;

-- Get all police stations
SELECT id, name, latitude, longitude, phone FROM police_stations;

-- Get all fire stations
SELECT id, name, latitude, longitude, phone FROM fire_stations;


-- -----------------------------------------------------------------------------
-- 5. EMERGENCY SOS APIS (7.7)
-- -----------------------------------------------------------------------------

-- Create a new SOS alert
INSERT INTO sos_requests (user_id, latitude, longitude, battery_level, status, created_at)
VALUES (1, 28.6285, 77.3715, 85, 'Pending', CURRENT_TIMESTAMP)
RETURNING id, status;

-- Get SOS history for a user
SELECT id, latitude, longitude, battery_level, status, created_at, received_at 
FROM sos_requests 
WHERE user_id = 1 
ORDER BY created_at DESC;

-- Admin: Get all pending SOS requests with user details
SELECT s.id, u.name, u.phone, u.blood_group, s.latitude, s.longitude, s.battery_level, s.created_at
FROM sos_requests s
JOIN users u ON s.user_id = u.id
WHERE s.status = 'Pending'
ORDER BY s.created_at DESC;


-- -----------------------------------------------------------------------------
-- 6. RECOVERY MODULE APIS (7.8)
-- -----------------------------------------------------------------------------

-- Report a missing person
INSERT INTO missing_persons (reported_by, name, age, gender, photo, last_seen, latitude, longitude, status)
VALUES (1, 'Aman Verma', 25, 'Male', 'https://example.com/photo.jpg', 'Near Sector 62 Market', 28.6280, 77.3700, 'Missing');

-- Get all missing person reports
SELECT m.id, m.name, m.age, m.gender, m.photo, m.last_seen, m.status, u.name AS reported_by_user
FROM missing_persons m
LEFT JOIN users u ON m.reported_by = u.id
ORDER BY m.id DESC;

-- Submit a damage report
INSERT INTO damage_reports (user_id, type, description, photo, latitude, longitude, severity, status)
VALUES (1, 'Fallen Tree', 'Large tree blocking main road', 'https://example.com/tree.jpg', 28.6300, 77.3710, 'Medium', 'Reported');

-- Submit a help request (Food, Water, Medicine, Shelter)
INSERT INTO help_requests (user_id, food, medicine, water, shelter, priority, status)
VALUES (1, TRUE, FALSE, TRUE, FALSE, 'High', 'Pending');


-- -----------------------------------------------------------------------------
-- 7. OFFLINE SYNC API (Section 8)
-- -----------------------------------------------------------------------------

-- Example batch sync query used by FastAPI when internet is restored
-- (Inserting queued offline records)
INSERT INTO sos_requests (user_id, latitude, longitude, battery_level, status, created_at)
VALUES (1, 28.6285, 77.3715, 40, 'Pending', '2026-08-08 20:00:00');
