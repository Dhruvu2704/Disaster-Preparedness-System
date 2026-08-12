-- =============================================================================
-- RESQNET DUMMY SEED DATA
-- PostgreSQL
-- Updated according to Database Team Guidelines
-- =============================================================================


-- =============================================================================
-- 1. USERS
-- =============================================================================

INSERT INTO users
(name, email, password_hash, phone, blood_group, medical_conditions, address, city, district)
VALUES
('Aarav Sharma', 'aarav.sharma@gmail.com', 'hashed_pass_123',
 '9876543210', 'O+', 'Asthma', 'Block B, Sector 62',
 'Noida', 'Gautam Buddha Nagar'),

('Priya Verma', 'priya.verma@gmail.com', 'hashed_pass_456',
 '9876543211', 'B+', 'None', 'Raj Nagar, Sector 10',
 'Ghaziabad', 'Ghaziabad'),

('Rohan Gupta', 'rohan.gupta@gmail.com', 'hashed_pass_789',
 '9876543212', 'A-', 'Diabetes', 'Indirapuram, Abhay Khand',
 'Ghaziabad', 'Ghaziabad'),

('Meera Singh', 'meera.singh@gmail.com', 'hashed_pass_101',
 '9876543213', 'AB+', 'None', 'Sector 15',
 'Noida', 'Gautam Buddha Nagar'),

('Kabir Malhotra', 'kabir.malhotra@gmail.com', 'hashed_pass_202',
 '9876543214', 'O-', 'Hypertension', 'Vaishali',
 'Ghaziabad', 'Ghaziabad');


-- =============================================================================
-- 2. EMERGENCY CONTACTS
-- =============================================================================

INSERT INTO emergency_contacts
(user_id, name, phone, relationship)
VALUES
(1, 'Suresh Sharma', '9811122233', 'Father'),
(1, 'Neha Sharma', '9811122234', 'Sister'),
(2, 'Vikas Verma', '9822233344', 'Spouse'),
(2, 'Ritu Verma', '9822233345', 'Sister'),
(3, 'Anil Gupta', '9833344455', 'Brother'),
(4, 'Raj Singh', '9844455566', 'Father'),
(5, 'Nisha Malhotra', '9855566677', 'Mother');


-- =============================================================================
-- 3. DISASTER GUIDES
-- Minimum required: 5
-- =============================================================================

INSERT INTO disaster_guides
(disaster_type, title, before_text, during_text, after_text)
VALUES

('Flood',
 'Flood Safety Protocol',
 'Keep an emergency kit ready and move valuables to higher ground.',
 'Avoid walking through moving water. Move to upper floors if trapped.',
 'Do not drink floodwater. Wait for official clearance before returning home.'),

('Earthquake',
 'Earthquake Safety Protocol',
 'Secure heavy furniture to walls and identify safe spots.',
 'Drop, Cover and Hold On. Stay away from glass windows.',
 'Expect aftershocks and check yourself and others for injuries.'),

('Cyclone',
 'Cyclone Safety Protocol',
 'Secure loose objects and keep emergency supplies ready.',
 'Stay indoors and away from windows during strong winds.',
 'Avoid damaged structures and follow official evacuation instructions.'),

('Fire',
 'Fire Safety Protocol',
 'Keep fire extinguishers accessible and check electrical connections.',
 'Raise the alarm, evacuate immediately and avoid using elevators.',
 'Do not re-enter the building until authorities declare it safe.'),

('Landslide',
 'Landslide Safety Protocol',
 'Avoid building near unstable slopes and monitor warnings.',
 'Move away from slopes and landslide-prone areas immediately.',
 'Stay away from affected areas until authorities provide clearance.');


-- =============================================================================
-- 4. PREPAREDNESS CHECKLIST
-- Minimum required: 10
-- =============================================================================

INSERT INTO preparedness_checklist
(item_name, category, required)
VALUES

('1 Gallon of Water per Person', 'Essential Supplies', TRUE),
('3-Day Non-Perishable Food Supply', 'Essential Supplies', TRUE),
('First Aid Kit', 'Medical', TRUE),
('Prescription Medicines', 'Medical', TRUE),
('Waterproof LED Flashlight', 'Tools', TRUE),
('Extra Batteries', 'Tools', TRUE),
('Portable Power Bank', 'Electronics', FALSE),
('Emergency Blanket', 'Safety', TRUE),
('Battery Powered Radio', 'Communication', FALSE),
('Important Documents Copy', 'Documents', TRUE);


-- =============================================================================
-- 5. SHELTERS
-- Minimum required: 5
-- =============================================================================

INSERT INTO shelters
(name, latitude, longitude, capacity, status, district)
VALUES

('Community Center Shelter Hall 1',
 28.6280, 77.3680, 300, 'Active', 'Ghaziabad'),

('Government Inter College Safe Haven',
 28.6320, 77.3810, 500, 'Active', 'Ghaziabad'),

('District Sports Complex Relief Site',
 28.5550, 77.3450, 1000, 'Full', 'Gautam Buddha Nagar'),

('Sector 15 Community Shelter',
 28.5810, 77.3160, 400, 'Active', 'Gautam Buddha Nagar'),

('Vaishali Emergency Shelter',
 28.6460, 77.3390, 350, 'Active', 'Ghaziabad');


-- =============================================================================
-- 6. HOSPITALS
-- Minimum required: 5
-- =============================================================================

INSERT INTO hospitals
(name, latitude, longitude, phone, beds_available)
VALUES

('District Civil Hospital',
 28.6310, 77.3750, '0120-2456789', 24),

('Apex Trauma & Emergency Care',
 28.6250, 77.3610, '0120-2987654', 8),

('City Emergency Hospital',
 28.5900, 77.3200, '0120-2567890', 15),

('Metro Disaster Care Hospital',
 28.6400, 77.3500, '0120-2678901', 30),

('Noida General Hospital',
 28.5700, 77.3300, '0120-2789012', 20);


-- =============================================================================
-- 7. POLICE STATIONS
-- Minimum required: 3
-- =============================================================================

INSERT INTO police_stations
(name, latitude, longitude, phone)
VALUES

('Sector 62 Police Post',
 28.6290, 77.3690, '0120-2111222'),

('Indirapuram Police Station',
 28.6350, 77.3790, '0120-2333444'),

('Ghaziabad Central Police Station',
 28.6700, 77.4200, '0120-2444555');


-- =============================================================================
-- 8. FIRE STATIONS
-- Minimum required: 3
-- =============================================================================

INSERT INTO fire_stations
(name, latitude, longitude, phone)
VALUES

('Regional Fire Brigade Station #4',
 28.6270, 77.3630, '101'),

('Ghaziabad Fire Station',
 28.6650, 77.4100, '101'),

('Noida Fire Station Sector 12',
 28.5950, 77.3350, '101');


-- =============================================================================
-- 9. SOS REQUESTS
-- Minimum required: 10
-- Different latitude/longitude values for heatmap generation
-- =============================================================================

INSERT INTO sos_requests
(user_id, latitude, longitude, battery_level, status, created_at)
VALUES

(1, 28.6285, 77.3715, 45, 'Pending', CURRENT_TIMESTAMP - INTERVAL '10 hours'),

(2, 28.6325, 77.3805, 12, 'Assigned', CURRENT_TIMESTAMP - INTERVAL '9 hours'),

(3, 28.6355, 77.3755, 65, 'Received', CURRENT_TIMESTAMP - INTERVAL '8 hours'),

(4, 28.6205, 77.3655, 72, 'Resolved', CURRENT_TIMESTAMP - INTERVAL '7 hours'),

(5, 28.6405, 77.3855, 31, 'Pending', CURRENT_TIMESTAMP - INTERVAL '6 hours'),

(1, 28.6155, 77.3555, 54, 'Received', CURRENT_TIMESTAMP - INTERVAL '5 hours'),

(2, 28.6505, 77.3955, 23, 'Assigned', CURRENT_TIMESTAMP - INTERVAL '4 hours'),

(3, 28.6055, 77.3455, 81, 'Pending', CURRENT_TIMESTAMP - INTERVAL '3 hours'),

(4, 28.6605, 77.4055, 18, 'Received', CURRENT_TIMESTAMP - INTERVAL '2 hours'),

(5, 28.5905, 77.3255, 90, 'Resolved', CURRENT_TIMESTAMP - INTERVAL '1 hour');


-- =============================================================================
-- 10. MISSING PERSONS
-- =============================================================================

INSERT INTO missing_persons
(reported_by, name, age, gender, photo, last_seen,
 latitude, longitude, status, created_at)
VALUES

(1, 'Kavita Sharma', 68, 'Female',
 'https://example.com/photos/kavita.jpg',
 'Near Sector 62 Park during flood evacuation',
 28.6282, 77.3710, 'Missing', CURRENT_TIMESTAMP),

(2, 'Rahul Verma', 17, 'Male',
 'https://example.com/photos/rahul.jpg',
 'Near Raj Nagar Market',
 28.6400, 77.3900, 'Missing', CURRENT_TIMESTAMP);


-- =============================================================================
-- 11. DAMAGE REPORTS
-- Minimum required: 10
-- Different latitude/longitude values for heatmap generation
-- =============================================================================

INSERT INTO damage_reports
(user_id, type, description, photo, latitude, longitude,
 severity, status, created_at)
VALUES

(2, 'Submerged Roadway',
 'Main access road flooded under 3 feet of water.',
 'https://example.com/photos/road1.jpg',
 28.6330, 77.3820, 'High', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '10 hours'),

(1, 'Fallen Tree',
 'Large tree blocking the main road.',
 'https://example.com/photos/tree1.jpg',
 28.6250, 77.3700, 'Medium', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '9 hours'),

(3, 'Building Damage',
 'Cracks observed on the exterior wall of a building.',
 'https://example.com/photos/building1.jpg',
 28.6400, 77.3850, 'High', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '8 hours'),

(4, 'Waterlogging',
 'Severe waterlogging reported near residential area.',
 'https://example.com/photos/water1.jpg',
 28.6150, 77.3600, 'Medium', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '7 hours'),

(5, 'Road Damage',
 'Road surface damaged due to heavy rainfall.',
 'https://example.com/photos/road2.jpg',
 28.6500, 77.4000, 'Medium', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '6 hours'),

(1, 'Electric Pole Damage',
 'Electric pole damaged near the main road.',
 'https://example.com/photos/pole1.jpg',
 28.6050, 77.3500, 'High', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '5 hours'),

(2, 'Flooded Underpass',
 'Underpass completely flooded and inaccessible.',
 'https://example.com/photos/underpass.jpg',
 28.6600, 77.4100, 'High', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '4 hours'),

(3, 'Roof Damage',
 'Roof partially damaged due to strong winds.',
 'https://example.com/photos/roof.jpg',
 28.5950, 77.3300, 'Medium', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '3 hours'),

(4, 'Blocked Drainage',
 'Drainage system blocked causing water accumulation.',
 'https://example.com/photos/drain.jpg',
 28.6450, 77.3900, 'Low', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '2 hours'),

(5, 'Bridge Damage',
 'Minor structural damage observed on bridge.',
 'https://example.com/photos/bridge.jpg',
 28.5750, 77.3150, 'High', 'Reported',
 CURRENT_TIMESTAMP - INTERVAL '1 hour');


-- =============================================================================
-- 12. HELP REQUESTS
-- =============================================================================

INSERT INTO help_requests
(user_id, food, medicine, water, shelter, priority, status, created_at)
VALUES

(3, TRUE, TRUE, TRUE, FALSE, 'High', 'Pending', CURRENT_TIMESTAMP),

(1, TRUE, FALSE, TRUE, TRUE, 'High', 'Pending', CURRENT_TIMESTAMP),

(2, FALSE, TRUE, TRUE, FALSE, 'Medium', 'Pending', CURRENT_TIMESTAMP);


-- =============================================================================
-- 13. ALERTS
-- Minimum required: 3
-- =============================================================================

INSERT INTO alerts
(title, description, severity, district, start_time, end_time, created_at)
VALUES

('Flash Flood Warning',
 'Heavy rainfall causing waterlogging in low-lying areas. Move to higher ground.',
 'High',
 'Ghaziabad',
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP + INTERVAL '12 hours',
 CURRENT_TIMESTAMP),

('Heavy Rainfall Alert',
 'Residents are advised to avoid unnecessary travel and monitor official updates.',
 'Medium',
 'Gautam Buddha Nagar',
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP + INTERVAL '10 hours',
 CURRENT_TIMESTAMP),

('Emergency Evacuation Alert',
 'Residents in flood-prone areas should move to designated shelters immediately.',
 'High',
 'Ghaziabad',
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP + INTERVAL '8 hours',
 CURRENT_TIMESTAMP);


-- =============================================================================
-- 14. HAZARD HOTSPOTS
-- Generated disaster-prone areas for ML heatmap
-- =============================================================================

INSERT INTO hazard_hotspots
(district, latitude, longitude, risk_score, risk_level, generated_at)
VALUES

('Ghaziabad', 28.6300, 77.3750, 92.5, 'High', CURRENT_TIMESTAMP),

('Ghaziabad', 28.6350, 77.3800, 88.0, 'High', CURRENT_TIMESTAMP),

('Ghaziabad', 28.6400, 77.3850, 84.5, 'High', CURRENT_TIMESTAMP),

('Ghaziabad', 28.6250, 77.3700, 76.0, 'Medium', CURRENT_TIMESTAMP),

('Ghaziabad', 28.6500, 77.3950, 81.5, 'High', CURRENT_TIMESTAMP),

('Gautam Buddha Nagar', 28.6050, 77.3500, 73.0, 'Medium', CURRENT_TIMESTAMP),

('Gautam Buddha Nagar', 28.5950, 77.3300, 67.5, 'Medium', CURRENT_TIMESTAMP),

('Gautam Buddha Nagar', 28.5750, 77.3150, 61.0, 'Medium', CURRENT_TIMESTAMP),

('Gautam Buddha Nagar', 28.6150, 77.3600, 79.0, 'High', CURRENT_TIMESTAMP),

('Ghaziabad', 28.6600, 77.4100, 70.0, 'Medium', CURRENT_TIMESTAMP);
