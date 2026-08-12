-- =============================================================================
-- RESQNET DUMMY SEED DATA
-- =============================================================================


-- =============================================================================
-- 1. INSERT USERS
-- =============================================================================

INSERT INTO users
(name, email, password_hash, phone, blood_group, medical_conditions, address, city, district)
VALUES
(
    'Aarav Sharma',
    'aarav.sharma@gmail.com',
    'hashed_pass_123',
    '9876543210',
    'O+',
    'Asthma',
    'Block B, Sector 62',
    'Noida',
    'Gautam Buddha Nagar'
),
(
    'Priya Verma',
    'priya.verma@gmail.com',
    'hashed_pass_456',
    '9876543211',
    'B+',
    'None',
    'Raj Nagar, Sector 10',
    'Ghaziabad',
    'Ghaziabad'
),
(
    'Rohan Gupta',
    'rohan.gupta@gmail.com',
    'hashed_pass_789',
    '9876543212',
    'A-',
    'Diabetic',
    'Indirapuram, Abhay Khand',
    'Ghaziabad',
    'Ghaziabad'
);


-- =============================================================================
-- 2. INSERT EMERGENCY CONTACTS
-- =============================================================================

INSERT INTO emergency_contacts
(user_id, name, phone, relationship)
VALUES
(1, 'Suresh Sharma', '9811122233', 'Father'),
(1, 'Neha Sharma', '9811122234', 'Sister'),
(2, 'Vikas Verma', '9822233344', 'Spouse'),
(3, 'Anil Gupta', '9833344455', 'Brother');


-- =============================================================================
-- 3. INSERT DISASTER GUIDES
-- =============================================================================

INSERT INTO disaster_guides
(disaster_type, title, before_text, during_text, after_text)
VALUES
(
    'Flood',
    'Flood Safety Protocol',
    'Keep an emergency kit ready and move valuables to higher ground.',
    'Avoid walking through moving water. Move to upper floors if trapped.',
    'Do not drink floodwater. Wait for official clearance before returning home.'
),
(
    'Earthquake',
    'Earthquake Safety Protocol',
    'Secure heavy furniture to walls and know safe spots in each room.',
    'Drop, Cover, and Hold On. Stay away from glass windows and exterior walls.',
    'Expect aftershocks. Check yourself and others for injuries.'
);


-- =============================================================================
-- 4. INSERT PREPAREDNESS CHECKLIST
-- =============================================================================

INSERT INTO preparedness_checklist
(item_name, category, required)
VALUES
('1 Gallon of Water per Person', 'Essential Supplies', TRUE),
('3-Day Non-Perishable Food Supply', 'Essential Supplies', TRUE),
('First Aid Kit with Prescription Medicines', 'Medical', TRUE),
('Waterproof LED Flashlight & Batteries', 'Tools', TRUE),
('Portable Power Bank (Fully Charged)', 'Electronics', FALSE);


-- =============================================================================
-- 5. INSERT SHELTERS
-- =============================================================================

INSERT INTO shelters
(name, latitude, longitude, capacity, status, district)
VALUES
(
    'Community Center Shelter Hall 1',
    28.6280,
    77.3680,
    300,
    'Active',
    'Ghaziabad'
),
(
    'Government Inter College Safe Haven',
    28.6320,
    77.3810,
    500,
    'Active',
    'Ghaziabad'
),
(
    'District Sports Complex Relief Site',
    28.5550,
    77.3450,
    1000,
    'Full',
    'Gautam Buddha Nagar'
);


-- =============================================================================
-- 6. INSERT HOSPITALS
-- =============================================================================

INSERT INTO hospitals
(name, latitude, longitude, phone, beds_available)
VALUES
(
    'District Civil Hospital',
    28.6310,
    77.3750,
    '0120-2456789',
    24
),
(
    'Apex Trauma & Emergency Care',
    28.6250,
    77.3610,
    '0120-2987654',
    8
);


-- =============================================================================
-- 7. INSERT POLICE STATIONS
-- =============================================================================

INSERT INTO police_stations
(name, latitude, longitude, phone)
VALUES
(
    'Sector 62 Police Post',
    28.6290,
    77.3690,
    '0120-2111222'
),
(
    'Indirapuram Police Station',
    28.6350,
    77.3790,
    '0120-2333444'
);


-- =============================================================================
-- 8. INSERT FIRE STATIONS
-- =============================================================================

INSERT INTO fire_stations
(name, latitude, longitude, phone)
VALUES
(
    'Regional Fire Brigade Station #4',
    28.6270,
    77.3630,
    '101'
);


-- =============================================================================
-- 9. INSERT SOS REQUESTS
-- =============================================================================

INSERT INTO sos_requests
(user_id, latitude, longitude, battery_level, status)
VALUES
(1, 28.6285, 77.3715, 45, 'Pending'),
(2, 28.6325, 77.3805, 12, 'Assigned');


-- =============================================================================
-- 10. INSERT MISSING PERSONS
-- =============================================================================

INSERT INTO missing_persons
(
    reported_by,
    name,
    age,
    gender,
    photo,
    last_seen,
    latitude,
    longitude,
    status
)
VALUES
(
    1,
    'Kavita Sharma',
    68,
    'Female',
    'https://example.com/photos/kavita.jpg',
    'Near Sector 62 Park during flood evacuation',
    28.6282,
    77.3710,
    'Missing'
);


-- =============================================================================
-- 11. INSERT DAMAGE REPORTS
-- =============================================================================

INSERT INTO damage_reports
(
    user_id,
    type,
    description,
    photo,
    latitude,
    longitude,
    severity,
    status
)
VALUES
(
    2,
    'Submerged Roadway',
    'Main access road flooded under 3 feet of water, vehicles cannot pass.',
    'https://example.com/photos/road.jpg',
    28.6330,
    77.3820,
    'High',
    'Reported'
);


-- =============================================================================
-- 12. INSERT HELP REQUESTS
-- =============================================================================

INSERT INTO help_requests
(
    user_id,
    food,
    medicine,
    water,
    shelter,
    latitude,
    longitude,
    priority,
    status
)
VALUES
(
    3,
    TRUE,
    TRUE,
    TRUE,
    FALSE,
    28.6340,
    77.3780,
    'High',
    'Pending'
);


-- =============================================================================
-- 13. INSERT ALERTS
-- =============================================================================

INSERT INTO alerts
(
    title,
    description,
    severity,
    district,
    start_time,
    end_time
)
VALUES
(
    'Flash Flood Warning',
    'Heavy rainfall causing waterlogging in low-lying areas. Move to higher ground.',
    'High',
    'Ghaziabad',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP + INTERVAL '12 hours'
);
