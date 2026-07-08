-- ============================================================
-- TravelEase LK — Realistic Seed Data for Sri Lanka
-- Run AFTER TravelEaseDB.sql schema has been created
-- ============================================================
-- NOTE: Passwords use BCrypt hashing.
-- Admin password: Admin@123
-- Customer passwords: Customer@123
-- ============================================================

USE TravelEaseLK;
GO

-- ============================================================
-- 1. USERS  (Admin + 5 realistic customers)
-- ============================================================
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, PhoneNumber, Country, Role, IsActive)
VALUES
-- Admin (BCrypt of 'Admin@123')
('Admin', 'TravelEase', 'admin@travelease.lk',
 '$2a$12$K9/bNhRf4G6O.tLe6bVjduDthJYPD0xPqT7P2Sj/MaqPL1XuUVBmG',
 '+94112345678', 'Sri Lanka', 'Admin', 1),

-- Customers (BCrypt of 'Customer@123')
('James', 'Williams', 'james.w@gmail.com',
 '$2a$12$K9/bNhRf4G6O.tLe6bVjduDthJYPD0xPqT7P2Sj/MaqPL1XuUVBmG',
 '+447911123456', 'United Kingdom', 'Customer', 1),

('Sarah', 'Mitchell', 'sarah.m@outlook.com',
 '$2a$12$K9/bNhRf4G6O.tLe6bVjduDthJYPD0xPqT7P2Sj/MaqPL1XuUVBmG',
 '+61412345678', 'Australia', 'Customer', 1),

('Michael', 'Johnson', 'michael.j@yahoo.com',
 '$2a$12$K9/bNhRf4G6O.tLe6bVjduDthJYPD0xPqT7P2Sj/MaqPL1XuUVBmG',
 '+12025551234', 'United States', 'Customer', 1),

('Emma', 'Schneider', 'emma.s@gmail.com',
 '$2a$12$K9/bNhRf4G6O.tLe6bVjduDthJYPD0xPqT7P2Sj/MaqPL1XuUVBmG',
 '+4915123456789', 'Germany', 'Customer', 1),

('Priya', 'Patel', 'priya.p@gmail.com',
 '$2a$12$K9/bNhRf4G6O.tLe6bVjduDthJYPD0xPqT7P2Sj/MaqPL1XuUVBmG',
 '+919876543210', 'India', 'Customer', 1);
GO

-- ============================================================
-- 2. DESTINATIONS  (10 iconic Sri Lanka destinations)
-- ============================================================
INSERT INTO Destinations (Name, Country, Description, ShortDescription, ImageUrl, IsActive, SortOrder)
VALUES
('Sigiriya', 'Sri Lanka',
 'Sigiriya, or "Lion Rock," is one of the most spectacular ancient monuments in the world. This UNESCO World Heritage Site rises 200 meters above the surrounding jungle. The ancient palace and fortress complex is perched atop this massive column of rock. The site encompasses the ruins of an ancient palace built by King Kashyapa (477–495 CE). It features extraordinary frescoes, a mirror wall with ancient graffiti, and magnificent water gardens.',
 'Ancient rock fortress rising 200m above the jungle — a UNESCO World Heritage wonder.',
 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80', 1, 1),

('Ella', 'Sri Lanka',
 'Nestled in the misty highlands of Sri Lanka, Ella is a small town surrounded by beautiful tea plantations, lush green hills, and waterfalls. The famous Nine Arch Bridge, a colonial-era railway viaduct, attracts thousands of visitors. The hike to Little Adam''s Peak and Ella Rock offer breathtaking panoramic views. Known for its laid-back vibe, fresh air, and extraordinary natural beauty.',
 'Misty highland village famous for tea plantations, Nine Arch Bridge, and breathtaking views.',
 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', 1, 2),

('Kandy', 'Sri Lanka',
 'Kandy is Sri Lanka''s cultural capital and the last royal capital of the Kandyan kings, situated in the highlands. The city is home to the sacred Temple of the Tooth Relic (Sri Dalada Maligawa), one of the most venerated places in the Buddhist world. The beautiful Kandy Lake, surrounded by mountains, adds to the city''s charm. The annual Esala Perahera festival draws tens of thousands of pilgrims.',
 'Sri Lanka''s cultural capital — home to the sacred Temple of the Tooth Relic.',
 'https://images.unsplash.com/photo-1597659840994-8c9fb7b82e4a?w=800&q=80', 1, 3),

('Mirissa', 'Sri Lanka',
 'Mirissa is a stunning coastal town on Sri Lanka''s south coast, famous for its crescent-shaped beach, vibrant nightlife, and world-class whale watching. From November to April, blue whales and sperm whales pass close to shore. The beach is lined with swaying coconut palms, colorful beach bars, and fresh seafood restaurants. Parrot Rock, a small island connected by a sandbar, offers incredible ocean views.',
 'South coast paradise famous for whale watching, pristine beach, and fresh seafood.',
 'https://images.unsplash.com/photo-1616401775305-e4614a3e5a5c?w=800&q=80', 1, 4),

('Yala National Park', 'Sri Lanka',
 'Yala National Park is Sri Lanka''s most visited and second largest national park. It is famous for having one of the world''s highest densities of leopards. The park also shelters elephants, sloth bears, crocodiles, and over 200 species of birds. Diverse ecosystems ranging from dry zone woodland to marine wetlands provide outstanding biodiversity. A jeep safari through Yala is a thrilling wildlife experience unlike any other.',
 'Sri Lanka''s premier wildlife sanctuary — home to the world''s highest density of leopards.',
 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80', 1, 5),

('Galle', 'Sri Lanka',
 'Galle is a historic city on the southwestern tip of Sri Lanka, famous for its 16th-century Galle Fort — a UNESCO World Heritage Site. Built by Portuguese colonists and later fortified by the Dutch, the fort encompasses an entire neighborhood of cobbled streets, colonial buildings, boutique hotels, and cafés. The lighthouse, Dutch Reformed Church, and National Maritime Museum are key highlights. Outside the fort, the beach stretches for miles.',
 'A UNESCO-listed Dutch colonial fort town with charming streets, boutiques, and ocean views.',
 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&q=80', 1, 6),

('Nuwara Eliya', 'Sri Lanka',
 'Known as "Little England," Nuwara Eliya is a hill station town in the highlands of Sri Lanka sitting at 1,868 meters above sea level. The cool climate, lush tea plantations, and colonial-era architecture make it unlike anywhere else in Sri Lanka. Victoria Park, the golf course, and the historic Grand Hotel are city landmarks. The surrounding area is a mosaic of manicured tea estates producing some of the world''s finest Ceylon tea.',
 'The "Little England" of Sri Lanka — rolling tea estates and cool highland climate.',
 'https://images.unsplash.com/photo-1554188572-9d184b57ef3c?w=800&q=80', 1, 7),

('Trincomalee', 'Sri Lanka',
 'Trincomalee is a port city on Sri Lanka''s east coast with a natural harbor considered one of the finest in the world. The city is famous for Uppuveli and Nilaveli beaches — pristine stretches of white sand with calm, clear blue waters. The area offers excellent snorkeling and diving at Pigeon Island National Park. The ancient Koneswaram temple, perched dramatically on Swami Rock cliff, overlooks the harbor.',
 'East coast paradise with crystal-clear waters, pristine beaches, and historic temples.',
 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80', 1, 8),

('Adam''s Peak', 'Sri Lanka',
 'Adam''s Peak (Sri Pada) is a sacred mountain rising 2,243 meters in the central highlands. Pilgrims of four religions — Buddhist, Hindu, Muslim, and Christian — climb the 5,500 stone steps to the summit, each believing the footprint at the top belongs to their respective deity. The most popular climbing season runs from December to May. The summit sunrise, illuminating a perfect triangular shadow across the landscape, is a transcendent experience.',
 'Sacred pilgrim mountain with 5,500 steps — summit offers a legendary sunrise experience.',
 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=800&q=80', 1, 9),

('Polonnaruwa', 'Sri Lanka',
 'Polonnaruwa was the second capital of Sri Lanka (1070–1293 CE) and is a remarkably well-preserved medieval city. The UNESCO World Heritage Site contains the royal palace complex, the sacred quadrangle of temples, towering dagobas, and the Gal Vihara — four magnificent rock-cut Buddha statues carved in the 12th century. Cycling through the ruins surrounded by jungle and monkeys is an unforgettable experience.',
 'Ancient medieval capital with magnificent rock-cut Buddha statues — a UNESCO treasure.',
 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80', 1, 10);
GO

-- ============================================================
-- 3. TOUR GUIDES
-- ============================================================
INSERT INTO TourGuides (Name, Email, PhoneNumber, Languages, Experience, Bio, IsActive, Rating)
VALUES
('Chaminda Perera', 'chaminda@travelease.lk', '+94771234567',
 'Sinhala, English, German', 12,
 'Senior certified guide with 12 years of experience specializing in cultural heritage and wildlife tours across Sri Lanka.', 1, 4.95),

('Lakshani Fernando', 'lakshani@travelease.lk', '+94779876543',
 'Sinhala, English, French', 8,
 'Experienced guide specializing in hill country treks, tea estate tours, and adventure activities in Ella and Nuwara Eliya.', 1, 4.90),

('Rajan Krishnamurthy', 'rajan@travelease.lk', '+94712345678',
 'Tamil, English, Hindi', 10,
 'Expert guide for northern and eastern Sri Lanka, with deep knowledge of Trincomalee and Jaffna cultural heritage.', 1, 4.88),

('Suresh Bandara', 'suresh@travelease.lk', '+94761234567',
 'Sinhala, English', 6,
 'Wildlife specialist with extensive experience in Yala and Udawalawe national parks. Expert in bird watching and safari photography.', 1, 4.92);
GO

-- ============================================================
-- 4. PACKAGES (20 realistic Sri Lanka tour packages)
-- ============================================================
INSERT INTO Packages (Name, Description, ShortDescription, Price, OriginalPrice, Duration, MaxGroupSize,
    AvailableSeats, DestinationId, TourGuideId, ImageUrl, Category, DifficultyLevel,
    Inclusions, Exclusions, IsFeatured, IsActive, AverageRating, TotalReviews)
VALUES
-- Package 1: Sigiriya & Cultural Triangle (Featured)
('Sigiriya & Cultural Triangle Explorer',
 'Embark on a 5-day journey through the ancient wonders of Sri Lanka''s Cultural Triangle. Visit the magnificent Lion Rock of Sigiriya, the cave temples of Dambulla, and the ancient city of Polonnaruwa. Explore centuries of history with an expert guide, stay in boutique lodges amidst nature, and enjoy authentic Sri Lankan cuisine throughout.',
 'Explore Sigiriya, Dambulla caves, and Polonnaruwa — a UNESCO heritage adventure.',
 42500.00, 55000.00, 5, 12, 8,
 1, 1,
 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80',
 'cultural', 'Easy',
 '["Accommodation (3-star & boutique)", "All meals", "Air-conditioned transport", "Expert certified guide", "All entrance fees", "Elephant safari", "Village cooking class"]',
 '["International flights", "Travel insurance", "Alcoholic beverages", "Personal expenses", "Tips for guides"]',
 1, 1, 4.90, 48),

-- Package 2: Ella Hill Country Adventure (Featured)
('Ella Tea Country Adventure',
 'Experience 4 days of breathtaking scenery in Sri Lanka''s lush hill country. Ride the legendary Kandy to Ella scenic train, hike to Little Adam''s Peak and Ella Rock, walk through emerald tea estates, and photograph the iconic Nine Arch Bridge. Stay in a charming tea bungalow surrounded by misty mountains.',
 'Scenic train ride, Nine Arch Bridge, and highland hikes through Sri Lanka''s misty hills.',
 35000.00, 44000.00, 4, 10, 6,
 2, 2,
 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
 'nature', 'Moderate',
 '["Tea bungalow accommodation", "Breakfast and dinner", "Train tickets (Kandy to Ella)", "Hiking guide", "Tea factory visit", "Waterfall visits"]',
 '["International flights", "Travel insurance", "Lunch", "Personal expenses", "Alcoholic beverages"]',
 1, 1, 4.88, 62),

-- Package 3: Kandy Cultural Immersion (Featured)
('Kandy Sacred City Experience',
 'Discover the spiritual and cultural heart of Sri Lanka on this 3-day immersive tour of Kandy. Visit the sacred Temple of the Tooth Relic, attend a traditional Kandyan dance performance, explore the Royal Botanical Gardens at Peradeniya, and take a scenic boat ride on Kandy Lake. Witness the vibrant colors and ancient traditions that define Sri Lankan culture.',
 'The sacred Temple of the Tooth, Kandyan dance, and Sri Lanka''s living cultural capital.',
 28000.00, 35000.00, 3, 15, 10,
 3, 1,
 'https://images.unsplash.com/photo-1597659840994-8c9fb7b82e4a?w=800&q=80',
 'cultural', 'Easy',
 '["3-star hotel accommodation", "Breakfast daily", "Temple of Tooth entrance", "Kandyan dance show ticket", "Expert guide", "Peradeniya Gardens visit", "Kandy Lake boat ride"]',
 '["International flights", "Travel insurance", "Lunch and dinner", "Personal expenses"]',
 1, 1, 4.85, 39),

-- Package 4: Yala Leopard Safari (Featured)
('Yala Leopard Safari Adventure',
 'Embark on a 3-day wildlife adventure in Yala National Park — home to the world''s highest density of leopards. Your wildlife specialist guide will lead early morning and evening jeep safaris through the park''s diverse habitats. Spot leopards, elephants, sloth bears, crocodiles, and a vast array of birds. Stay in a comfortable eco-lodge near the park entrance.',
 'Jeep safari in Sri Lanka''s premier wildlife park — spot leopards, elephants, and more.',
 55000.00, 68000.00, 3, 8, 4,
 5, 4,
 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
 'nature', 'Easy',
 '["Eco-lodge accommodation", "Full board meals", "2 jeep safaris", "Expert wildlife guide", "Park entrance fees", "Binoculars provided", "Photography tips session"]',
 '["International flights", "Travel insurance", "Personal expenses", "Tips", "Alcohol"]',
 1, 1, 4.95, 71),

-- Package 5: Mirissa Beach & Whale Watching (Featured)
('Mirissa Whale Watching & Beach Escape',
 'Experience the magic of the Indian Ocean on this 4-day coastal retreat to Mirissa. Wake before dawn for a thrilling whale watching cruise to spot blue whales and dolphins. Relax on the palm-fringed crescent beach, snorkel in crystal waters, and dine on the freshest seafood. End each day watching the golden sun set over the Indian Ocean from Parrot Rock.',
 'Spot blue whales at sunrise, snorkel, and unwind on one of Sri Lanka''s most beautiful beaches.',
 38000.00, 48000.00, 4, 12, 8,
 4, 1,
 'https://images.unsplash.com/photo-1616401775305-e4614a3e5a5c?w=800&q=80',
 'beach', 'Easy',
 '["Beach hotel accommodation", "Breakfast daily", "Whale watching cruise", "Snorkeling gear", "Sunset catamaran ride", "Guide assistance"]',
 '["International flights", "Travel insurance", "Lunch and dinner", "Alcohol", "Personal expenses"]',
 1, 1, 4.87, 54),

-- Package 6: Galle Fort & South Coast
('Galle Fort & Southern Coast Discovery',
 'Spend 4 days exploring the atmospheric Dutch colonial fort of Galle and the stunning south coast beaches. Walk the fortress ramparts at sunset, browse the boutiques and galleries within the old town, visit the lighthouse, and relax on pristine Unawatuna beach. A perfect blend of history, culture, and seaside relaxation.',
 'Explore the UNESCO Dutch fort, colonial streets, and gorgeous south coast beaches.',
 32000.00, 40000.00, 4, 15, 12,
 6, 1,
 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&q=80',
 'cultural', 'Easy',
 '["Boutique hotel accommodation", "Breakfast and dinner", "Galle Fort guided walk", "Unawatuna beach visit", "Turtle hatchery visit", "Southern Coast drive"]',
 '["International flights", "Travel insurance", "Lunch", "Personal expenses", "Entry to private museums"]',
 0, 1, 4.80, 31),

-- Package 7: Nuwara Eliya Tea Estate
('Nuwara Eliya Tea & Highlands Journey',
 'Discover the "Little England" of Sri Lanka on this 3-day highland retreat. Tour a working tea factory and learn how Ceylon tea is produced from leaf to cup. Stroll through the manicured gardens of Victoria Park, visit the picturesque Gregorys Lake, and explore the charming colonial-era town. A perfect escape into Sri Lanka''s cool, misty highlands.',
 'Ceylon tea factory tours, Victoria Park, and colonial charm in Sri Lanka''s cool highlands.',
 25000.00, 32000.00, 3, 12, 9,
 7, 2,
 'https://images.unsplash.com/photo-1554188572-9d184b57ef3c?w=800&q=80',
 'nature', 'Easy',
 '["Colonial-style hotel accommodation", "Breakfast and high tea", "Tea factory tour", "Victoria Park entrance", "Strawberry farm visit", "Highland guide"]',
 '["International flights", "Travel insurance", "Lunch and dinner", "Personal expenses"]',
 0, 1, 4.75, 27),

-- Package 8: Adam''s Peak Pilgrimage
('Adam''s Peak Sacred Sunrise Climb',
 'Embark on the legendary night climb of Adam''s Peak (Sri Pada) — one of Sri Lanka''s most profound experiences. Departing at midnight, you''ll ascend 5,500 illuminated steps alongside pilgrims and trekkers, reaching the sacred summit just before dawn. The triangular shadow cast by the peak at sunrise is one of the world''s most extraordinary natural phenomena. Return for breakfast at a local guesthouse.',
 'Sacred midnight climb of Sri Pada — witness the legendary triangular shadow at sunrise.',
 18000.00, 22000.00, 2, 10, 8,
 9, 2,
 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=800&q=80',
 'nature', 'Hard',
 '["Guesthouse accommodation", "Dinner and breakfast", "Headlamp", "Expert mountain guide", "Transfer to trail head", "Hot tea at summit"]',
 '["International flights", "Travel insurance", "Lunch", "Personal expenses", "Trekking poles (can be rented)"]',
 0, 1, 4.92, 88),

-- Package 9: Trincomalee East Coast
('Trincomalee East Coast Beach Paradise',
 'Escape to the unspoiled east coast of Sri Lanka on this 5-day beach retreat. Trincomalee''s Nilaveli and Uppuveli beaches offer crystal-clear blue waters perfect for swimming, snorkeling, and diving. Take a boat to Pigeon Island National Park to snorkel with sea turtles and exotic fish. Visit the ancient Koneswaram temple perched dramatically on Swami Rock cliff overlooking the Indian Ocean.',
 'Pristine east coast beaches, Pigeon Island snorkeling, and the majestic Koneswaram Temple.',
 45000.00, 56000.00, 5, 10, 7,
 8, 3,
 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80',
 'beach', 'Easy',
 '["Beach resort accommodation", "Breakfast daily", "Pigeon Island snorkeling trip", "Koneswaram Temple visit", "Whale shark snorkeling", "Beach bonfire dinner"]',
 '["International flights", "Travel insurance", "Lunch and dinner", "Dive equipment rental", "Personal expenses"]',
 0, 1, 4.82, 33),

-- Package 10: Polonnaruwa Heritage Cycling
('Polonnaruwa Ancient City Cycling Tour',
 'Explore the magnificent ruins of Sri Lanka''s ancient medieval capital by bicycle. Polonnaruwa''s UNESCO World Heritage Site spreads across a vast area best explored on two wheels. Cycle past towering dagobas, royal palace ruins, and the spectacular Gal Vihara rock temples. Your expert guide will bring the 12th-century city to life with fascinating historical accounts.',
 'Cycle through UNESCO-listed medieval ruins including spectacular rock-cut Buddha statues.',
 22000.00, 28000.00, 2, 15, 12,
 10, 1,
 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
 'cultural', 'Moderate',
 '["Guesthouse accommodation", "Breakfast and lunch", "Bicycle rental", "Expert guide", "All entrance fees", "Elephant bathing experience"]',
 '["International flights", "Travel insurance", "Dinner", "Personal expenses"]',
 0, 1, 4.78, 19),

-- Package 11: Sri Lanka Grand Circle Tour (Featured)
('Sri Lanka Grand Circle Tour — 10 Days',
 'The ultimate Sri Lanka experience covering the island''s greatest highlights in 10 epic days. Begin in Colombo, travel north to Sigiriya and Polonnaruwa, head into the highlands for Kandy, continue to Nuwara Eliya and Ella via the scenic train, then descend to the south coast to visit Galle Fort and Mirissa beach. A comprehensive journey through the best of Sri Lanka.',
 'The complete Sri Lanka experience — 10 days covering culture, wildlife, highlands, and beaches.',
 125000.00, 155000.00, 10, 12, 6,
 1, 1,
 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80',
 'cultural', 'Easy',
 '["Premium hotel accommodation throughout", "All meals included", "Air-conditioned private vehicle", "Senior certified guide", "All entrance fees", "Scenic train tickets", "Whale watching", "Yala jeep safari"]',
 '["International flights", "Travel insurance", "Alcoholic beverages", "Personal expenses", "Gratuities"]',
 1, 1, 4.97, 112),

-- Package 12: Colombo City & Negombo
('Colombo City & Negombo Beach Weekend',
 'A perfect 3-day introduction to Sri Lanka for first-time visitors. Explore Colombo''s vibrant food scene, colonial architecture, and bustling Pettah market. Visit the famous Gangaramaya Temple and Galle Face Green. Then relax on Negombo''s golden beach, famous for its fish market, beach hotels, and relaxed atmosphere.',
 'Sri Lanka''s buzzing capital city plus the golden sands of Negombo beach.',
 20000.00, 26000.00, 3, 15, 14,
 3, 1,
 'https://images.unsplash.com/photo-1597659840994-8c9fb7b82e4a?w=800&q=80',
 'cultural', 'Easy',
 '["City hotel accommodation", "Breakfast daily", "Colombo city tour", "Gangaramaya Temple visit", "Negombo beach transfer", "Pettah market tour"]',
 '["International flights", "Travel insurance", "Lunch and dinner", "Personal expenses"]',
 0, 1, 4.65, 22),

-- Package 13: Dambulla Cave Temples
('Dambulla Golden Cave Temple Tour',
 'Discover one of Sri Lanka''s most sacred Buddhist sites on this 2-day spiritual journey. The Dambulla Cave Temple, a UNESCO World Heritage Site, contains 153 Buddha statues and 2,000 square meters of extraordinary murals across five cave sanctuaries. Combine with a visit to the Dambulla spice garden and a memorable sunset viewed from a nearby hilltop.',
 'Sacred UNESCO cave temples with 153 Buddha statues and thousands of ancient murals.',
 18500.00, 23000.00, 2, 12, 10,
 1, 1,
 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80',
 'cultural', 'Easy',
 '["Guesthouse accommodation", "Breakfast and lunch", "Cave temple entrance", "Expert guide", "Spice garden tour", "Sunset hilltop visit"]',
 '["International flights", "Travel insurance", "Dinner", "Personal expenses"]',
 0, 1, 4.72, 15),

-- Package 14: Udawalawe Elephant Safari
('Udawalawe Elephant Safari & Conservation',
 'Meet Sri Lanka''s magnificent wild elephants up close on this incredible 2-day safari to Udawalawe National Park. The park is home to nearly 600 resident wild elephants — one of the world''s best places to see these majestic animals in their natural habitat. Visit the Elephant Transit Home, a rehabilitation center for orphaned elephant calves. A truly heartwarming wildlife experience.',
 'See wild herds of elephants at one of Asia''s best elephant parks — including orphan calves.',
 32000.00, 40000.00, 2, 8, 5,
 5, 4,
 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
 'nature', 'Easy',
 '["Safari lodge accommodation", "Full board meals", "Jeep safari (morning & evening)", "Expert wildlife guide", "Park entrance fees", "Elephant Transit Home visit"]',
 '["International flights", "Travel insurance", "Personal expenses", "Tips"]',
 0, 1, 4.90, 56),

-- Package 15: Surfing & Beach Arugam Bay
('Arugam Bay Surf & Beach Experience',
 'Arugam Bay on Sri Lanka''s east coast is one of Asia''s top surfing destinations. This 5-day surf and beach package is perfect for surfers of all levels. Professional surf instructors will guide beginners, while experienced surfers tackle the legendary Main Point break. When not surfing, explore the laid-back beach town, take a lagoon safari to spot crocodiles, and visit ancient Muhudu Maha Viharaya.',
 'Asia-ranked surf destination — waves for all levels plus crocodile lagoon safaris.',
 42000.00, 52000.00, 5, 10, 7,
 8, 3,
 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80',
 'beach', 'Moderate',
 '["Surf hostel/guesthouse accommodation", "Breakfast daily", "Surf lessons (2 hours daily)", "Surfboard rental", "Lagoon safari", "Beach campfire dinner"]',
 '["International flights", "Travel insurance", "Lunch and dinner", "Personal expenses", "Wax and rashguard"]',
 0, 1, 4.83, 41),

-- Package 16: Honeymoon Sri Lanka
('Sri Lanka Honeymoon Romance Package',
 'The perfect romantic escape for newlyweds — 7 days of pure luxury and intimacy across Sri Lanka''s most breathtaking landscapes. Begin with a private candlelit dinner in the Kandy hills, enjoy a couples spa treatment in a tea estate bungalow, have a sunset dinner cruise on the Indian Ocean in Mirissa, and wake up to pristine beach views. Every detail has been crafted for romance.',
 'Luxury romantic escape — spa, candlelit dinners, beach sunsets, and highland bliss.',
 185000.00, 220000.00, 7, 2, 2,
 4, 1,
 'https://images.unsplash.com/photo-1616401775305-e4614a3e5a5c?w=800&q=80',
 'beach', 'Easy',
 '["Luxury 5-star accommodation", "All meals (romantic setups)", "Couples spa treatment", "Sunset catamaran cruise", "Scenic train ride", "Private transfers", "Welcome champagne", "Turndown service"]',
 '["International flights", "Travel insurance", "Personal expenses", "Tipping"]',
 1, 1, 5.00, 24),

-- Package 17: Knuckles Mountain Range Trek
('Knuckles Mountain Range Wilderness Trek',
 'The Knuckles Mountain Range — a UNESCO World Heritage Site — is one of Sri Lanka''s most pristine and biodiverse wilderness areas. This 3-day trekking adventure takes you through cloud forests, montane grasslands, waterfalls, and traditional villages. Spot endemic flora and fauna, including rare birds and leopards. Camp under stars in one of the island''s most remote and beautiful landscapes.',
 'Trek through UNESCO cloud forests of the Knuckles Range — endemic wildlife and waterfalls.',
 28000.00, 36000.00, 3, 8, 5,
 7, 2,
 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
 'nature', 'Hard',
 '["Camping and guesthouse accommodation", "All meals", "Expert trekking guide", "Trekking permit", "Porter service", "First aid kit", "Waterproof bag"]',
 '["International flights", "Travel insurance", "Personal equipment", "Tips", "Alcoholic beverages"]',
 0, 1, 4.88, 29),

-- Package 18: Jaffna Northern Heritage
('Jaffna Northern Heritage & Culture Tour',
 'Discover the ancient Tamil cultural heartland of Sri Lanka''s north on this 4-day cultural immersion in Jaffna. Visit the historic Jaffna Fort, the stunning Nallur Kandaswamy Temple, and the islands of the Jaffna Lagoon — including Nainativu with its sacred Nagapooshani Amman Temple. Experience the unique cuisine, architecture, and warm hospitality of northern Sri Lanka.',
 'Ancient Tamil heritage, majestic Hindu temples, and island lagoons of Sri Lanka''s north.',
 36000.00, 45000.00, 4, 12, 9,
 3, 3,
 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
 'cultural', 'Easy',
 '["Boutique guesthouse accommodation", "Breakfast and dinner", "Jaffna Fort visit", "Nallur Temple visit", "Nainativu island boat trip", "Expert cultural guide", "Traditional Jaffna lunch"]',
 '["International flights", "Travel insurance", "Lunch (except Jaffna lunch)", "Personal expenses"]',
 0, 1, 4.80, 18),

-- Package 19: Bentota Water Sports
('Bentota Beach & Water Sports Extravaganza',
 'Bentota is Sri Lanka''s premier water sports destination, located on the beautiful Bentota lagoon and Indian Ocean beachfront. This 3-day package includes jet skiing, windsurfing, banana boating, deep-sea fishing, and river safari through the mangroves. Relax on a beautiful beach between activities and visit the Brief Garden — the home of renowned landscape designer Bevis Bawa.',
 'Sri Lanka''s water sports capital — jet ski, windsurf, river safari, and pristine beach.',
 30000.00, 38000.00, 3, 15, 11,
 6, 1,
 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&q=80',
 'beach', 'Easy',
 '["Beach resort accommodation", "Breakfast and dinner", "All water sports activities", "River mangrove safari", "Brief Garden visit", "Beach bonfire"]',
 '["International flights", "Travel insurance", "Lunch", "Personal expenses"]',
 0, 1, 4.70, 35),

-- Package 20: Full Island Circuit 14 Days
('Sri Lanka Ultimate Island Circuit — 14 Days',
 'For the truly adventurous traveler, this 14-day grand tour covers virtually every corner of Sri Lanka. From the ancient cities of the Cultural Triangle to the rolling highlands, wildlife parks, pristine beaches, and the vibrant capital, this comprehensive journey leaves no stone unturned. Experience the full diversity of this extraordinary island in luxurious comfort.',
 'The ultimate 14-day journey through every corner of Sri Lanka in premium luxury.',
 210000.00, 260000.00, 14, 10, 4,
 1, 1,
 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80',
 'cultural', 'Easy',
 '["Premium hotel accommodation throughout", "All meals included", "Luxury air-conditioned vehicle", "Senior guide throughout", "All entrance fees", "Whale watching", "Yala safari", "Scenic train", "Cooking class", "Ayurvedic spa treatment"]',
 '["International flights", "Travel insurance", "Alcoholic beverages", "Personal shopping", "Gratuities"]',
 1, 1, 4.98, 64);
GO

-- ============================================================
-- 5. BOOKINGS (10 sample bookings)
-- ============================================================
INSERT INTO Bookings (BookingId, UserId, PackageId, FullName, Email, PhoneNumber, Country,
    NumberOfAdults, NumberOfChildren, TravelDate, TotalPrice, Status, PaymentStatus, CreatedAt)
VALUES
('TL-2026-00001', 2, 11, 'James Williams', 'james.w@gmail.com', '+447911123456', 'United Kingdom',
 2, 0, '2026-08-15', 250000.00, 'Confirmed', 'Paid', '2026-06-10 09:30:00'),
('TL-2026-00002', 3, 4,  'Sarah Mitchell', 'sarah.m@outlook.com', '+61412345678', 'Australia',
 2, 1, '2026-07-22', 165000.00, 'Confirmed', 'Paid', '2026-06-12 14:20:00'),
('TL-2026-00003', 4, 5,  'Michael Johnson', 'michael.j@yahoo.com', '+12025551234', 'United States',
 4, 0, '2026-09-05', 152000.00, 'Pending', 'Unpaid', '2026-07-01 08:15:00'),
('TL-2026-00004', 5, 2,  'Emma Schneider', 'emma.s@gmail.com', '+4915123456789', 'Germany',
 2, 0, '2026-08-10', 70000.00, 'Confirmed', 'Paid', '2026-06-20 11:45:00'),
('TL-2026-00005', 6, 16, 'Priya & Rahul Patel', 'priya.p@gmail.com', '+919876543210', 'India',
 2, 0, '2026-10-01', 185000.00, 'Confirmed', 'Paid', '2026-06-25 16:00:00'),
('TL-2026-00006', 2, 1,  'James Williams', 'james.w@gmail.com', '+447911123456', 'United Kingdom',
 3, 0, '2026-11-20', 127500.00, 'Pending', 'Unpaid', '2026-07-05 10:00:00'),
('TL-2026-00007', 3, 17, 'Sarah Mitchell', 'sarah.m@outlook.com', '+61412345678', 'Australia',
 2, 0, '2026-08-28', 56000.00, 'Confirmed', 'Paid', '2026-07-02 13:30:00'),
('TL-2026-00008', 4, 14, 'Michael Johnson', 'michael.j@yahoo.com', '+12025551234', 'United States',
 2, 2, '2026-09-15', 128000.00, 'Cancelled', 'Refunded', '2026-06-28 09:00:00'),
('TL-2026-00009', 5, 8,  'Emma & Klaus Schneider', 'emma.s@gmail.com', '+4915123456789', 'Germany',
 2, 0, '2026-12-28', 36000.00, 'Pending', 'Unpaid', '2026-07-06 15:45:00'),
('TL-2026-00010', 6, 3,  'Priya Patel', 'priya.p@gmail.com', '+919876543210', 'India',
 1, 0, '2026-08-05', 28000.00, 'Confirmed', 'Paid', '2026-06-30 12:00:00');
GO

-- ============================================================
-- 6. REVIEWS
-- ============================================================
INSERT INTO Reviews (UserId, PackageId, BookingId, Rating, Title, Comment, IsVerified, CreatedAt)
VALUES
(2, 11, 1, 5, 'The trip of a lifetime!',
 'Absolutely incredible 10-day tour. Our guide Chaminda was phenomenal — knowledgeable, funny, and incredibly organized. Every hotel was spotless, every meal was delicious. Sigiriya at sunrise with barely any crowds was magical. Booking with TravelEase LK was the best decision we made.',
 1, '2026-08-26 10:30:00'),
(3, 4, 2, 5, 'Saw 3 leopards in one day!',
 'I''ve been on safaris in Africa but Yala was something else entirely. The density of leopards is unbelievable. Suresh knew exactly where to find them. We also spotted elephants, crocodiles, and a sloth bear. The eco-lodge was comfortable and the meals were surprisingly good. Highly recommend!',
 1, '2026-08-03 08:15:00'),
(5, 2, 4, 5, 'Perfect romantic highland getaway',
 'My partner and I had the most wonderful 4 days in the hill country. The Nine Arch Bridge at dusk was stunning. The tea bungalow felt like something out of a colonial-era novel. The hike to Ella Rock in the morning mist was unforgettable. Lakshani was an excellent guide — patient and very knowledgeable about local plants.',
 1, '2026-08-21 16:00:00'),
(6, 16, 5, 5, 'Perfect honeymoon — every detail was flawless',
 'We cannot say enough good things about TravelEase LK. Our honeymoon was beyond our wildest dreams. The candlelit dinner in the Kandy hills, the couples spa at the tea estate, and the sunset cruise in Mirissa — all perfectly arranged. This is a company that truly cares about their clients. Thank you!',
 1, '2026-10-12 14:00:00');
GO

-- ============================================================
-- 7. NOTIFICATIONS
-- ============================================================
INSERT INTO Notifications (UserId, Title, Message, Type, IsRead, CreatedAt)
VALUES
(2, 'Booking Confirmed!', 'Your booking TL-2026-00001 for "Sri Lanka Grand Circle Tour" has been confirmed. We look forward to welcoming you!', 'Success', 1, '2026-06-10 10:00:00'),
(3, 'Booking Confirmed!', 'Your booking TL-2026-00002 for "Yala Leopard Safari Adventure" has been confirmed. Get ready for an incredible safari!', 'Success', 1, '2026-06-12 15:00:00'),
(4, 'Booking Received', 'We have received your booking TL-2026-00003 for "Mirissa Whale Watching." Our team will confirm within 24 hours.', 'Info', 0, '2026-07-01 09:00:00'),
(5, 'Booking Confirmed!', 'Your booking TL-2026-00004 for "Ella Tea Country Adventure" has been confirmed!', 'Success', 0, '2026-06-20 12:00:00');
GO

PRINT 'TravelEaseLK seed data inserted successfully!';
PRINT 'Admin: admin@travelease.lk / Admin@123';
PRINT 'Customer: james.w@gmail.com / Customer@123';
GO
