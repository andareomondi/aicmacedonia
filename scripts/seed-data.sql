-- Insert sample CED groups
INSERT INTO ced_groups (name, description, leader_name, leader_phone, leader_email, meeting_day, group_song, mission, vision, image_url) VALUES
('Battalion', 'Church scouts for boys - building character, leadership, and faith', 'Samuel Kioko', '+254 712 000 444', 'samuel.kioko@aicmacedonia.org', 'Sunday 1:00 PM', 'Onward Christian Soldiers', 'To raise godly young men with strong character and leadership skills', 'Disciplined boys who will become tomorrow''s church leaders', 'https://picsum.photos/400/300?random=70'),
('Cadet', 'Church scouts for girls - nurturing faith, grace, and leadership', 'Faith Wanjiku', '+254 712 000 555', 'faith.wanjiku@aicmacedonia.org', 'Sunday 1:00 PM', 'I Am a C-H-R-I-S-T-I-A-N', 'To nurture young ladies in faith, character, and Christian values', 'Godly young women who will impact their generation', 'https://picsum.photos/400/300?random=71'),
('Youth CED', 'For senior and junior teens - growing in faith together', 'David Mwangi', '+254 712 000 666', 'david.mwangi@aicmacedonia.org', 'Sunday 1:00 PM', 'Here I Am to Worship', 'To disciple youth in biblical truth and Christian living', 'Young people passionate about God and His kingdom', 'https://picsum.photos/400/300?random=72'),
('Ushirika wa Wake', 'Ladies communion - fellowship and spiritual growth for women', 'Margaret Nduta', '+254 712 000 777', 'margaret.nduta@aicmacedonia.org', 'Sunday 1:00 PM', 'Blessed Assurance', 'To empower women in faith, fellowship, and service', 'Women of God making a difference in families and community', 'https://picsum.photos/400/300?random=73'),
('Men Communion', 'Brotherhood in Christ - strengthening men in faith and purpose', 'John Mutiso', '+254 712 000 888', 'john.mutiso@aicmacedonia.org', 'Sunday 1:00 PM', 'Stand Up, Stand Up for Jesus', 'To build strong Christian men who lead by example', 'Men of integrity who honor God in all aspects of life', 'https://picsum.photos/400/300?random=74'),
('Praise & Worship', 'Leading the congregation in heartfelt worship and praise', 'Grace Muthoni', '+254 712 000 999', 'grace.muthoni@aicmacedonia.org', 'Sunday 1:00 PM', 'How Great Thou Art', 'To lead God''s people into His presence through worship', 'A worshipping community that experiences God''s glory', 'https://picsum.photos/400/300?random=75');

-- Insert sample choirs
INSERT INTO choirs (name, description, image_url, youtube_url, leader_name, leader_phone) VALUES
('Agape Choir', 'A vibrant blend of youth and elders ministering in song and worship.', 'https://picsum.photos/500/300?random=20', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Mary Wanjiru', '+254 712 001 111'),
('Youth Choir', 'Dynamic praise led by the church''s youth, inspiring all generations.', 'https://picsum.photos/500/300?random=21', 'https://www.youtube.com/embed/oHg5SJYRHA0', 'Peter Kamau', '+254 712 001 222'),
('Vision Choir', 'The pioneering choir of AIC Macedonia, preserving our heritage of worship.', 'https://picsum.photos/500/300?random=22', 'https://www.youtube.com/embed/EE-xtCF3T94', 'Sarah Njoki', '+254 712 001 333');

-- Insert sample sermons
INSERT INTO sermons (title, pastor, youtube_url, duration, category, date_preached) VALUES
('Walking in Faith', 'Pastor Justus Mutuku', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '45 min', 'Faith', '2024-01-14'),
('The Power of Prayer', 'Pastor Mary Mutuko', 'https://www.youtube.com/embed/oHg5SJYRHA0', '38 min', 'Prayer', '2024-01-07'),
('Youth and Purpose', 'Pastor Josiah Nicolahs', 'https://www.youtube.com/embed/EE-xtCF3T94', '42 min', 'Youth', '2023-12-31'),
('Love in Action', 'Pastor Justus Mutuku', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '50 min', 'Love', '2023-12-24'),
('Hope for Tomorrow', 'Pastor Mary Mutuko', 'https://www.youtube.com/embed/oHg5SJYRHA0', '35 min', 'Hope', '2023-12-17'),
('Building Character', 'Pastor Josiah Nicolahs', 'https://www.youtube.com/embed/EE-xtCF3T94', '40 min', 'Character', '2023-12-10');

-- Insert sample events
INSERT INTO events (title, description, event_date, start_time, end_time, location, category, image_url) VALUES
('Youth Fellowship', 'Interactive Bible study and fun activities for all youths.', '2024-01-27', '14:00', '17:00', 'Church Hall', 'Youth Fellowship', 'https://picsum.photos/400/300?random=100'),
('Praise & Worship Night', 'An evening of heartfelt praise and worship open to everyone.', '2024-02-02', '18:00', '21:00', 'Main Sanctuary', 'Worship', 'https://picsum.photos/400/300?random=101'),
('Community Outreach', 'Join us as we serve the community with donations and prayer.', '2024-02-10', '09:00', '15:00', 'Jamcity, Athiriver', 'Community Outreach', 'https://picsum.photos/400/300?random=102'),
('Women''s Conference', 'Annual women''s conference focusing on ''Women of Purpose''.', '2024-02-17', '08:00', '16:00', 'Main Sanctuary', 'Conference', 'https://picsum.photos/400/300?random=103'),
('Men''s Breakfast', 'Monthly men''s fellowship over breakfast.', '2024-02-24', '07:00', '10:00', 'Church Hall', 'Fellowship', 'https://picsum.photos/400/300?random=104'),
('Children''s Fun Day', 'A day of fun activities, games, and Bible stories for children.', '2024-03-02', '10:00', '16:00', 'Church Grounds', 'Children', 'https://picsum.photos/400/300?random=105');

-- Insert sample gallery images
INSERT INTO gallery (title, image_url, category, event_date, comment) VALUES
('Morning Worship', 'https://picsum.photos/400/300?random=80', 'Sunday Service', '2024-01-14', 'Beautiful Sunday morning service'),
('Youth Gathering', 'https://picsum.photos/400/300?random=81', 'Youth Fellowship', '2024-01-13', 'Youth fellowship meeting'),
('Water Baptism Ceremony', 'https://picsum.photos/400/300?random=82', 'Baptism', '2024-01-07', 'New believers baptism'),
('Feeding Program', 'https://picsum.photos/400/300?random=83', 'Community Outreach', '2024-01-06', 'Community feeding program'),
('Children''s Ministry', 'https://picsum.photos/400/300?random=84', 'CED Classes', '2023-12-31', 'CED classes for children'),
('Agape Choir Performance', 'https://picsum.photos/400/300?random=85', 'Choir Performance', '2023-12-24', 'Christmas choir performance');

-- Insert sample notifications
INSERT INTO notifications (title, message, type) VALUES
('New Sermon Available', 'Pastor Justus''s latest sermon on faith is now available', 'sermon'),
('Upcoming Event', 'Youth fellowship this Saturday at 2 PM', 'event'),
('Gallery Updated', 'New photos from last Sunday''s service have been added', 'gallery');
